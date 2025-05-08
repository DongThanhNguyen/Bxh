const express = require('express');
const app = express();
const matchRoutes = require('./routes/matchRoutes');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', matchRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
