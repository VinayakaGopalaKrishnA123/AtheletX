function selectAction(action) {
  document.getElementById('newTournamentForm').style.display = action === 'new' ? 'block' : 'none';
  document.getElementById('existingTournamentForm').style.display = action === 'existing' ? 'block' : 'none';
  document.getElementById('deleteTournamentForm').style.display = action === 'delete' ? 'block' : 'none';
  document.getElementById('matchInputs').innerHTML = '';
  document.getElementById('existingMatchesContainer').innerHTML = '';
  document.getElementById('addMoreSection').style.display = 'none';
  document.getElementById('additionalMatchInputs').innerHTML = '';
  document.getElementById('newSelector').classList.remove('selected');
  document.getElementById('existingSelector').classList.remove('selected');
  document.getElementById('deleteSelector').classList.remove('selected');
  document.getElementById(action + 'Selector').classList.add('selected');

  if (action === 'existing' || action === 'delete') {
    populateTournamentDropdowns();
  }
}

function isPastDate(inputDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(inputDate);
  return selected < today;
}

let tournamentsData = JSON.parse(localStorage.getItem("tournaments")) || {};

function saveToLocalStorage() {
  localStorage.setItem("tournaments", JSON.stringify(tournamentsData));
}

function populateTournamentDropdowns() {
  const liveSelect = document.getElementById('liveTournamentSelect');
  const deleteSelect = document.getElementById('deleteTournamentSelect');

  liveSelect.innerHTML = '<option value="">-- Choose --</option>';
  deleteSelect.innerHTML = '<option value="">-- Choose --</option>';

  Object.keys(tournamentsData).forEach(name => {
    liveSelect.innerHTML += `<option value="${name}">${name}</option>`;
    deleteSelect.innerHTML += `<option value="${name}">${name}</option>`;
  });
}


function generateMatchInputs() {
  const count = parseInt(document.getElementById('matchCount').value);
  const container = document.getElementById('matchInputs');
  container.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    container.appendChild(createMatchBlock(i));
  }
}

function createMatchBlock(i, match = {}, removable = false) {
  const div = document.createElement('div');
  div.className = 'match-block';
  div.innerHTML = `
    <h4 style="color:#00ffcc;">Match ${i}</h4>
    <label>Team 1 Name:</label> <input type="text" value="${match.team1 || ''}" placeholder="Team 1"><br>
    <label>Team 2 Name:</label> <input type="text" value="${match.team2 || ''}" placeholder="Team 2"><br>
    <label>Date: </label> <input type="date" value="${match.date || ''}"><br>
    <label>Time: </label> <input type="time" value="${match.time || ''}"><br>
  `;

  if (removable) {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "❌ Remove Match";
    removeBtn.className="remove_button"
    removeBtn.style.marginLeft = "50px";
    removeBtn.onclick = () => div.remove();
    div.appendChild(removeBtn);
  }

  return div;
}

function saveNewTournament() {
  const name = document.getElementById('tournamentName').value.trim();
  const count = parseInt(document.getElementById('matchCount').value);

  if (!name || !count) {
    alert("Please enter tournament name and number of matches.");
    return;
  }

  const inputs = document.querySelectorAll('#matchInputs .match-block');
  const matches = [];

  for (let block of inputs) {
    const fields = block.querySelectorAll('input');
    const team1 = fields[0].value.trim();
    const team2 = fields[1].value.trim();
    const date = fields[2].value.trim();
    const time = fields[3].value.trim();

    if (!team1 || !team2 || !date || !time) {
      alert("All fields (Team names, Date, Time) must be filled for each match.");
      return;
    }

    if (isPastDate(date)) {
      alert("Match date cannot be in the past.");
      return;
    }

    matches.push({ team1, team2, date, time });
  }

  tournamentsData[name] = matches;
  saveToLocalStorage();
  alert("New tournament saved successfully!");
}

function loadExistingMatches() {
  const selected = document.getElementById('liveTournamentSelect').value;
  const container = document.getElementById('existingMatchesContainer');
  container.innerHTML = '';
  document.getElementById('additionalMatchInputs').innerHTML = '';
  document.getElementById('addMoreSection').style.display = selected ? 'block' : 'none';

  if (selected && tournamentsData[selected]) {
    tournamentsData[selected].forEach((match, idx) => {
      container.appendChild(createMatchBlock(idx + 1, match, true));
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
  const matches = [];

  for (let block of allBlocks) {
    const fields = block.querySelectorAll('input');
    const team1 = fields[0].value.trim();
    const team2 = fields[1].value.trim();
    const date = fields[2].value.trim();
    const time = fields[3].value.trim();

    if (!team1 || !team2 || !date || !time) {
      alert("All fields (Team names, Date, Time) must be filled for each match.");
      return;
    }

    if (isPastDate(date)) {
      alert("Match date cannot be in the past.");
      return;
    }

    matches.push({ team1, team2, date, time });
  }

  tournamentsData[tournament] = matches;
  saveToLocalStorage();
  alert("Tournament schedule updated successfully!");
}

function deleteTournament() {
  const selected = document.getElementById('deleteTournamentSelect').value;
  if (!selected) {
    alert("Please select a tournament to delete.");
    return;
  }

  const confirmDelete = confirm(`Are you sure you want to delete the tournament "${selected}"?`);
  if (confirmDelete) {
    delete tournamentsData[selected];
    saveToLocalStorage();
    document.getElementById('deleteTournamentSelect').value = '';
    alert("Tournament deleted successfully!");
  }
}
