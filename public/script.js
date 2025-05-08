document.addEventListener("DOMContentLoaded", () => {
    fetchMatches();
    fetchStandings();
  });
  
  function fetchMatches() {
    fetch("/api/matches")
      .then(res => res.json())
      .then(data => renderMatches(data));
  }
  
  function renderMatches(matches) {
    const tbody = document.querySelector("#match-table tbody");
    tbody.innerHTML = "";
    matches.forEach(match => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${match.id}</td>
        <td>${match.team1}</td>
        <td>
          <input type="number" id="score1-${match.id}" value="${match.score1 ?? ""}" min="0">
          -
          <input type="number" id="score2-${match.id}" value="${match.score2 ?? ""}" min="0">
        </td>
        <td>${match.team2}</td>
        <td><button onclick="submitScore(${match.id})">Lưu</button></td>
      `;
      tbody.appendChild(row);
    });
  }
  
  function submitScore(id) {
    const score1 = parseInt(document.getElementById(`score1-${id}`).value);
    const score2 = parseInt(document.getElementById(`score2-${id}`).value);
  
    if (isNaN(score1) || isNaN(score2)) {
      alert("Vui lòng nhập đầy đủ tỉ số");
      return;
    }
  
    fetch("/api/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, score1, score2 })
    })
      .then(res => res.json())
      .then(() => {
        fetchMatches();
        fetchStandings();
      });
  }
  
  function fetchStandings() {
    fetch("/api/standings")
      .then(res => res.json())
      .then(data => renderStandings(data));
  }
  
  function renderStandings(standings) {
    const tbody = document.querySelector("#standings-table tbody");
    tbody.innerHTML = "";
    standings.forEach(team => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${team.team}</td>
        <td>${team.played}</td>
        <td>${team.win}</td>
        <td>${team.draw}</td>
        <td>${team.lose}</td>
        <td>${team.gf}</td>
        <td>${team.ga}</td>
        <td>${team.gd}</td>
        <td>${team.points}</td>
      `;
      tbody.appendChild(row);
    });
  }
  