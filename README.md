# Lead Intent Backend (Node.js + Express + MongoDB)

**Live API:**  
👉 [https://lead-intent-backend-task.onrender.com](https://lead-intent-backend-task.onrender.com)

---

## 🧠 Overview

This backend service classifies **B2B leads** by intent using both:
- ✅ **Rule-based scoring** (role, industry, data completeness)
- 🤖 **AI-based scoring** (OpenAI GPT model)

It allows:
1. Uploading an Offer (product or service description)
2. Uploading a CSV of prospect leads
3. Automatically scoring them (0–100)
4. Fetching scored results (JSON or CSV)

---

## 🧩 Tech Stack

| Component | Description |
|------------|--------------|
| **Runtime** | Node.js (v18+) |
| **Framework** | Express.js |
| **Database** | MongoDB (via Mongoose) |
| **AI Model** | OpenAI GPT (or fallback if quota exceeded) |
| **Logging** | Pino |
| **Deployment** | Docker + Render |
| **Testing** | Jest + Supertest |

---

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