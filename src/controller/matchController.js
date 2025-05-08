const { readData, writeData } = require('../model/dataHandler');

const getMatches = (req, res) => {
  res.json(readData());
};

const updateMatchResult = (req, res) => {
  const { id, score1, score2 } = req.body;
  const matches = readData();

  const match = matches.find(m => m.id === id);
  if (match) {
    match.score1 = score1;
    match.score2 = score2;
    writeData(matches);
    res.json({ message: 'Match updated successfully' });
  } else {
    res.status(404).json({ message: 'Match not found' });
  }
};

const getStandings = (req, res) => {
  const matches = readData();
  const teams = {};

  matches.forEach(({ team1, team2, score1, score2 }) => {
    if (!(team1 in teams)) teams[team1] = initTeam();
    if (!(team2 in teams)) teams[team2] = initTeam();

    if (score1 == null || score2 == null) return;

    teams[team1].played++;
    teams[team2].played++;
    teams[team1].gf += score1;
    teams[team1].ga += score2;
    teams[team2].gf += score2;
    teams[team2].ga += score1;

    if (score1 > score2) {
      teams[team1].win++;
      teams[team1].points += 3;
      teams[team2].lose++;
    } else if (score1 < score2) {
      teams[team2].win++;
      teams[team2].points += 3;
      teams[team1].lose++;
    } else {
      teams[team1].draw++;
      teams[team2].draw++;
      teams[team1].points += 1;
      teams[team2].points += 1;
    }
  });

  const standings = Object.entries(teams).map(([team, data]) => ({
    team,
    ...data,
    gd: data.gf - data.ga
  })).sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf);

  res.json(standings);
};

function initTeam() {
  return { played: 0, win: 0, draw: 0, lose: 0, gf: 0, ga: 0, points: 0 };
}

module.exports = { getMatches, updateMatchResult, getStandings };
