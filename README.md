Full Stack web-app for Materials

Instructions:
1. Create a .env file in the backend folder and add the following variables:
```
// Change the variables that starts with "your" to your own values

DB_USER="yourusername"
DB_HOST="localhost"
DB_NAME="login_db"
DB_PASSWORD="yourpassword"
DB_PORT="yourportnumber"

DB_MATERIAL_USER="yourusername"
DB_MATERIAL_HOST="localhost"
DB_MATERIAL_NAME="material_db"
DB_MATERIAL_PASSWORD="yourpassword"
DB_MATERIAL_PORT="yourportnumber"
```

2. Change the working directory to backend and then execute npm start / npm run start command in the terminal.

3. Add a new terminal and then change the working directory to frontend. Then, execute npm start / npm run start command in the terminal.

4. Go to http://localhost:3000 to see the webpage. 

Notes: 
- Signup and Login page is working, but the token is not being used yet. The token will be used to authenticate the user and to access the material page.
- The material page has not yet been integrated with the backend. The material page is currently using a mock data.
- Home page is subject to change for better design.