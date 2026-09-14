const API_BASE = "http://127.0.0.1:8000";


// ==========================================
// LOAD VEHICLES
// ==========================================

async function loadVehiclesPage() {

    try {

        const response = await fetch(
            `${API_BASE}/api/vehicles/`
        );

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const data = await response.json();

        console.log(
            "Vehicles page connected:",
            data
        );


        // ==========================================
        // GET VEHICLE ARRAY
        // ==========================================

        const vehicles = data.vehicles || [];


        // ==========================================
        // RENDER VEHICLES
        // ==========================================

        renderVehicles(vehicles);


        // ==========================================
        // UPDATE SUMMARY
        // ==========================================

        updateVehicleSummary(vehicles, data);


        // ==========================================
        // CONNECTION STATUS
        // ==========================================

        const connection =
            document.getElementById(
                "vehicleConnection"
            );

        if (connection) {
            connection.textContent = "LIVE";
        }


    } catch (error) {

        console.error(
            "Failed to load vehicle data:",
            error
        );

        const connection =
            document.getElementById(
                "vehicleConnection"
            );

        if (connection) {
            connection.textContent = "OFFLINE";
        }

    }

}


// ==========================================
// RENDER VEHICLE CARDS
// ==========================================

function renderVehicles(vehicles) {

    const grid =
        document.getElementById(
            "vehicleGrid"
        );

    if (!grid) {
        return;
    }


    if (!vehicles.length) {

        grid.innerHTML = `
            <div class="vehicle-loading">
                No vehicle telemetry available.
            </div>
        `;

        return;
    }


    grid.innerHTML = "";


    vehicles.forEach(vehicle => {

        const card =
            document.createElement("div");

        card.className =
            "vehicle-card";


        // ==========================================
        // NORMALIZE STATUS
        // ==========================================

        const status =
            String(
                vehicle.status || "Unknown"
            );


        const statusLower =
            status.toLowerCase();


        let statusClass = "unknown";

        if (
            statusLower.includes("operat")
        ) {
            statusClass = "operating";
        }

        else if (
            statusLower.includes("idle")
        ) {
            statusClass = "idle";
        }

        else if (
            statusLower.includes("maint")
        ) {
            statusClass = "maintenance";
        }


        // ==========================================
        // VEHICLE VALUES
        // ==========================================

        const id =
            vehicle.id ?? "--";

        const speed =
            vehicle.speed ?? "--";

        const fuel =
            vehicle.fuel ?? "--";

        const temperature =
            vehicle.temperature ?? "--";

        const brakePressure =
            vehicle.brake_pressure ?? "--";


        // ==========================================
        // CARD HTML
        // ==========================================

        card.innerHTML = `

            <div class="vehicle-card-header">

                <div class="vehicle-id">
                    ${id}
                </div>

                <div class="vehicle-status ${statusClass}">
                    <span class="status-dot"></span>
                    ${status}
                </div>

            </div>


            <div class="vehicle-divider"></div>


            <div class="vehicle-metrics">

                <div class="vehicle-metric">

                    <span>
                        Speed
                    </span>

                    <strong>
                        ${speed} km/h
                    </strong>

                </div>


                <div class="vehicle-metric">

                    <span>
                        Fuel
                    </span>

                    <strong>
                        ${fuel}%
                    </strong>

                </div>


                <div class="vehicle-metric">

                    <span>
                        Temperature
                    </span>

                    <strong>
                        ${temperature}°C
                    </strong>

                </div>


                <div class="vehicle-metric">

                    <span>
                        Brake pressure
                    </span>

                    <strong>
                        ${brakePressure}%
                    </strong>

                </div>

            </div>


            <div class="vehicle-health">

                <span>
                    Vehicle health
                </span>

                <strong>
                    NORMAL
                </strong>

            </div>

        `;


        grid.appendChild(card);

    });

}


// ==========================================
// UPDATE VEHICLE SUMMARY
// ==========================================

function updateVehicleSummary(
    vehicles,
    data
) {

    const activeFleet =
        document.getElementById(
            "activeFleet"
        );

    const idleVehicles =
        document.getElementById(
            "idleVehicles"
        );

    const maintenanceVehicles =
        document.getElementById(
            "maintenanceVehicles"
        );

    const fleetUtilization =
        document.getElementById(
            "fleetUtilization"
        );


    let operating = 0;
    let idle = 0;
    let maintenance = 0;


    vehicles.forEach(vehicle => {

        const status =
            String(
                vehicle.status || ""
            ).toLowerCase();


        if (
            status.includes("operat")
        ) {
            operating++;
        }

        else if (
            status.includes("idle")
        ) {
            idle++;
        }

        else if (
            status.includes("maint")
        ) {
            maintenance++;
        }

    });


    // ==========================================
    // USE BACKEND TOTAL WHEN AVAILABLE
    // ==========================================

    const total =
        vehicles.length;


    if (activeFleet) {
        activeFleet.textContent =
            data.digital_twin?.operating ??
            operating;
    }


    if (idleVehicles) {
        idleVehicles.textContent =
            data.digital_twin?.idle ??
            idle;
    }


    if (maintenanceVehicles) {
        maintenanceVehicles.textContent =
            data.digital_twin?.maintenance ??
            maintenance;
    }


    if (fleetUtilization) {

        let utilization = 0;

        if (total > 0) {

            utilization =
                Math.round(
                    (operating / total) * 100
                );

        }

        fleetUtilization.textContent =
            `${utilization}%`;

    }

}


// ==========================================
// INITIAL LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadVehiclesPage
);

// ==========================================
// LIVE TELEMETRY REFRESH
// Refresh every 2 seconds
// ==========================================

setInterval(() => {
    loadVehiclesPage();
}, 2000);