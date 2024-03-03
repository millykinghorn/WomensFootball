// Define interfaces to match player data structure
interface Player {
    id: number;
    name: string;
    goals: number;
    assists: number;
}

// Fetch player data from backend
async function fetchPlayers(): Promise<Player[]> {
    console.log("Getting players data from backend")

    try {
        const response = await fetch('http://localhost:5000/players');
        if (!response.ok) {
            throw new Error('Failed to fetch players data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching players data:', error);
        return [];
    }
}

// Display player data in the UI
async function displayPlayers(): Promise<void> {
    const playersList = document.getElementById('players-list');
    if (!playersList){
        console.log("Could not find element players-list on page")
        return;
    }

    const players = await fetchPlayers();

    if (!players){
        console.log("No players found")
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
}

// Call displayPlayers function when the page loads
window.onload = displayPlayers;