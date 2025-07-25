const matches = {
        cricket15: {
            sport: 'cricket',
            team1: 'Team A',
            team2: 'Team B',
            score1: '123/4',
            score2: '119/2',
            overs: '15.2'
        },
        kabaddi1: {
            sport: 'kabaddi',
            team1: 'Raiders',
            team2: 'Warriors',
            score1: 32,
            score2: 27,
            time: '12:34'
        },
        football2: {
            sport: 'football',
            team1: 'Tigers',
            team2: 'Lions',
            score1: 1,
            score2: 2,
            time: 78
        }
    };

    function loadMatchData() {
        const selectedMatch = document.getElementById('match').value;
        const container = document.getElementById('matchFields');
        const sportFields = document.getElementById('sportFields');
        sportFields.innerHTML = '';

        if (!selectedMatch) {
            container.style.display = 'none';
            return;
        }

        const match = matches[selectedMatch];
        container.style.display = 'block';
        document.getElementById('team1').value = match.team1;
        document.getElementById('team2').value = match.team2;

        if (match.sport === 'cricket') {
            sportFields.innerHTML = `
                <label>Team 1 Score:</label>
                <input type="text" id="score1" value="${match.score1}">

                <label>Team 2 Score:</label>
                <input type="text" id="score2" value="${match.score2}">

                <label>Overs:</label>
                <input type="text" id="overs" value="${match.overs}">
            `;
        } else if (match.sport === 'kabaddi') {
            sportFields.innerHTML = `
                <label>Team 1 Score:</label>
                <input type="number" id="score1" value="${match.score1}">

                <label>Team 2 Score:</label>
                <input type="number" id="score2" value="${match.score2}">

                <label>Time Remaining (mm:ss):</label>
                <input type="text" id="time" value="${match.time}">
            `;
        } else if (match.sport === 'football') {
            sportFields.innerHTML = `
                <label>Team 1 Score:</label>
                <input type="number" id="score1" value="${match.score1}">

                <label>Team 2 Score:</label>
                <input type="number" id="score2" value="${match.score2}">

                <label>Match Time (minutes):</label>
                <input type="number" id="time" value="${match.time}">
            `;
        }
    }

    function updateScore() {
        const selectedMatch = document.getElementById('match').value;
        if (!selectedMatch) return alert("Please select a match");

        const updatedData = {
            team1: document.getElementById('team1').value,
            team2: document.getElementById('team2').value,
            score1: document.getElementById('score1')?.value,
            score2: document.getElementById('score2')?.value,
            overs: document.getElementById('overs')?.value,
            time: document.getElementById('time')?.value,
        };

        console.log("Updated Data for", selectedMatch, ":", updatedData);
        alert("Score updated! (You can send this to backend/database)");
    }