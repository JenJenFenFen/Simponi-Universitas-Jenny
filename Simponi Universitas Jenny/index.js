const app = require('./action');
const port = 3000;

app.set('views', './html');
app.set('view engine', 'ejs');

// membaca port
app.listen(port, () => {
    console.log(`Listening port ${port}`);
});