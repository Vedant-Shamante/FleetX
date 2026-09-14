const API_BASE = "http://127.0.0.1:8000";

// ==================================================
// OVERVIEW DASHBOARD
// ==================================================

async function loadOverviewDashboard() {

    try {

        // ==================================================
        // 1. LOAD VEHICLES
        // ==================================================

        const vehicleResponse =
            await fetch(`${API_BASE}/api/vehicles/`);

        if (!vehicleResponse.ok) {
            throw new Error(
                `Vehicle API error: ${vehicleResponse.status}`
            );
        }

        const vehicleData =
            await vehicleResponse.json();

        const vehicles =
            vehicleData.vehicles || [];


        // ==================================================
        // 2. VEHICLE STATUS COUNTS
        // ==================================================

        const operating =
            vehicles.filter(
                v => v.status?.toLowerCase() === "operating"
            ).length;

        const idle =
            vehicles.filter(
                v => v.status?.toLowerCase() === "idle"
            ).length;

        const maintenance =
            vehicles.filter(
                v => v.status?.toLowerCase() === "maintenance"
            ).length;

        const totalVehicles =
            vehicles.length;


        // ==================================================
        // 3. UPDATE VEHICLE KPIs
        // ==================================================

        const vehicleCount =
            document.getElementById("vehicleCount");

        const overviewVehicleCount =
            document.getElementById("overviewVehicleCount");

        if (vehicleCount) {
            vehicleCount.textContent = operating;
        }

        if (overviewVehicleCount) {
            overviewVehicleCount.textContent = totalVehicles;
        }


        // ==================================================
        // 4. VEHICLE STATUS
        // ==================================================

        const operatingElement =
            document.getElementById("overviewOperating");

        const idleElement =
            document.getElementById("overviewIdle");

        const maintenanceElement =
            document.getElementById("overviewMaintenance");

        if (operatingElement) {
            operatingElement.textContent = operating;
        }

        if (idleElement) {
            idleElement.textContent = idle;
        }

        if (maintenanceElement) {
            maintenanceElement.textContent = maintenance;
        }


        // ==================================================
        // 5. VEHICLE DISTRIBUTION BAR
        // ==================================================

        if (totalVehicles > 0) {

            const operatingBar =
                document.getElementById("overviewOperatingBar");

            const idleBar =
                document.getElementById("overviewIdleBar");

            const maintenanceBar =
                document.getElementById(
                    "overviewMaintenanceBar"
                );

            if (operatingBar) {
                operatingBar.style.width =
                    `${(operating / totalVehicles) * 100}%`;
            }

            if (idleBar) {
                idleBar.style.width =
                    `${(idle / totalVehicles) * 100}%`;
            }

            if (maintenanceBar) {
                maintenanceBar.style.width =
                    `${(maintenance / totalVehicles) * 100}%`;
            }
        }


        // ==================================================
        // 6. LOAD DIGITAL TWIN
        // ==================================================

        const twinResponse =
            await fetch(`${API_BASE}/api/digital-twin/`);

        if (!twinResponse.ok) {
            throw new Error(
                `Digital Twin API error: ${twinResponse.status}`
            );
        }

        const twinData =
            await twinResponse.json();

        console.log(
            "Digital Twin connected:",
            twinData
        );


        // ==================================================
        // 7. DIGITAL TWIN STATUS
        // ==================================================

        const twinStatus =
            document.getElementById("twinStatus");

        if (twinStatus) {

            twinStatus.textContent = "LIVE";

            twinStatus.className =
                "status-pill";
        }


        // ==================================================
        // 8. DIGITAL TWIN VEHICLE COUNT
        // ==================================================

        const twinVehicleCount =
            document.getElementById("twinVehicleCount");

        if (twinVehicleCount) {

            twinVehicleCount.textContent =
                twinData.vehicle_count ??
                totalVehicles;
        }


        // ==================================================
        // 9. LOAD ALERTS
        // ==================================================

        const alertResponse =
            await fetch(`${API_BASE}/api/alerts/`);

        if (!alertResponse.ok) {
            throw new Error(
                `Alert API error: ${alertResponse.status}`
            );
        }

        const alertData =
            await alertResponse.json();

        const alerts =
            alertData.alerts || [];


        // ==================================================
        // 10. ALERT COUNT
        // ==================================================

        const alertCount =
            document.getElementById("alertCount");

        const overviewAlertCount =
            document.getElementById(
                "overviewAlertCount"
            );

        const totalAlerts =
            alertData.total ?? alerts.length;

        if (alertCount) {
            alertCount.textContent =
                totalAlerts;
        }

        if (overviewAlertCount) {
            overviewAlertCount.textContent =
                totalAlerts;
        }


        // ==================================================
        // 11. DISPLAY ALERTS
        // ==================================================

        const overviewAlerts =
            document.getElementById(
                "overviewAlerts"
            );

        if (overviewAlerts) {

            overviewAlerts.innerHTML = "";

            alerts.slice(0, 3).forEach(alert => {

                const severity =
                    alert.severity?.toLowerCase() ||
                    "medium";

                const iconClass =
                    severity === "high"
                        ? "high-icon"
                        : "medium-icon";

                const textClass =
                    severity === "high"
                        ? "high-text"
                        : "medium-text";

                const row =
                    document.createElement("div");

                row.className =
                    "alert-row";

                row.innerHTML = `

                    <div class="alert-icon ${iconClass}">
                        !
                    </div>

                    <div class="alert-info">

                        <strong>
                            ${alert.type || "Alert"}
                        </strong>

                        <span>
                            ${alert.zone || "Unknown zone"}
                            ·
                            ${alert.time || "Live"}
                        </span>

                    </div>

                    <span class="alert-level ${textClass}">
                        ${severity.toUpperCase()}
                    </span>

                `;

                overviewAlerts.appendChild(row);

            });
        }


        // ==================================================
        // 12. LOAD RISK
        // ==================================================

        const riskResponse =
            await fetch(`${API_BASE}/api/risk/`);

        if (!riskResponse.ok) {
            throw new Error(
                `Risk API error: ${riskResponse.status}`
            );
        }

        const riskData =
            await riskResponse.json();

        console.log(
            "Overview risk data:",
            riskData
        );


        // ==================================================
        // 13. RISK INDEX
        // ==================================================

        const riskIndex =
            document.getElementById("riskIndex");

        if (riskIndex) {

            riskIndex.textContent =
                riskData.risk_index ?? "--";
        }


        // ==================================================
        // 14. RISK CLASS
        // ==================================================

        const riskClass =
            document.getElementById("riskClass");

        if (riskClass) {

            riskClass.textContent =
                riskData.risk_class ?? "--";
        }


        // ==================================================
        // 15. RISK VALUES
        // ==================================================

        updateRiskValue(
            "slopeBar",
            "slopeLevel",
            riskData.slope_stability
        );

        updateRiskValue(
            "ventilationBar",
            "ventilationLevel",
            riskData.ventilation_flow
        );

        updateRiskValue(
            "frictionBar",
            "frictionLevel",
            riskData.road_friction
        );

        updateRiskValue(
            "blastBar",
            "blastLevel",
            riskData.blast_clearance
        );


        // ==================================================
        // 16. CONNECTION LOG
        // ==================================================

        console.log(
            "Overview dashboard connected:",
            {
                totalVehicles: totalVehicles,
                operating: operating,
                idle: idle,
                maintenance: maintenance,
                alerts: totalAlerts,
                risk: riskData.risk_index,
                digitalTwinVehicles:
                    twinData.vehicle_count
            }
        );


    } catch (error) {

        console.error(
            "Failed to load Overview dashboard:",
            error
        );

        const twinStatus =
            document.getElementById("twinStatus");

        if (twinStatus) {

            twinStatus.textContent =
                "OFFLINE";

        }
    }
}


// ==================================================
// RISK UI HELPER
// ==================================================

function updateRiskValue(
    barId,
    levelId,
    value
) {

    const bar =
        document.getElementById(barId);

    const level =
        document.getElementById(levelId);


    if (
        value === undefined ||
        value === null
    ) {

        if (bar) {
            bar.style.width = "0%";
        }

        if (level) {
            level.textContent = "--";
        }

        return;
    }


    const safeValue =
        Math.max(
            0,
            Math.min(
                100,
                Number(value)
            )
        );


    if (bar) {

        bar.style.width =
            `${safeValue}%`;
    }


    if (level) {

        if (safeValue >= 75) {

            level.textContent =
                "HIGH";

            level.className =
                "risk high";

        }

        else if (safeValue >= 50) {

            level.textContent =
                "MEDIUM";

            level.className =
                "risk medium";

        }

        else {

            level.textContent =
                "LOW";

            level.className =
                "risk low";
        }
    }
}


// ==================================================
// START
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    loadOverviewDashboard
);


// ==================================================
// LIVE REFRESH
// ==================================================

setInterval(
    loadOverviewDashboard,
    10000
);