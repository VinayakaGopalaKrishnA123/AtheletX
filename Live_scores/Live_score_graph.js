const live_scores = JSON.parse(localStorage.getItem('live_scores')) || {};

    const slider = document.getElementById('slider');

    function createSlide(sport, team1, team2, score1, score2, feature, idPrefix) {
      const slide = document.createElement('div');
      slide.className = 'slide';

      slide.innerHTML = `
        <h1>Live ${capitalize(sport)} Dashboard</h1>
        <div class="section">
          <h2>Live Score</h2>
          <div class="team">
            <div><span class="label">Team A Score:</span> <span id="${idPrefix}A-points">${score1}</span></div>
          </div>
          <div class="team">
            <div><span class="label">Team B Score:</span> <span id="${idPrefix}B-points">${score2}</span></div>
          </div>
          <div class="team">
            <div><span class="label"></span> <span id="${idPrefix}-feature">${feature}</span></div>
          </div>
          <button class="summary-btn" onclick="toggleSummary('${idPrefix}Summary')">Match Summary</button>
          <div id="${idPrefix}Summary" class="summary" style="display:none;">
            <p><strong>Venue:</strong> Sample Stadium</p>
            <p><strong>Status:</strong> Match in progress</p>
          </div>
          <div class="chart-section">
            <div class="chart-row">
              <div class="chart-box"><div id="${idPrefix}Chart1"></div></div>
              <div class="chart-box"><div id="${idPrefix}Chart2"></div></div>
            </div>
          </div>
        </div>
      `;

      slider.appendChild(slide);

      // Chart data by sport
      let lineData = [];
      let pieLabels = [];
      let pieData = [];

      switch (sport.toLowerCase()) {
        case "cricket":
          lineData = [6, 8, 7, 10, 12, 15, 18];
          pieLabels = ["Bowled", "Caught", "Run Out"];
          pieData = [2, 3, 1];
          break;
        case "kabaddi":
          lineData = [5, 10, 12, 15, 20];
          pieLabels = ["Raids", "Tackles", "All-outs"];
          pieData = [22, 15, 5];
          break;
        case "basketball":
          lineData = [20, 25, 22, 22];
          pieLabels = ["3PT", "Assists", "Fouls"];
          pieData = [8, 15, 12];
          break;
        case "volleyball":
          lineData = [25, 23, 27];
          pieLabels = ["Aces", "Blocks", "Errors"];
          pieData = [6, 5, 2];
          break;
        case "football":
          lineData = [1, 2, 2, 3];
          pieLabels = ["Possession", "Shots", "Fouls"];
          pieData = [55, 30, 15];
          break;
        default:
          lineData = [10, 20, 30, 25, 15];
          pieLabels = ["Team 1", "Team 2"];
          pieData = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
      }

      renderLineChart(`#${idPrefix}Chart1`, `${team1} Performance`, team1, lineData);
      renderPieChart(`#${idPrefix}Chart2`, `${capitalize(sport)} Stats`, pieLabels, pieData);
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Render slides for each match
    for (const key in live_scores) {
      const [sport, _] = key.split('-');
      const { team1, team2, score1, score2, feature } = live_scores[key];

      const isCricket = sport.toLowerCase() === "cricket";
      const featureLabel = isCricket ? "Overs" : "Time";
      const cleanFeature = feature.includes(":") ? feature.split(":")[1].trim() : feature;
      const formattedFeature = `${featureLabel}: ${cleanFeature}`;

      const idPrefix = `${sport}-${team1}-${team2}`.replace(/\s+/g, '').toLowerCase();
      createSlide(sport, team1, team2, score1, score2, formattedFeature, idPrefix);
    }

    // Slider nav
    let currentIndex = 0;
    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
    }
    function nextSlide() {
      if (currentIndex < slider.children.length - 1) {
        currentIndex++;
        updateSlider();
      }
    }
    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    }

    function toggleSummary(id) {
      const el = document.getElementById(id);
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }

    // Chart functions
    function renderLineChart(id, title, seriesName, dataPoints) {
      new ApexCharts(document.querySelector(id), {
        chart: { type: 'line', height: 250 },
        series: [{ name: seriesName, data: dataPoints }],
        xaxis: { title: { text: 'Time/Interval' } },
        yaxis: { title: { text: 'Points' } },
        title: { text: title, align: 'left' }
      }).render();
    }

    function renderPieChart(id, title, labels, series) {
      new ApexCharts(document.querySelector(id), {
        chart: { type: 'pie', height: 250 },
        labels: labels,
        series: series,
        title: { text: title, align: 'left' }
      }).render();
    }
