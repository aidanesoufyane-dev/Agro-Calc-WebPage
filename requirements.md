# PlantDoctor AI requirements

## Implemented

- Public responsive plant-health chat at `/plant-doctor`.
- One to three JPG, PNG, or WEBP photos per request.
- Client-side resizing and compression.
- Groq multimodal diagnosis through a private Netlify function.
- Structured observations, likely cause, alternatives, questions, actions, prevention, and monitoring.
- Runtime validation of Groq JSON-mode responses.
- Qualitative confidence: low, moderate, or high.
- Local guest history plus text-only MongoDB persistence.
- Durable five-request daily quota stored in MongoDB.
- Uploaded photos are not stored.
- Search, new diagnosis, delete local diagnosis, stop request, example diagnosis, and failure states.
- English and French site controls; the assistant answers in the user's language.

## Production configuration

- Set `GROQ_API_KEY` in Netlify.
- Set `MONGODB_URI` in Netlify.
- Optionally set `MONGODB_DB`; the default is `agrocalc`.
- Optionally set `GROQ_MODEL`; the default is `qwen/qwen3.8-27b`.
- Never expose either secret through a `VITE_` variable.
- Treat results as investigative guidance, not laboratory confirmation.
- For crop-protection products, prioritize IPM and local labels and regulations.

## Later phases

Authentication, cross-device history, deletion of cloud records from the UI, private image storage, saved plant profiles, timelines, progress comparison, team access, payments, retrieval-augmented knowledge, weather integration, and calibrated diagnostic models remain later phases.
