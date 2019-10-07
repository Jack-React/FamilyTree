// Import Modules
const express = require('express');
const apiRoutes = require('./api-routes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
   extended: true
}));

// test express where the static files are kept
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json());
app.use ('/api', apiRoutes)


// Database setup
require('./models/db.js');


app.get('/', (_req, res) => {
	res.status(200).send({
        success: "Welcome to the root directory"
    });
});

// Listen at port
var PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
