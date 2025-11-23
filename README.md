# About:
This is the frontend for our Medibridge E-Commerce Solution that aims to make healthcare more accessible.

# Core Features:
- Buying and Renting Medical Equipment.
- Hiring Medical Services.
- Stripe Payment Gateway.
- Admin Dashboard for data analytics.

# Running:
- Deployed here: https://medibridge-frontend-production.up.railway.app/

# Running For Developers:
- configure .env by copying .env.template 
- npm install
- npm run dev
- Note: Make sure localhost:5173 does not have an exisiting process running.

- Note: To test backend and database operations, make sure backend server is live according to the steps written in the backend repo's instructions. 

- if server is live locally and not on railway, update .env like so:
        - VITE_API_URL="http://localhost:5020"

- Note to sir Kashif: To access the admin dashboard, these are the credentials:
    - email: admin@medibridge.com
    - password: admin123