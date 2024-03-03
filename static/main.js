var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Fetch player data from backend
function fetchPlayers() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Getting players data from backend");
        try {
            const response = yield fetch('http://localhost:5000/players');
            if (!response.ok) {
                throw new Error('Failed to fetch players data');
            }
            return yield response.json();
        }
        catch (error) {
            console.error('Error fetching players data:', error);
            return [];
        }
    });
}
// Display player data in the UI
function displayPlayers() {
    return __awaiter(this, void 0, void 0, function* () {
        const playersList = document.getElementById('players-list');
        if (!playersList) {
            console.log("Could not find element players-list on page");
            return;
        }
        const players = yield fetchPlayers();
        if (!players) {
            console.log("No players found");
        }
        players.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.innerHTML = `
            <p>Name: ${player.name}</p>
            <p>Goals: ${player.goals}</p>
            <p>Assists: ${player.assists}</p>
        `;
            playersList.appendChild(playerDiv);
        });
    });
}
// Call displayPlayers function when the page loads
window.onload = displayPlayers;
