# PlantDoctor AI architecture

## Current flow

```text
React chat UI
  -> compresses up to 3 plant images
  -> sends message, recent context, conversation ID, and anonymous client ID
  -> POST /api/plant-doctor
Netlify function
  -> validates payload and consumes a MongoDB-backed daily quota
  -> Groq Chat Completions vision model
  -> JSON-mode response and local schema validation
  -> stores sanitized text and diagnosis in MongoDB
React UI
  -> renders the structured DiagnosisCard
  -> keeps a local guest-history cache
```

The serverless function is the security boundary. `GROQ_API_KEY`, `MONGODB_URI`, and the diagnostic system prompt remain server-side. Uploaded images are forwarded to Groq for the current request and are never written to MongoDB or browser history.

## MongoDB collections

- `plant_doctor_conversations`: one document per `clientId + conversationId`, capped to the latest 40 text messages, with the latest structured diagnosis.
- `plant_doctor_usage`: one counter per anonymous client and UTC day. A TTL index removes expired counters.
- A unique compound index prevents duplicate conversation documents.

The module reuses one `MongoClient` connection across warm serverless invocations. If MongoDB is temporarily unavailable, diagnosis can still run with a best-effort in-memory limit, and the persistence error is logged.

## Groq boundary

The UI depends only on the internal diagnosis contract. The server sends OpenAI-compatible chat messages to Groq and requests JSON mode. Because JSON mode does not guarantee the full schema, the function parses and validates every response before returning it. The model name is an environment variable so it can be replaced when Groq changes its preview vision catalog.

## Privacy and identity

A random browser ID identifies guest records. It is not an account or a strong authentication credential. Photos are not persisted. Add user authentication and authorization before exposing cloud history retrieval, cross-device syncing, teams, or private agronomic records.
