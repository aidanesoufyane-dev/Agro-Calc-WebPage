# AgroCalc Pro website

The AgroCalc Pro website combines an Android product landing site, fertigation knowledge base, browser NPK calculator, and PlantDoctor AI.

## PlantDoctor AI

PlantDoctor accepts plant photos and symptom descriptions. A private Netlify function sends them to Groq's multimodal API, validates the structured assessment, and saves text-only guest conversations in MongoDB. Photos are processed for the request and are not stored.

See [requirements.md](requirements.md) and [architecture.md](architecture.md).

## Setup

1. Install Node.js 22 or newer.
2. Run `npm install`.
3. Copy `.env.example` values into the deployment environment.
4. Create a MongoDB Atlas database and allow the Netlify runtime to connect.
5. Set `GROQ_API_KEY` and `MONGODB_URI` as private Netlify environment variables.
6. Run `npm run dev` for the Vite UI.
7. Use `netlify dev` when testing the serverless endpoint locally.
8. Run `npm run build` and `npm run check` before deployment.

## Environment variables

- `VITE_GOOGLE_SITE_VERIFICATION`: optional public Search Console value.
- `AI_PROVIDER`: documents the active provider; set to `groq`.
- `GROQ_API_KEY`: private Groq API key.
- `GROQ_MODEL`: configurable vision model; defaults to `qwen/qwen3.8-27b`.
- `MONGODB_URI`: private MongoDB connection string.
- `MONGODB_DB`: database name; defaults to `agrocalc`.

Never prefix a secret with `VITE_`. Add the real values in Netlify, not in this repository.

## Deployment

Netlify publishes `dist` and rewrites `/api/plant-doctor` to the serverless function. On first use, the function creates the MongoDB indexes needed for unique guest conversations, recent sorting, and quota expiry.

## Security and cost

The endpoint validates image type, count, decoded size, message length, IDs, and model output. It sends only recent text context and caps model output. MongoDB provides a durable five-request daily guest limit. Browser history remains available locally, and MongoDB stores diagnosis text only. The anonymous client ID is suitable for guest continuity and rate limiting; use real authentication before adding cross-device access or sensitive plant records.
