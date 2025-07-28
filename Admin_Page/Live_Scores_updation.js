window.onload = populateTodaysMatches;
function populateTodaysMatches() {
  const dropdown = document.getElementById('match');
  dropdown.innerHTML = `<option value="">-- Select Match --</option>`;

  const tournaments = JSON.parse(localStorage.getItem('tournaments')) || {};
  const today = new Date().toISOString().split('T')[0];

  for (const sport in tournaments) {
    tournaments[sport].forEach((match, index) => {
      if (match.date === today) {
        const option = document.createElement('option');
        option.value = `${sport}_${index}`;
        option.textContent = `${capitalize(sport)} - ${match.team1} vs ${match.team2}`;
        dropdown.appendChild(option);
      }
    });
  }
}

function loadMatchData() {
  const selectedValue = document.getElementById('match').value;
  const container = document.getElementById('matchFields');
  const sportFields = document.getElementById('sportFields');
  sportFields.innerHTML = '';
  if (!selectedValue) return container.style.display = 'none';

  const [sport, index] = selectedValue.split('_');
  const tournaments = JSON.parse(localStorage.getItem('tournaments')) || {};
  const match = tournaments[sport][index];

  container.style.display = 'block';
  document.getElementById('team1').value = match.team1;
  document.getElementById('team2').value = match.team2;

  const key = `${sport}-${match.team1} vs ${match.team2}`;
  const liveScores = JSON.parse(localStorage.getItem('live_scores')) || {};
  const prevData = liveScores[key];

  const score1 = prevData?.score1 || '';
  const score2 = prevData?.score2 || '';
  const extra = sport === 'cricket' ? prevData?.overs || '' : prevData?.time || '';

  sportFields.innerHTML = `
    <label>Team 1 Score:</label>
    <input type="text" id="score1" value="${score1}">

    <label>Team 2 Score:</label>
    <input type="text" id="score2" value="${score2}">

    <label>Feature:</label>
    <input type="text" id="extra" value="${extra}">
  `;
}

function updateScore() {
  const selectedValue = document.getElementById('match').value;
  if (!selectedValue) return alert("Please select a match");

  const [sport, index] = selectedValue.split('_');
  const tournaments = JSON.parse(localStorage.getItem('tournaments')) || {};
  const match = tournaments[sport][index];

  // Get values from inputs
  const team1 = document.getElementById('team1').value;
  const team2 = document.getElementById('team2').value;
  const score1 = document.getElementById('score1').value;
  const score2 = document.getElementById('score2').value;
  const extra = document.getElementById('extra').value;

  // Prepare live score object
  const liveScores = JSON.parse(localStorage.getItem('live_scores')) || {};
  const key = `${sport}-${team1} vs ${team2}`;

  const entry = {
    team1,
    team2,
    score1,
    score2,
    feature: "1.0"
  };

  if (sport === 'cricket') {
    entry.overs = extra;
  } else {
    entry.time = extra;
  }

  liveScores[key] = entry;
  localStorage.setItem('live_scores', JSON.stringify(liveScores));

  alert("Live score saved successfully!");
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
