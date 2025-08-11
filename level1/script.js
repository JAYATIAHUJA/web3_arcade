class MazeGame {
  constructor() {
    this.mazeSize = 13;
    this.maze = [];
    this.player = { x: 1, y: 1 };
    this.blocks = [
      { 
        id: 'A', 
        x: 3, 
        y: 3, 
        step: '<h4>🔗 What is Blockchain?</h4><div class="definition">A blockchain is a distributed, immutable ledger that records transactions across multiple computers in a way that makes it nearly impossible to change, hack, or cheat.</div><div class="steps">Foundation Concept: Think of it as a digital ledger book that everyone can see but no one can alter once entries are made.</div>' 
      },
      { 
        id: 'B', 
        x: 9, 
        y: 5, 
        step: '<h4>🧱 Understanding Blocks</h4><div class="definition">Each "block" contains a collection of transactions, a timestamp, and a cryptographic hash of the previous block, creating an unbreakable chain.</div><div class="steps">Step 1: Learn about cryptographic hashing - each block has a unique fingerprint that changes if any data is modified.</div>' 
      },
      { 
        id: 'C', 
        x: 5, 
        y: 9, 
        step: '<h4>🌐 Decentralization</h4><div class="definition">Unlike traditional databases controlled by a single entity, blockchain operates on a peer-to-peer network where multiple participants maintain copies of the ledger.</div><div class="steps">Step 2: Set up a cryptocurrency wallet (like MetaMask) to interact with blockchain networks safely.</div>' 
      },
      { 
        id: 'D', 
        x: 11, 
        y: 7, 
        step: '<h4>⛏️ Mining & Consensus</h4><div class="definition">Mining is the process of validating transactions and adding new blocks to the chain. Consensus mechanisms ensure all network participants agree on the blockchain state.</div><div class="steps">Step 3: Explore blockchain explorers (like Etherscan) to see real transactions and understand how the network operates.</div>' 
      },
      { 
        id: 'E', 
        x: 7, 
        y: 11, 
        step: '<h4>🚀 Smart Contracts & DApps</h4><div class="definition">Smart contracts are self-executing contracts with terms directly written into code. DApps (Decentralized Applications) run on blockchain networks without central control.</div><div class="steps">Step 4: Start learning Solidity programming language and deploy your first smart contract on a test network!</div>' 
      }
    ];
    this.correctOrder = ['A', 'B', 'C', 'D', 'E'];
    this.collectedBlocks = [];
    this.gameWon = false;
    
    this.initializeGame();
    this.bindEvents();
  }

  initializeGame() {
    this.generateMaze();
    this.renderMaze();
    this.updateUI();
  }

  generateMaze() {
    // Initialize maze with walls
    for (let y = 0; y < this.mazeSize; y++) {
      this.maze[y] = [];
      for (let x = 0; x < this.mazeSize; x++) {
        this.maze[y][x] = 'wall';
      }
    }

    // Create paths using a simple algorithm
    const paths = [
      // Horizontal paths
      { startX: 1, startY: 1, endX: 11, endY: 1 },
      { startX: 1, startY: 3, endX: 5, endY: 3 },
      { startX: 7, startY: 3, endX: 11, endY: 3 },
      { startX: 1, startY: 5, endX: 11, endY: 5 },
      { startX: 1, startY: 7, endX: 3, endY: 7 },
      { startX: 5, startY: 7, endX: 11, endY: 7 },
      { startX: 1, startY: 9, endX: 9, endY: 9 },
      { startX: 1, startY: 11, endX: 11, endY: 11 },
      
      // Vertical paths
      { startX: 1, startY: 1, endX: 1, endY: 11 },
      { startX: 3, startY: 1, endX: 3, endY: 9 },
      { startX: 5, startY: 3, endX: 5, endY: 11 },
      { startX: 7, startY: 1, endX: 7, endY: 11 },
      { startX: 9, startY: 1, endX: 9, endY: 9 },
      { startX: 11, startY: 1, endX: 11, endY: 11 }
    ];

    // Create paths
    paths.forEach(path => {
      if (path.startX === path.endX) {
        // Vertical path
        const minY = Math.min(path.startY, path.endY);
        const maxY = Math.max(path.startY, path.endY);
        for (let y = minY; y <= maxY; y++) {
          this.maze[y][path.startX] = 'path';
        }
      } else {
        // Horizontal path
        const minX = Math.min(path.startX, path.endX);
        const maxX = Math.max(path.startX, path.endX);
        for (let x = minX; x <= maxX; x++) {
          this.maze[path.startY][x] = 'path';
        }
      }
    });

    // Place blocks
    this.blocks.forEach(block => {
      if (this.maze[block.y] && this.maze[block.y][block.x] === 'path') {
        this.maze[block.y][block.x] = 'block';
      }
    });

    // Ensure player starting position is a path
    this.maze[this.player.y][this.player.x] = 'path';
  }

  renderMaze() {
    const mazeElement = document.getElementById('maze');
    mazeElement.style.gridTemplateColumns = `repeat(${this.mazeSize}, 1fr)`;
    mazeElement.innerHTML = '';

    for (let y = 0; y < this.mazeSize; y++) {
      for (let x = 0; x < this.mazeSize; x++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.x = x;
        cell.dataset.y = y;

        if (x === this.player.x && y === this.player.y) {
          cell.classList.add('player');
        } else if (this.maze[y][x] === 'wall') {
          cell.classList.add('wall');
        } else if (this.maze[y][x] === 'path') {
          cell.classList.add('path');
        } else if (this.maze[y][x] === 'block') {
          const block = this.blocks.find(b => b.x === x && b.y === y);
          if (block && !this.collectedBlocks.includes(block.id)) {
            cell.classList.add('block');
            cell.textContent = block.id;
          } else {
            cell.classList.add('collected');
          }
        }

        mazeElement.appendChild(cell);
      }
    }
  }

  movePlayer(direction) {
    if (this.gameWon) return;

    let newX = this.player.x;
    let newY = this.player.y;

    switch (direction) {
      case 'up':
        newY--;
        break;
      case 'down':
        newY++;
        break;
      case 'left':
        newX--;
        break;
      case 'right':
        newX++;
        break;
    }

    // Check boundaries
    if (newX < 0 || newX >= this.mazeSize || newY < 0 || newY >= this.mazeSize) {
      return;
    }

    // Check if new position is not a wall
    if (this.maze[newY][newX] === 'wall') {
      return;
    }

    // Update player position
    this.player.x = newX;
    this.player.y = newY;

    // Check if player collected a block
    if (this.maze[newY][newX] === 'block') {
      const block = this.blocks.find(b => b.x === newX && b.y === newY);
      if (block && !this.collectedBlocks.includes(block.id)) {
        this.collectBlock(block);
      }
    }

    this.renderMaze();
    this.updateUI();
  }

  collectBlock(block) {
    const expectedBlock = this.correctOrder[this.collectedBlocks.length];
    
    if (block.id === expectedBlock) {
      this.collectedBlocks.push(block.id);
      this.showBlockInfo(block);
      
      if (this.collectedBlocks.length === this.correctOrder.length) {
        setTimeout(() => {
          this.winGame();
        }, 2000);
      }
    } else {
      this.gameOver('Wrong exhibit visited! Please follow the blockchain learning sequence from basics to advanced concepts.');
    }
  }

  showBlockInfo(block) {
    const blockInfo = document.getElementById('block-info');
    const exhibitInfo = document.getElementById('block-step');
    
    exhibitInfo.innerHTML = block.step;
    blockInfo.classList.add('show');
  }

  hideBlockInfo() {
    const blockInfo = document.getElementById('block-info');
    blockInfo.classList.remove('show');
  }

  updateUI() {
    const progressElement = document.getElementById('progress');
    const nextBlockElement = document.getElementById('next-block');
    
    progressElement.textContent = `${this.collectedBlocks.length}/${this.correctOrder.length}`;
    
    if (this.collectedBlocks.length < this.correctOrder.length) {
      const nextBlock = this.correctOrder[this.collectedBlocks.length];
      nextBlockElement.textContent = `Exhibit ${nextBlock}`;
    } else {
      nextBlockElement.textContent = 'Complete!';
    }
  }

  gameOver(message) {
    const overlay = document.getElementById('game-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayMessage = document.getElementById('overlay-message');
    
    overlayTitle.textContent = 'Learning Path Interrupted';
    overlayMessage.textContent = message;
    overlay.classList.add('show');
  }

  winGame() {
    this.gameWon = true;
    const overlay = document.getElementById('game-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayMessage = document.getElementById('overlay-message');
    const restartBtn = document.getElementById('restart-btn');
    
    overlayTitle.textContent = '🎓 Museum Tour Complete!';
    overlayMessage.textContent = 'Congratulations! You have successfully visited all blockchain exhibits in the correct learning sequence. You now have a solid foundation to start your blockchain journey!';
    restartBtn.textContent = 'Take Another Tour';
    overlay.classList.add('show');
  }

  restartGame() {
    this.player = { x: 1, y: 1 };
    this.collectedBlocks = [];
    this.gameWon = false;
    
    const overlay = document.getElementById('game-overlay');
    overlay.classList.remove('show');
    
    this.initializeGame();
  }

  bindEvents() {
    // Keyboard events
    document.addEventListener('keydown', (e) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          e.preventDefault();
          this.movePlayer('up');
          break;
        case 's':
        case 'arrowdown':
          e.preventDefault();
          this.movePlayer('down');
          break;
        case 'a':
        case 'arrowleft':
          e.preventDefault();
          this.movePlayer('left');
          break;
        case 'd':
        case 'arrowright':
          e.preventDefault();
          this.movePlayer('right');
          break;
      }
    });

    // Mobile controls
    document.querySelectorAll('.control-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const direction = btn.dataset.direction;
        this.movePlayer(direction);
      });

      // Touch events for better mobile experience
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        btn.classList.add('active');
      });

      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        btn.classList.remove('active');
      });
    });

    // Restart button
    document.getElementById('restart-btn').addEventListener('click', () => {
      this.restartGame();
    });

    // Continue button for block info
    document.getElementById('continue-btn').addEventListener('click', () => {
      this.hideBlockInfo();
    });

    // Prevent zoom on double tap
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MazeGame();
});