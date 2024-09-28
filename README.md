# ng-training-Assignment-1
To_Do_List Application


# Quick Setup: React App with JSON Server

1. Install JSON Server globally: `npm install -g json-server`.
2. Create a `db.json` file in your project directory.
3. Add mock data to `db.json`, e.g., tasks structure.
4. Navigate to the directory with `db.json` in the terminal.
5. Start JSON Server: `json-server --watch db.json --port 3001`.
6. Your API will be accessible at `http://localhost:3001/tasks`.
7. Open another terminal and navigate to your React app directory.
8. Start your React application with `npm start` or `yarn start`.
9. Your React app will typically run at `http://localhost:3000`.
10. Test the API by visiting `http://localhost:3001/tasks` in your browser.
11. Modify `db.json` to simulate different scenarios as needed.
12. Ensure React app makes API calls to the JSON server.
13. Keep JSON Server running while developing your React app.
14. You can stop the servers with `Ctrl + C` in each terminal.
15. Enjoy developing with real-time mock data!
