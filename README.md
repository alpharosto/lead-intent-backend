# Lead Intent Backend (Node.js + Express + MongoDB)

## What this does
- Ingests **Offer** via `POST /offer`
- Ingests **Leads CSV** via `POST /leads/upload` (columns: name,role,company,industry,location,linkedin_bio)
- Scores leads with:
  - **Rule layer (50)**: role relevance, industry match, data completeness
  - **AI layer (50)**: GPT classifies intent High/Medium/Low (+50/+30/+10)
- Returns results via `GET /results` (JSON or `?format=csv`)

## Setup
```bash
npm i
# If using local Mongo
mongod # or docker compose up -d
cp .env.example .env # if you make one
# Edit .env with your values (see below)
npm run dev
