# Healthcare Monolith

A Ruby on Rails monolithic application with a Vite-based React frontend for a small healthcare domain workflow.

## Features
- Patients management
- Appointments scheduling
- Rails API endpoints for the React UI

## Run locally

Start the Rails API:

```bash
cd healthcare-monolith
bundle exec rails server -p 3000
```

Start the Vite frontend:

```bash
cd healthcare-monolith/frontend
npm install
npm run dev
```

Open the frontend on http://localhost:5173 and the Rails API at http://127.0.0.1:3000/api/v1/patients.
# Healthcare-Monolith
