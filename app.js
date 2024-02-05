//app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
//const finalPricing = require('./calculators/PriceCalculator')
const priceRouter = require('./controllers/priceController');

const path = require('path');
const app = express();

app.use(express.json());
// Use CORS middleware
app.use(cors());

// Use an absolute path for Swagger.yaml
const swaggerPath = path.join(__dirname, 'swagger.yaml');
console.log('Resolved Swagger File Path:', swaggerPath);
const swaggerDocument = YAML.load(swaggerPath);

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




// Define a simple route for the root path
app.get('/', (req, res) => {
  //console.log(finalPricing)
  res.send('Welcome to the Food Delivery API!');
  
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


