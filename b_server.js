const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const path = require('path');

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Helper function to read JSON data
const readJsonData = (fileName) => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, fileName)));
};

// POST endpoint to start simulation
app.post('/api/start-simulation', (req, res) => {
    const data = req.body;
    fs.writeFile(path.join(__dirname, 'simulationData.json'), JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error saving data');
        }
        res.send('Data saved successfully');
    });
});


// Simulation Status endpoint
app.get('/api/simulation-status', (req, res) => {
    res.json(readJsonData('./simulation_status.json'));
});

// Live Simulation endpoint
app.get('/api/live-simulation', (req, res) => {
    res.json(readJsonData('./live_simulation.json'));
});

// User Demographics endpoint
app.get('/api/user-demographics', (req, res) => {
    res.json(readJsonData('./user_demographics.json'));
});

app.get('/api/final-vaccine-hesitancy', (req, res) => {
    res.json(readJsonData('./final_vaccine_hesitancy.json'));
});

// Interpretable Results endpoint
app.get('/api/interpretable-results', (req, res) => {
    res.json(readJsonData('./interpretable_results.json'));
});

// Swing Agents endpoint
app.get('/api/swing-agents', (req, res) => {
    res.json(readJsonData('./swing_agents.json'));
});

// Agent Level API endpoint
app.get('/api/agent-level', (req, res) => {
    // Here you can add code to get a specific agent's data based on a query parameter, e.g., req.query.agentId
    res.json(readJsonData('./agent_level_api.json'));
});

// Impactful Policy Rollouts endpoint
app.get('/api/impactful-policy-rollouts', (req, res) => {
    res.json(readJsonData('./impactful_policy_rollouts.json'));
});
// Server listening on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
