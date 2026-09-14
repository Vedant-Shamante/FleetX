const API_BASE = "http://127.0.0.1:8000";

async function loadAdaptationPage() {
    try {
        const response = await fetch(
            `${API_BASE}/api/adaptation/`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Adaptation page connected:", data);

        // ==========================================
        // SCENARIOS
        // ==========================================

        const scenarios =
            document.getElementById("scenarios");

        if (scenarios) {
            scenarios.textContent =
                data.scenarios ?? "--";
        }

        // ==========================================
        // OPTIMIZED ROUTES
        // ==========================================

        const optimizedRoutes =
            document.getElementById("optimizedRoutes");

        if (optimizedRoutes) {
            optimizedRoutes.textContent =
                data.optimized_routes ?? "--";
        }

        // ==========================================
        // FUEL SAVINGS
        // ==========================================

        const fuelSavings =
            document.getElementById("fuelSavings");

        if (fuelSavings) {
            fuelSavings.textContent =
                `${data.fuel_savings ?? "--"}%`;
        }

        // ==========================================
        // RESPONSE TIME
        // ==========================================

        const responseTime =
            document.getElementById("responseTime");

        if (responseTime) {
            responseTime.textContent =
                `${data.response_time_minutes ?? "--"} min`;
        }

        // ==========================================
        // RECOMMENDED ACTION
        // ==========================================

        const recommendedAction =
            document.getElementById("recommendedAction");

        if (recommendedAction) {
            recommendedAction.textContent =
                data.recommended_action ?? "--";
        }

        // ==========================================
        // LIVE STATUS
        // ==========================================

        const statusPills =
            document.querySelectorAll(".status-pill");

        statusPills.forEach(pill => {
            pill.textContent = "LIVE";
        });

    } catch (error) {

        console.error(
            "Failed to load adaptation data:",
            error
        );
    }
}


// ==========================================
// INITIAL LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadAdaptationPage
);


// ==========================================
// LIVE REFRESH
// ==========================================

setInterval(
    loadAdaptationPage,
    10000
);