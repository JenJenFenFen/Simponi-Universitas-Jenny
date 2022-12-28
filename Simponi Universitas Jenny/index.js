const app = require('./action');
const port = 3000;

// membaca port
app.listen(port, () => {
    console.log(`Listening port ${port}`);
});