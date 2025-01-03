const app = require('./app');
const config = require('../config');

const port = config.port;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
