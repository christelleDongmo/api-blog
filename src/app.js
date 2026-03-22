const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();
require('./config/db');

const app = express();

app.use(express.json());

const articleRoutes = require('./routes/articleRoutes');
app.use('/api/articles', articleRoutes);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Blog Articles',
      version: '1.0.0',
      description: 'API pour gérer un blog simple avec MySQL'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Serveur local'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.send('API OK');
});

app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
  console.log(`Swagger prêt sur http://localhost:${process.env.PORT}/api-docs`);
});