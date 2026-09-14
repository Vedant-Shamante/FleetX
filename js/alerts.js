const API_BASE = "http://127.0.0.1:8000";


// ==========================================
// LOAD ALERTS PAGE
// ==========================================

async function loadAlertsPage() {

    try {

        const response = await fetch(
            `${API_BASE}/api/alerts/`
        );

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const data = await response.json();

        console.log(
            "Alerts page connected:",
            data
        );


        // ==========================================
        // CONNECTION STATUS
        // ==========================================

        const statusPill =
            document.querySelector(".status-pill");

        if (statusPill) {
            statusPill.textContent = "LIVE";
        }


        // ==========================================
        // KPI VALUES
        // ==========================================

        const totalAlerts =
            document.getElementById("totalAlerts");

        const highAlerts =
            document.getElementById("highAlerts");

        const mediumAlerts =
            document.getElementById("mediumAlerts");

        const alertCount =
            document.getElementById("alertCount");


        if (totalAlerts) {
            totalAlerts.textContent =
                data.total ?? 0;
        }


        if (highAlerts) {
            highAlerts.textContent =
                data.high ?? 0;
        }


        if (mediumAlerts) {
            mediumAlerts.textContent =
                data.medium ?? 0;
        }


        if (alertCount) {
            alertCount.textContent =
                data.total ?? 0;
        }


        // ==========================================
        // RECENT ALERTS CONTAINER
        // ==========================================

        const recentAlerts =
            document.getElementById(
                "recentAlerts"
            );

        if (!recentAlerts) {
            return;
        }


        const alerts =
            Array.isArray(data.alerts)
                ? data.alerts
                : [];


        // Clear previous alerts

        recentAlerts.innerHTML = "";


        // ==========================================
        // NO ALERTS
        // ==========================================

        if (alerts.length === 0) {

            recentAlerts.innerHTML = `

                <div class="alert-row">

                    <div class="alert-icon low-icon">
                        ✓
                    </div>

                    <div class="alert-info">

                        <strong>
                            No active alerts
                        </strong>

                        <span>
                            MineGuard monitoring is normal
                        </span>

                    </div>

                    <span class="alert-level low-text">
                        CLEAR
                    </span>

                </div>

            `;

            return;
        }


        // ==========================================
        // CREATE ALERT ROWS
        // ==========================================

        alerts.forEach(alert => {

            const severity =
                String(
                    alert.severity || "medium"
                ).toLowerCase();


            // ==========================================
            // SEVERITY CLASSES
            // ==========================================

            let iconClass = "medium-icon";
            let textClass = "medium-text";


            if (severity === "high") {

                iconClass = "high-icon";
                textClass = "high-text";

            }

            else if (severity === "low") {

                iconClass = "low-icon";
                textClass = "low-text";

            }


            // ==========================================
            // CREATE ROW
            // ==========================================

            const row =
                document.createElement("div");

            row.className = "alert-row";


            // ==========================================
            // ALERT CONTENT
            // ==========================================

            row.innerHTML = `

                <div class="alert-icon ${iconClass}">
                    !
                </div>

                <div class="alert-info">

                    <strong>
                        ${escapeHTML(
                            alert.type ||
                            "Unknown alert"
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            alert.zone ||
                            "Unknown zone"
                        )}
                        ·
                        ${escapeHTML(
                            alert.time || ""
                        )}
                    </span>

                </div>

                <span
                    class="alert-level ${textClass}">
                    ${severity.toUpperCase()}
                </span>

            `;


            recentAlerts.appendChild(row);

        });


    } catch (error) {

        console.error(
            "Failed to load alerts data:",
            error
        );


        // ==========================================
        // CONNECTION STATUS
        // ==========================================

        const statusPill =
            document.querySelector(".status-pill");

        if (statusPill) {
            statusPill.textContent = "OFFLINE";
        }


        // ==========================================
        // ERROR DISPLAY
        // ==========================================

        const recentAlerts =
            document.getElementById(
                "recentAlerts"
            );

        if (recentAlerts) {

            recentAlerts.innerHTML = `

                <div class="alert-row">

                    <div class="alert-icon high-icon">
                        !
                    </div>

                    <div class="alert-info">

                        <strong>
                            API connection failed
                        </strong>

                        <span>
                            Unable to load alert data
                        </span>

                    </div>

                    <span class="alert-level high-text">
                        ERROR
                    </span>

                </div>

            `;

        }

    }

}


// ==========================================
// SAFE HTML TEXT
// ==========================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================================
// INITIAL LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadAlertsPage
);


// ==========================================
// LIVE REFRESH
// ==========================================

setInterval(
    loadAlertsPage,
    10000
);