# TODO - GovAssist-AI Landing Page Upgrade

## Status

- Landing page (Navbar + Hero + Features + Footer)
  - ✅ Implemented professional landing page in `frontend/src/App.jsx`
  - ✅ Created: `frontend/src/components/Features.jsx`
  - ✅ Axios already configured: `frontend/src/services/api.js` using `VITE_API_URL`

## Additional Task (from feedback)

Enhance recommendation results with AI explanation + document checklist

- Backend
  - ⛔ Pending: Extend `/recommend` response schema with:
    - application_steps
    - official_website (fallback: "Visit the official state portal")
    - last_date (fallback: "Visit the official state portal")
    - eligibility_status (default "Eligible")
    - ai_explanation (short personalized explanation)

- Frontend
  - ⛔ Pending: Update `frontend/src/components/SchemeCard.jsx` to render:
    - ✓ Scheme Name
    - ✓ Description
    - ✓ AI Explanation
    - ✓ Benefits
    - ✓ Eligibility
    - ✓ Eligibility Status
    - ✓ Required Documents with check icons
    - ✓ Application Steps numbered
    - ✓ Official Website clickable
    - ✓ Last Date

## Verification

- ⛔ Pending:
  - Run backend
  - Run frontend
  - Confirm recommendation page renders correctly
