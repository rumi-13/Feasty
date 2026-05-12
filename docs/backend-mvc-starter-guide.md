# Backend MVC Starter Guide (Node.js + Express)

Use this order when building a new backend app with an MVC-style structure.

## 1) Define the feature first

Before coding, decide:
- What the app should do
- Which entities are needed (for example: User, Recipe, Order)
- Which API endpoints are required

## 2) Design data model first (DB + Models)

- Choose your database schema/collections
- Define relationships
- Implement model files

If models are unclear, routes/controllers become messy later.

## 3) Set up app skeleton

Create the base app wiring:
- `server.js` (startup)
- `src/app.js` (Express app + middleware + route mounting)
- `src/db/db.js` (database connection)
- `.env` configuration

## 4) Build feature-by-feature (recommended)

For each feature, implement in this order:
1. Route
2. Validation/Auth middleware
3. Controller
4. Service (business logic)
5. Model/DB operations

This keeps each API vertical slice complete and testable.

## 5) Add cross-cutting middleware

Add reusable middleware used across many routes:
- Authentication
- Input validation
- Error handling
- Logging

## 6) Test each endpoint as you build

Do not wait until the end.  
Finish one endpoint end-to-end, test it, then move to the next.

---

## Request lifecycle flow

`Client Request -> Route -> Middleware (auth/validation) -> Controller -> Service -> Model/DB -> Response`

---

## Concrete example: `POST /recipes`

- `routes/recipe.routes.js`  
  defines `POST /recipes`
- `middlewares/validateRecipe.js`  
  validates payload
- `controllers/recipe.controller.js`  
  handles request/response
- `services/recipe.service.js`  
  applies business rules
- `models/recipe.model.js`  
  persists recipe in DB
- API sends created recipe response

---

## Suggested folder layout

```text
backend/
  server.js
  src/
    app.js
    db/
      db.js
    models/
    routes/
    controllers/
    services/
    middlewares/
```

This is the same practical flow you can reuse across apps:

**requirements -> data model -> app skeleton -> feature slices -> cross-cutting middleware -> tests**
