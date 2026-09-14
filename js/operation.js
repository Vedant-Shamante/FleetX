const API_BASE = "http://127.0.0.1:8000";

async function loadOperationsPage() {
    try {
        const response = await fetch(
            `${API_BASE}/api/operations/`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Operations page connected:", data);

        // Ore moved
        const oreMoved =
            document.getElementById("oreMoved");

        if (oreMoved) {
            oreMoved.textContent =
                data.ore_moved ?? "--";
        }

        // Cycle efficiency
        const cycleEfficiency =
            document.getElementById("cycleEfficiency");

        if (cycleEfficiency) {
            cycleEfficiency.textContent =
                `${data.cycle_efficiency ?? "--"}%`;
        }

        // Throughput
        const throughput =
            document.getElementById("throughput");

        if (throughput) {
            throughput.textContent =
                data.throughput ?? "--";
        }

        // Downtime
        const downtime =
            document.getElementById("downtime");

        if (downtime) {
            downtime.textContent =
                `${data.downtime ?? "--"}%`;
        }

    } catch (error) {
        console.error(
            "Failed to load operations data:",
            error
        );
    }
}


// Run when page loads
document.addEventListener(
    "DOMContentLoaded",
    loadOperationsPage
);


// Refresh every 10 seconds
setInterval(
    loadOperationsPage,
    10000
);ss