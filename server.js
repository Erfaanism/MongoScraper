const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const config = require('./config/config.json');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || config.PORT;
const dbURL = process.env.MONGODB_URI || config.mongoURL;

// Establishing database connection
mongoose.Promise = global.Promise;
mongoose.connect(dbURL, { useMongoClient: true });

// Serve static content for the app from the 'public' directory in the application directory.
app.use(express.static('public'));

// Use body-parser dor parsing application/json.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register `hbs.engine` with the Express app.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routing rules
app.use('/', routes);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});