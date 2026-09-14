window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/health");
        const data = await response.json();

        console.log("MineGuard Backend Connected:", data);
    } catch (error) {
        console.error("MineGuard Backend Connection Failed:", error);
    }
});