import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import badgeImg from "@/assets/token-tycoon-badge.png";
import { toast } from "sonner";

// Island Resource Hunt — Canvas-based, mobile-friendly
// All logic is written in a straightforward, vanilla-JS style within a React component for Vite/TS.
// Map is tile-based with simple collision; resources spawn on walkable tiles.
// Prices adjust based on market supply; progress saved to localStorage.

// Types
 type ResourceType = "wood" | "stone" | "fruit" | "gold";
 type Tile = 0 | 1 | 2 | 3; // 0 grass, 1 water, 2 tree, 3 rock

 type ResourceEntity = {
  id: number;
  type: ResourceType;
  x: number; // in tile coords
  y: number; // in tile coords
};

 type SaveState = {
  inventory: Record<ResourceType, number>;
  tokens: number;
  marketSupply: Record<ResourceType, number>;
  badgeOwned: boolean;
};

const BASE_PRICES: Record<ResourceType, number> = {
  wood: 8,
  stone: 10,
  fruit: 12,
  gold: 30,
};

const COLORS = {
  grass: "#0b3a34",
  water: "#0a4f6d",
  tree: "#166534",
  rock: "#4b5563",
  outline: "#0f172a",
};

const RESOURCE_COLORS: Record<ResourceType, string> = {
  wood: "#c08436",
  stone: "#7b8794",
  fruit: "#ff756b",
  gold: "#f2c94c",
};

const RESOURCE_MAX: Record<ResourceType, number> = {
  wood: 10,
  stone: 10,
  fruit: 8,
  gold: 5,
};

const DISPLAY_NAMES: Record<ResourceType, string> = {
  wood: "SOL",
  stone: "ETH",
  fruit: "USDC",
  gold: "BTC",
};

const SYMBOL_LABELS: Record<ResourceType, string> = {
  wood: "S",
  stone: "E",
  fruit: "U",
  gold: "B",
};

const WEB3_TIPS = [
  "Diversify to reduce risk",
  "Stablecoins protect against volatility",
  "Watch market trends before trading",
  "Volatility means prices can swing quickly",
] as const;

const BADGE_THRESHOLD = 500;

// Utility: clamp
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// Price based on supply (100 = baseline). Scarcity raises price, abundance lowers it.
function getDynamicPrice(base: number, supply: number) {
  const factor = 100 / Math.max(30, supply); // more supply -> lower factor
  const price = base * factor;
  return Math.round(clamp(price, base * 0.5, base * 3));
}

// Simple WebAudio beeps (no external assets)
function playTone(freq = 660, duration = 0.08) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = freq;
    gain.gain.value = 0.07;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      ctx.close();
    }, duration * 1000);
  } catch (e) {
    // ignore if blocked
  }
}

// On-screen Joystick for mobile
const Joystick: React.FC<{
  onChange: (dx: number, dy: number) => void;
}> = ({ onChange }) => {
  const baseRef = useRef<HTMLDivElement | null>(null);
  const knobRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const base = baseRef.current;
    const knob = knobRef.current;
    if (!base || !knob) return;

    let baseRect: DOMRect;

    const handleStart = (e: TouchEvent | MouseEvent) => {
      setActive(true);
      baseRect = base.getBoundingClientRect();
      move(e);
    };

    const handleMove = (e: TouchEvent | MouseEvent) => {
      if (!active) return;
      move(e);
    };

    const handleEnd = () => {
      setActive(false);
      if (knob) {
        knob.style.transform = `translate(0px, 0px)`;
      }
      onChange(0, 0);
    };

    const getPoint = (e: TouchEvent | MouseEvent) => {
      if (e instanceof TouchEvent) {
        const t = e.touches[0] || e.changedTouches[0];
        return { x: t.clientX, y: t.clientY };
      }
      return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
    };

    const move = (e: TouchEvent | MouseEvent) => {
      const p = getPoint(e);
      const cx = baseRect.left + baseRect.width / 2;
      const cy = baseRect.top + baseRect.height / 2;
      let dx = p.x - cx;
      let dy = p.y - cy;
      const max = baseRect.width * 0.35;
      const mag = Math.hypot(dx, dy) || 1;
      const clampedMag = Math.min(mag, max);
      const nx = (dx / mag) * clampedMag;
      const ny = (dy / mag) * clampedMag;
      knob.style.transform = `translate(${nx}px, ${ny}px)`;
      onChange(nx / max, ny / max);
    };

    // Mouse
    base.addEventListener("mousedown", handleStart);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    // Touch
    base.addEventListener("touchstart", handleStart, { passive: true });
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleEnd);

    return () => {
      base.removeEventListener("mousedown", handleStart);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      base.removeEventListener("touchstart", handleStart);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [active, onChange]);

  return (
    <div className="fixed bottom-6 left-6 z-20 select-none">
      <div
        ref={baseRef}
        className="relative h-28 w-28 rounded-full bg-secondary/70 backdrop-blur-sm border border-border"
      >
        <div
          ref={knobRef}
          className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/80 border border-border shadow"
        />
      </div>
    </div>
  );
};

