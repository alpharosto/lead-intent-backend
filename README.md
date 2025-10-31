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

# Offer
curl -X POST http://localhost:8080/offer \
  -H "Content-Type: application/json" \
  -d '{"name":"AI Outreach Automation","value_props":["24/7 outreach","6x more meetings"],"ideal_use_cases":["B2B SaaS mid-market"]}'

# Leads CSV
curl -X POST http://localhost:8080/leads/upload \
  -F "file=@./leads.csv"

# Score
curl -X POST http://localhost:8080/score

# Results JSON
curl http://localhost:8080/results

# Results CSV
curl -L "http://localhost:8080/results?format=csv" -o results.csv