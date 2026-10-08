# Chat API (JSON / JSend)

Basic JSON API for a future live chat. Data is faked with a static in-memory array.
All responses follow the [JSend](https://github.com/omniti-labs/jsend) standard.

## Routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/messages` | all messages → `data.messages[]` |
| GET | `/api/v1/messages?user=pikachu` | messages from one user → `data.messages[]` |
| GET | `/api/v1/messages/:id` | one message → `data.message` (unknown id → fake message) |
| POST | `/api/v1/messages` | body `{ "message": { "user": "Pikachu", "text": "..." } }` → `data.message` |
| PUT | `/api/v1/messages/:id` | body `{ "message": { "text": "..." } }` → `data.message` |
| DELETE | `/api/v1/messages/:id` | removes the message → `data.message._id` |

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000/api/v1/messages
```

Deployed on Vercel (`api/index.js` + `vercel.json`).