export const IslandResourceHunt: React.FC = () => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [open, setOpen] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [badgeOwned, setBadgeOwned] = useState(false);
  const [inventory, setInventory] = useState<Record<ResourceType, number>>({
    wood: 0,
    stone: 0,
    fruit: 0,
    gold: 0,
  });
  const [marketSupply, setMarketSupply] = useState<Record<ResourceType, number>>({
    wood: 100,
    stone: 100,
    fruit: 100,
    gold: 100,
  });
  const [volatility, setVolatility] = useState<Record<ResourceType, number>>({ wood: 1, stone: 1, fruit: 1, gold: 1 });

  // Key input and joystick vector
  const keyState = useRef<Record<string, boolean>>({});
  const joyVec = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // World setup
  const world = useRef({
    cols: 28,
    rows: 18,
    tileSize: 32,
    map: [] as Tile[],
    player: { x: 3.5, y: 3.5, r: 0.3 },
    entities: [] as ResourceEntity[],
    nextId: 1,
  });

  const prices = useMemo(
    () => ({
      wood: Math.max(1, Math.round(getDynamicPrice(BASE_PRICES.wood, marketSupply.wood) * volatility.wood)),
      stone: Math.max(1, Math.round(getDynamicPrice(BASE_PRICES.stone, marketSupply.stone) * volatility.stone)),
      fruit: Math.max(1, Math.round(getDynamicPrice(BASE_PRICES.fruit, marketSupply.fruit) * volatility.fruit)),
      gold: Math.max(1, Math.round(getDynamicPrice(BASE_PRICES.gold, marketSupply.gold) * volatility.gold)),
    }),
    [marketSupply, volatility]
  );

  // Load saved progress
  useEffect(() => {
    const raw = localStorage.getItem("island-resource-hunt");
    if (raw) {
      try {
        const data: SaveState = JSON.parse(raw);
        setInventory(data.inventory);
        setTokens(data.tokens);
        setMarketSupply(data.marketSupply);
        setBadgeOwned(data.badgeOwned);
      } catch {}
    }
  }, []);

  // Save progress
  useEffect(() => {
    const save: SaveState = {
      inventory,
      tokens,
      marketSupply,
      badgeOwned,
    };
    localStorage.setItem("island-resource-hunt", JSON.stringify(save));
  }, [inventory, tokens, marketSupply, badgeOwned]);

  // Badge awarding
  useEffect(() => {
    if (!badgeOwned && tokens >= BADGE_THRESHOLD) {
      setBadgeOwned(true);
      toast("You earned the Genesis NFT! 🏅");
      playTone(880, 0.12);
      setTimeout(() => playTone(660, 0.12), 120);
      setTimeout(() => playTone(990, 0.16), 240);
    }
  }, [tokens, badgeOwned]);

  // Initialize map
  useEffect(() => {
    const w = world.current;
    // Randomized but consistent-ish map
    const map: Tile[] = [];
    for (let y = 0; y < w.rows; y++) {
      for (let x = 0; x < w.cols; x++) {
        // Borders are water
        if (x === 0 || y === 0 || x === w.cols - 1 || y === w.rows - 1) {
          map.push(1);
          continue;
        }
        // sprinkle trees and rocks
        const r = Math.random();
        if (r < 0.08) map.push(2);
        else if (r < 0.12) map.push(3);
        else map.push(0);
      }
    }
    w.map = map;

    // initial resources
    spawnInitialResources();
  }, []);

  // Input handlers
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keyState.current[e.key.toLowerCase()] = true;
    };
    const up = (e: KeyboardEvent) => {
      keyState.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Game loop
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      update(dt);
      render();
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Respawn timer
  useEffect(() => {
    const id = setInterval(() => {
      spawnTick();
    }, 1600);
    return () => clearInterval(id);
  }, [marketSupply]);

  // Market Volatility Events: every 30–60s adjust each token by ±1% to ±5%
  useEffect(() => {
    let timeout: number | undefined;

    const schedule = () => {
      const delay = 30000 + Math.floor(Math.random() * 30001); // 30–60s
      timeout = window.setTimeout(() => {
        const types: ResourceType[] = ["wood", "stone", "fruit", "gold"];
        const changes: { key: ResourceType; pct: number }[] = types.map((key) => {
          const sign = Math.random() < 0.5 ? -1 : 1;
          const magnitude = 0.01 + Math.random() * 0.04; // 1%–5%
          return { key, pct: sign * magnitude };
        });

        setVolatility((prev) => {
          const next = { ...prev };
          for (const c of changes) {
            next[c.key] = prev[c.key] * (1 + c.pct);
          }
          return next;
        });

        const msg = changes
          .map((c) => `${DISPLAY_NAMES[c.key]} ${c.pct >= 0 ? "+" : ""}${Math.round(c.pct * 100)}%`)
          .join(", ");
        toast(`Market News: ${msg}`, { position: "top-center", duration: 2400 });

        schedule();
      }, delay);
    };

    schedule();
    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  // --- World helpers ---
  const isBlocked = (tx: number, ty: number) => {
    const w = world.current;
    if (tx < 0 || ty < 0 || tx >= w.cols || ty >= w.rows) return true;
    const t = w.map[ty * w.cols + tx];
    return t === 1 || t === 2 || t === 3;
  };

  const randomWalkableTile = (): { x: number; y: number } | null => {
    const w = world.current;
    for (let i = 0; i < 200; i++) {
      const x = 1 + Math.floor(Math.random() * (w.cols - 2));
      const y = 1 + Math.floor(Math.random() * (w.rows - 2));
      if (!isBlocked(x, y)) return { x, y };
    }
    return null;
  };

  const spawnResource = (type: ResourceType) => {
    const w = world.current;
    const count = w.entities.filter((e) => e.type === type).length;
    if (count >= RESOURCE_MAX[type]) return;
    const p = randomWalkableTile();
    if (!p) return;
    w.entities.push({ id: w.nextId++, type, x: p.x + 0.5, y: p.y + 0.5 });
    // World stock appears -> market supply grows slightly
    setMarketSupply((ms) => ({ ...ms, [type]: ms[type] + 1 }));
  };

  const spawnInitialResources = () => {
    (Object.keys(RESOURCE_MAX) as ResourceType[]).forEach((type) => {
      for (let i = 0; i < Math.floor(RESOURCE_MAX[type] * 0.8); i++) {
        spawnResource(type);
      }
    });
  };

  const spawnTick = () => {
    (Object.keys(RESOURCE_MAX) as ResourceType[]).forEach((type) => {
      if (Math.random() < 0.6) spawnResource(type);
    });
  };

  const update = (dt: number) => {
    const w = world.current;
    const speed = 3.2; // tiles per second

    let vx = 0;
    let vy = 0;
    const k = keyState.current;
    if (k["arrowleft"] || k["a"]) vx -= 1;
    if (k["arrowright"] || k["d"]) vx += 1;
    if (k["arrowup"] || k["w"]) vy -= 1;
    if (k["arrowdown"] || k["s"]) vy += 1;

    // joystick vector (mobile)
    vx += joyVec.current.x;
    vy += joyVec.current.y;

    const mag = Math.hypot(vx, vy);
    if (mag > 0) {
      vx /= mag;
      vy /= mag;
    }

    let nx = w.player.x + vx * speed * dt;
    let ny = w.player.y + vy * speed * dt;

    // collision per axis
    if (!isBlocked(Math.floor(nx), Math.floor(w.player.y))) w.player.x = nx;
    if (!isBlocked(Math.floor(w.player.x), Math.floor(ny))) w.player.y = ny;

    // Collect resources in proximity
    const px = w.player.x;
    const py = w.player.y;
    for (let i = w.entities.length - 1; i >= 0; i--) {
      const e = w.entities[i];
      const dist = Math.hypot(e.x - px, e.y - py);
      if (dist < 0.6) {
        // collect
        setInventory((inv) => ({ ...inv, [e.type]: inv[e.type] + 1 }));
        setMarketSupply((ms) => ({ ...ms, [e.type]: Math.max(1, ms[e.type] - 1) }));
        playTone(820, 0.06);
        w.entities.splice(i, 1);
      }
    }
  };

  const render = () => {
    const w = world.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const CSS_WIDTH = Math.min(960, Math.max(480, w.cols * w.tileSize));
    const CSS_HEIGHT = Math.round((CSS_WIDTH / w.cols) * w.rows);

    if (canvas.width !== CSS_WIDTH * devicePixelRatio || canvas.height !== CSS_HEIGHT * devicePixelRatio) {
      canvas.width = CSS_WIDTH * devicePixelRatio;
      canvas.height = CSS_HEIGHT * devicePixelRatio;
      canvas.style.width = CSS_WIDTH + "px";
      canvas.style.height = CSS_HEIGHT + "px";
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    // tile size in CSS pixels
    const ts = CSS_WIDTH / w.cols;

    // sky/sea gradient (dark tropical night)
    const grad = ctx.createLinearGradient(0, 0, 0, CSS_HEIGHT);
    grad.addColorStop(0, "#0a3342");
    grad.addColorStop(1, "#08252e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, CSS_WIDTH, CSS_HEIGHT);

    // Tiles
    for (let y = 0; y < w.rows; y++) {
      for (let x = 0; x < w.cols; x++) {
        const t = w.map[y * w.cols + x];
        const rx = x * ts;
        const ry = y * ts;
        if (t === 1) {
          ctx.fillStyle = COLORS.water;
          ctx.fillRect(rx, ry, ts, ts);
        } else {
          // grass base
          ctx.fillStyle = COLORS.grass;
          ctx.fillRect(rx, ry, ts, ts);
          if (t === 2) {
            // tree blob
            ctx.fillStyle = COLORS.tree;
            ctx.beginPath();
            ctx.arc(rx + ts * 0.5, ry + ts * 0.55, ts * 0.35, 0, Math.PI * 2);
            ctx.fill();
          }
          if (t === 3) {
            // rock
            ctx.fillStyle = COLORS.rock;
            ctx.beginPath();
            ctx.ellipse(rx + ts * 0.5, ry + ts * 0.6, ts * 0.32, ts * 0.24, 0, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    // Entities (resources)
    for (const e of w.entities) {
      const rx = (e.x - 0.5) * ts;
      const ry = (e.y - 0.5) * ts;
      ctx.fillStyle = RESOURCE_COLORS[e.type];
      ctx.beginPath();
      ctx.arc(rx + ts * 0.5, ry + ts * 0.5, ts * 0.28, 0, Math.PI * 2);
      ctx.fill();
      // outline
      ctx.strokeStyle = COLORS.outline;
      ctx.lineWidth = 2;
      ctx.stroke();

      // text label
      ctx.fillStyle = "#1f2937";
      ctx.font = `${Math.floor(ts * 0.28)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const label = SYMBOL_LABELS[e.type];
      ctx.fillText(label, rx + ts * 0.5, ry + ts * 0.5);
    }

    // Player
    const px = w.player.x * ts;
    const py = w.player.y * ts;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(px, py, ts * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Player face
    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.arc(px - ts * 0.1, py - ts * 0.05, ts * 0.04, 0, Math.PI * 2);
    ctx.arc(px + ts * 0.1, py - ts * 0.05, ts * 0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px, py + ts * 0.06, ts * 0.1, 0, Math.PI);
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const handleBuy = (type: ResourceType, qty: number) => {
    const cost = prices[type] * qty;
    if (tokens < cost) {
      toast("Not enough tokens!");
      playTone(220, 0.06);
      return;
    }
    setTokens((t) => t - cost);
    setInventory((inv) => ({ ...inv, [type]: inv[type] + qty }));
    setMarketSupply((ms) => ({ ...ms, [type]: Math.max(1, ms[type] - qty) }));
    playTone(560, 0.07);
    const tip = WEB3_TIPS[Math.floor(Math.random() * WEB3_TIPS.length)];
    toast(tip, { duration: 2400 });
  };

  const handleSell = (type: ResourceType, qty: number) => {
    if (inventory[type] < qty) {
      toast("Not enough items to sell!");
      playTone(220, 0.06);
      return;
    }
    const revenue = prices[type] * qty;
    setTokens((t) => t + revenue);
    setInventory((inv) => ({ ...inv, [type]: inv[type] - qty }));
    setMarketSupply((ms) => ({ ...ms, [type]: ms[type] + qty }));
    playTone(340, 0.07);
    const tip = WEB3_TIPS[Math.floor(Math.random() * WEB3_TIPS.length)];
    toast(tip, { duration: 2400 });
  };

  const resetProgress = () => {
    if (!confirm("Reset progress?")) return;
    setTokens(0);
    setInventory({ wood: 0, stone: 0, fruit: 0, gold: 0 });
    setMarketSupply({ wood: 100, stone: 100, fruit: 100, gold: 100 });
    setBadgeOwned(false);
    toast("Progress reset");
  };

  return (
    <section className="w-full">
      <div className="container py-6 md:py-8">
        <header className="mb-4 md:mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            🏝 Island Resource Hunt
          </h1>
          <p className="text-muted-foreground mt-1">
            Collect, trade, and master the market. Prices rise and fall with supply!
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 md:gap-6">
          {/* Game and HUD */}
          <div>
            <Card className="p-2 md:p-3">
              <div className="flex flex-wrap items-center justify-between gap-2 px-2 md:px-1">
                <div className="flex items-center gap-3">
                  <div className="rounded-md px-3 py-1.5 bg-secondary text-secondary-foreground text-sm">
                    Tokens: <span className="font-semibold">{tokens}</span>
                  </div>
                  <div className="rounded-md px-3 py-1.5 bg-accent text-accent-foreground text-sm hidden sm:block">
                    Prices — SOL:{prices.wood} ETH:{prices.stone} USDC:{prices.fruit} BTC:{prices.gold}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant="default" className="hover-scale">
                        Trading Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Trading Post</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {(Object.keys(BASE_PRICES) as ResourceType[]).map((t) => (
                          <div key={t} className="rounded-lg border p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold uppercase">{DISPLAY_NAMES[t]}</div>
                                <div className="text-sm text-muted-foreground">
                                  Price: {prices[t]} | You: {inventory[t]}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="secondary" onClick={() => handleBuy(t, 1)}>Buy 1</Button>
                                <Button size="sm" variant="secondary" onClick={() => handleBuy(t, 5)}>Buy 5</Button>
                                <Button size="sm" variant="default" onClick={() => handleSell(t, 1)}>Sell 1</Button>
                                <Button size="sm" variant="default" onClick={() => handleSell(t, Math.max(1, inventory[t]))}>Sell Max</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">Tokens: {tokens}</div>
                          <Button variant="destructive" onClick={resetProgress}>Reset Progress</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="mt-2 flex justify-center">
                <canvas ref={canvasRef} className="rounded-lg border border-border shadow-sm" />
              </div>

              {isMobile && (
                <Joystick onChange={(dx, dy) => (joyVec.current = { x: dx, y: dy })} />
              )}

              <div className="mt-3 px-2 text-center text-xs text-muted-foreground">
                Move with Arrow keys / WASD or joystick. Walk into resources to collect.
              </div>
            </Card>
          </div>

          {/* Sidebar: Inventory & Badge */}
          <aside className="space-y-4">
            <Card className="p-4">
              <div className="font-semibold mb-2">Inventory</div>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(BASE_PRICES) as ResourceType[]).map((t) => (
                  <div key={t} className="rounded-md border p-3">
                     <div className="text-xs text-muted-foreground uppercase">{DISPLAY_NAMES[t]}</div>
                    <div className="text-xl font-bold">{inventory[t]}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <div className="font-semibold mb-2">Genesis NFT</div>
              <div className="flex items-center gap-3">
                <img
                  src={badgeImg}
                  alt="Genesis NFT — golden coin with palm leaves"
                  className={`h-14 w-14 rounded-md border ${badgeOwned ? "" : "opacity-40"}`}
                  loading="lazy"
                />
                <div>
                  <div className="text-sm">You earned your first NFT! In real life, NFTs are stored in a crypto wallet.</div>
                  <div className={`text-sm font-semibold ${badgeOwned ? "text-primary" : "text-muted-foreground"}`}>
                    {badgeOwned ? "Owned" : "Locked"}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="font-semibold mb-2">Market Supply</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {(Object.keys(BASE_PRICES) as ResourceType[]).map((t) => (
                  <div key={t} className="rounded-md border p-3">
                    <div className="text-xs text-muted-foreground uppercase">{DISPLAY_NAMES[t]}</div>
                    <div className="font-semibold">{marketSupply[t]}</div>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default IslandResourceHunt;
