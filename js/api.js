const API_BASE_URL = "http://127.0.0.1:8000";

async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(
                `API error ${response.status}: ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error(`MineGuard API Error: ${endpoint}`, error);
        throw error;
    }
}


// -------------------------------
// Health
// -------------------------------

async function getHealth() {
    return await apiRequest("/health");
}


// -------------------------------
// Vehicles
// -------------------------------

async function getVehicles() {
    return await apiRequest("/api/vehicles");
}


// -------------------------------
// Alerts
// -------------------------------

async function getAlerts() {
    return await apiRequest("/api/alerts");
}


// -------------------------------
// Risk
// -------------------------------

async function getRisk() {
    return await apiRequest("/api/risk");
}


// -------------------------------
// Operations
// -------------------------------

async function getOperations() {
    return await apiRequest("/api/operations");
}


// -------------------------------
// Adaptation
// -------------------------------

async function getAdaptation() {
    return await apiRequest("/api/adaptation");
}