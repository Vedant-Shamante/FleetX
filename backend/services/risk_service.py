from models.risk import RiskAssessment


class RiskService:

    def get_summary(self, vehicles=None):

        # If telemetry is unavailable, keep the existing baseline
        if not vehicles:
            return RiskAssessment(
                risk_index=32,
                slope_stability=82,
                ventilation_flow=68,
                road_friction=60,
                blast_clearance=30,
                risk_class="A1",
            )

        temperature_risk = 0
        brake_risk = 0
        fuel_risk = 0

        for vehicle in vehicles:

            temperature = float(
                vehicle.get("temperature", 0)
            )

            brake_pressure = float(
                vehicle.get("brake_pressure", 100)
            )

            fuel = float(
                vehicle.get("fuel", 100)
            )

            # Temperature risk
            if temperature >= 80:
                temperature_risk += 2
            elif temperature >= 70:
                temperature_risk += 1

            # Brake pressure risk
            if brake_pressure < 50:
                brake_risk += 2
            elif brake_pressure < 70:
                brake_risk += 1

            # Fuel risk
            if fuel < 20:
                fuel_risk += 1

        vehicle_count = max(len(vehicles), 1)

        temperature_factor = temperature_risk / vehicle_count
        brake_factor = brake_risk / vehicle_count
        fuel_factor = fuel_risk / vehicle_count

        # Overall risk
        risk_index = (
            25
            + temperature_factor * 15
            + brake_factor * 15
            + fuel_factor * 5
        )

        risk_index = max(
            0,
            min(100, round(risk_index))
        )

        # Environmental indicators
        slope_stability = max(
            0,
            100 - risk_index
        )

        ventilation_flow = max(
            0,
            100 - round(risk_index * 0.7)
        )

        road_friction = max(
            0,
            100 - round(risk_index * 0.5)
        )

        blast_clearance = max(
            0,
            100 - round(risk_index * 0.9)
        )

        # Risk classification
        if risk_index >= 70:
            risk_class = "C1"
        elif risk_index >= 50:
            risk_class = "B1"
        else:
            risk_class = "A1"

        return RiskAssessment(
            risk_index=risk_index,
            slope_stability=slope_stability,
            ventilation_flow=ventilation_flow,
            road_friction=road_friction,
            blast_clearance=blast_clearance,
            risk_class=risk_class,
        )