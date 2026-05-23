Deployment checklist for Render

This project uses Firebase (client + admin) and a separated frontend and backend. Below are the exact environment variables and quick steps to get the deployed app working in Render.

Frontend (feasty-1.onrender.com)
- These Vite variables must be set in the Render "Environment" for the frontend service and then you must trigger a redeploy (build):
  - VITE_FIREBASE_API_KEY = <your-firebase apiKey>
  - VITE_FIREBASE_PROJECT_ID = <your-firebase projectId>
  - VITE_FIREBASE_AUTH_DOMAIN = <your-firebase authDomain> (e.g. PROJECT.firebaseapp.com)
  - VITE_FIREBASE_APP_ID = <your-firebase appId>
  - VITE_API_URL = https://feasty-z82k.onrender.com

Note: Vite reads `VITE_` variables at build time — adding/updating them requires a new frontend build.

Backend (feasty-z82k.onrender.com)
- Runtime environment variables to set in the Render service for the backend:
  - FRONTEND_URL = https://feasty-1.onrender.com
  - FIREBASE_PROJECT_ID = <projectId>
  - FIREBASE_CLIENT_EMAIL = <service account client email>
  - FIREBASE_PRIVATE_KEY = <private key single-line with \n for newlines>
    - Example format (literal string in Render env):
      -----BEGIN PRIVATE KEY-----\nMIIE...\n...rest of key...\n-----END PRIVATE KEY-----\n
  - MONGODB_URI = <your mongodb connection string>
  - JWT_SECRET = <your jwt secret>
  - NODE_ENV = production

Security and Firebase
- In Firebase Console → Authentication → Settings → Authorized domains, add:
  - feasty-1.onrender.com

Verification steps
1. Set backend env vars in Render and restart the backend service.
2. Set frontend Vite vars in Render and trigger a redeploy of the frontend service.
3. Open https://feasty-1.onrender.com and attempt Google sign-in.
4. If issues occur: check browser console for Firebase auth errors and Render backend logs for server-side errors (service account, verifyIdToken errors).

Notes
- Local development is unaffected because the code falls back to localhost URLs when env vars are not set or when running in non-production mode.
- If you'd like, I can prepare a copy/paste list of the exact values from your local `.env` (if present) to paste into Render.
