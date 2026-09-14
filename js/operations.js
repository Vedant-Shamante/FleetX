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

        // ==========================================
        // ORE MOVED
        // ==========================================

        const oreMoved =
            document.getElementById("oreMoved");

        if (oreMoved) {
            oreMoved.textContent =
                data.ore_moved ?? "--";
        }

        // ==========================================
        // CYCLE EFFICIENCY
        // ==========================================

        const cycleEfficiency =
            document.getElementById("cycleEfficiency");

        if (cycleEfficiency) {
            cycleEfficiency.textContent =
                `${data.cycle_efficiency ?? "--"}%`;
        }

        // ==========================================
        // THROUGHPUT
        // ==========================================

        const throughput =
            document.getElementById("throughput");

        if (throughput) {
            throughput.textContent =
                data.throughput ?? "--";
        }

        // ==========================================
        // DOWNTIME
        // ==========================================

        const downtime =
            document.getElementById("downtime");

        if (downtime) {
            downtime.textContent =
                `${data.downtime ?? "--"}%`;
        }

        // ==========================================
        // LIVE STATUS
        // ==========================================

        const statusPills =
            document.querySelectorAll(".status-pill");

        statusPills.forEach(pill => {

            if (
                data.status &&
                data.status.toLowerCase() === "live"
            ) {
                pill.textContent = "LIVE";
            } else {
                pill.textContent =
                    data.status ?? "UNKNOWN";
            }
        });

    } catch (error) {

        console.error(
            "Failed to load operations data:",
            error
        );
    }
}


// ==========================================
// INITIAL LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadOperationsPage
);


// ==========================================
// LIVE REFRESH
// ==========================================

setInterval(
    loadOperationsPage,
    10000
);