const gameNights = [
    {
        date: "2025-04-13",
        results: ["Beckham", "Ota", "Mogale", "Africa", "Teboho", "Gomo"]
    },
    {
        date: "2025-04-26",
        results: ["Mogale", "Gomo", "Teboho", "Ota", "Africa", "Beckham"]
    }
    }
];

// Points system
const pointsPerPosition = [5, 4, 3, 2, 1, 0];

// Calculate total points for each player
const playerPoints = {};

gameNights.forEach(night => {
    night.results.forEach((player, index) => {
        if (!playerPoints[player]) {
            playerPoints[player] = 0;
        }
        playerPoints[player] += pointsPerPosition[index] || 0;
    });
});

// Sort players by points
const sortedPlayers = Object.keys(playerPoints).sort((a, b) => playerPoints[b] - playerPoints[a]);

// Populate standings page
if (document.getElementById('standings-body')) {
    const standingsBody = document.getElementById('standings-body');

    sortedPlayers.forEach((player, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player}</td>
            <td>${playerPoints[player]}</td>
        `;

        standingsBody.appendChild(row);
    });
}

// Populate results page
if (document.getElementById('results-body')) {
    const resultsBody = document.getElementById('results-body');

    gameNights.forEach(night => {
        const nightDiv = document.createElement('div');
        nightDiv.className = 'night';

        let nightHtml = `<h3>${night.date}</h3><ol>`;
        night.results.forEach((player, index) => {
            let medalClass = '';
            if (index === 0) medalClass = 'gold';
            else if (index === 1) medalClass = 'silver';
            else if (index === 2) medalClass = 'bronze';

            nightHtml += `<li class="${medalClass}">${player}</li>`;
        });
        nightHtml += `</ol>`;

        nightDiv.innerHTML = nightHtml;
        resultsBody.appendChild(nightDiv);
    });
}
