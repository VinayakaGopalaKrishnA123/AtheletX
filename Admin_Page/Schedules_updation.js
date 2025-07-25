function selectAction(action) {
    document.getElementById('newTournamentForm').style.display = action === 'new' ? 'block' : 'none';
    document.getElementById('existingTournamentForm').style.display = action === 'existing' ? 'block' : 'none';

    document.getElementById('matchInputs').innerHTML = '';
    document.getElementById('existingMatchesContainer').innerHTML = '';
    document.getElementById('addMoreSection').style.display = 'none';
    document.getElementById('additionalMatchInputs').innerHTML = '';

    document.getElementById('newSelector').classList.remove('selected');
    document.getElementById('existingSelector').classList.remove('selected');
    document.getElementById(action + 'Selector').classList.add('selected');
  }

  function generateMatchInputs() {
    const count = parseInt(document.getElementById('matchCount').value);
    const container = document.getElementById('matchInputs');
    container.innerHTML = '';

    for (let i = 1; i <= count; i++) {
      container.appendChild(createMatchBlock(i));
    }
  }

  function createMatchBlock(i, match = {}) {
    const div = document.createElement('div');
    div.className = 'match-block';
    div.innerHTML = `
      <h4 style="color:#00ffcc;">Match ${i}</h4>
      Team 1 Name: <input type="text" value="${match.team1 || ''}" placeholder="Team 1"><br>
      Team 2 Name: <input type="text" value="${match.team2 || ''}" placeholder="Team 2"><br>
      Date: <input type="date" value="${match.date || ''}"><br>
      Time: <input type="time" value="${match.time || ''}"><br>
    `;
    return div;
  }

  function saveNewTournament() {
    const name = document.getElementById('tournamentName').value;
    const count = parseInt(document.getElementById('matchCount').value);
    if (!name || !count) {
      alert("Please enter tournament name and number of matches.");
      return;
    }

    const inputs = document.querySelectorAll('#matchInputs .match-block');
    const matches = Array.from(inputs).map(block => {
      const inputs = block.querySelectorAll('input');
      return {
        team1: inputs[0].value,
        team2: inputs[1].value,
        date: inputs[2].value,
        time: inputs[3].value
      };
    });

    console.log("New Tournament:", name, matches);
    alert("New tournament saved successfully!");
  }

  const sampleData = {
    summer_cup: [
      {team1: "Warriors", team2: "Titans", date: "2025-07-28", time: "15:00"},
      {team1: "Kings", team2: "Royals", date: "2025-07-29", time: "18:00"}
    ],
    monsoon_league: [
      {team1: "Storm", team2: "Blaze", date: "2025-07-30", time: "17:00"}
    ]
  };

  function loadExistingMatches() {
    const selected = document.getElementById('liveTournamentSelect').value;
    const container = document.getElementById('existingMatchesContainer');
    container.innerHTML = '';
    document.getElementById('additionalMatchInputs').innerHTML = '';
    document.getElementById('addMoreSection').style.display = selected ? 'block' : 'none';

    if (selected && sampleData[selected]) {
      sampleData[selected].forEach((match, idx) => {
        container.appendChild(createMatchBlock(idx + 1, match));
      });
    }
  }

  function addMoreMatches() {
    const count = parseInt(document.getElementById('addMatchCount').value);
    const container = document.getElementById('additionalMatchInputs');
    const startIdx = document.querySelectorAll('#existingMatchesContainer .match-block').length;
    for (let i = 1; i <= count; i++) {
      container.appendChild(createMatchBlock(startIdx + i));
    }
  }

  function saveExistingTournament() {
    const tournament = document.getElementById('liveTournamentSelect').value;
    if (!tournament) {
      alert("Please select a tournament.");
      return;
    }

    const allBlocks = document.querySelectorAll('#existingMatchesContainer .match-block, #additionalMatchInputs .match-block');
    const matches = Array.from(allBlocks).map(block => {
      const inputs = block.querySelectorAll('input');
      return {
        team1: inputs[0].value,
        team2: inputs[1].value,
        date: inputs[2].value,
        time: inputs[3].value
      };
    });

    console.log("Updated Tournament:", tournament, matches);
    alert("Tournament schedule updated successfully!");
  }
