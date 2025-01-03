const app = require('./app');
const dotenv = require('dotenv');

// To load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
