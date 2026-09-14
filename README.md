# TwiNova

This project contains a mining digital twin dashboard and a FastAPI backend.

## Project structure

- `index.html` — dashboard landing page
- `css/` — dashboard styles
- `js/` — dashboard interactivity
- `pages/` — dashboard subpages
- `backend/` — FastAPI backend and services

## Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The API offers endpoints for:
- vehicles
- alerts
- risk
- operations
- adaptation

## Health check

```bash
curl http://localhost:8000/health
```
