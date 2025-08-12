function loadLevelData() {
  return fetch('../data/levels.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

function getLevel(levelNumber, levels) {
  return levels.find(level => level.level === levelNumber);
}