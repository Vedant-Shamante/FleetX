const API_BASE = "http://127.0.0.1:8000";

async function loadRiskPage() {
    try {
        const response = await fetch(
            `${API_BASE}/api/risk/`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Risk page connected:", data);

        // KPI values
        document.getElementById("riskIndex").textContent =
            data.risk_index ?? "--";

        document.getElementById("slopeStability").textContent =
            `${data.slope_stability ?? "--"}%`;

        document.getElementById("ventilationFlow").textContent =
            `${data.ventilation_flow ?? "--"}%`;

        document.getElementById("roadFriction").textContent =
            `${data.road_friction ?? "--"}%`;

        // Risk class
        document.getElementById("riskClass").textContent =
            data.risk_class ?? "--";

        // Progress bars
        document.getElementById("slopeBar").style.width =
            `${data.slope_stability ?? 0}%`;

        document.getElementById("ventilationBar").style.width =
            `${data.ventilation_flow ?? 0}%`;

        document.getElementById("frictionBar").style.width =
            `${data.road_friction ?? 0}%`;

        document.getElementById("blastBar").style.width =
            `${data.blast_clearance ?? 0}%`;

    } catch (error) {

        console.error(
            "Failed to load risk data:",
            error
        );
    }
}


// Initial load
document.addEventListener(
    "DOMContentLoaded",
    loadRiskPage
);


// Live update every 10 seconds
setInterval(
    loadRiskPage,
    10000
);