function updateUI(level) {
  const trade = gameLevels[level];
  document.getElementById('npc-name').innerText = trade.title;
  document.getElementById('trade-offer').innerText = trade.story;
  document.getElementById('goal').innerText = trade.goal;
  document.getElementById('inventory').innerText = `Inventory: ${JSON.stringify(playerInventory)}`;
}

function showTransactionStatus(message) {
  const statusFeed = document.getElementById('status-feed');
  const newStatus = document.createElement('div');
  newStatus.innerText = message;
  statusFeed.appendChild(newStatus);
}

function displayLevelComplete(reward) {
  const completeScreen = document.getElementById('level-complete');
  completeScreen.innerText = `Level Complete! You earned: ${reward}`;
  completeScreen.style.display = 'block';
}

function hideLevelComplete() {
  const completeScreen = document.getElementById('level-complete');
  completeScreen.style.display = 'none';
}