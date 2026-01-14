const express = require("express");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
const kaffeehaeuserRoutes = require("./routes/kaffeehaeuser");
const analyticsRoutes = require("./routes/analytics");

app.use('/api/kaffeehaeuser', kaffeehaeuserRoutes);
app.use('/api/analytics', analyticsRoutes);

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});