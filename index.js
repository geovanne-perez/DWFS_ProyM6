const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb'); 

require('dotenv').config()
const port = process.env.PORT 
console.log(process.env)
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}`

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node API for Project Management using Mongo',
            version: '1.0.0',
        },
        servers: [
            {
                url: serverUrl,
            },
        ],
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

const app = express();

app.get('/',(req,res) => {
    res.send(`Web server iniciado en http://localhost:${port}/`);
});

app.use(cors());
app.use(express.json());

// Llamada de Ruta como app.use sencillo
app.use('/api/users', require('./routes/user.Routes.js'))

// También se puede usar como IIFE
// IIFE = Immediately Invoked Function Expression
/*
const userRoutes =  require('./routes/user.Routes.js')
(()=>{
app.use(userRoutes)
})();
*/
// Use Swagger
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.listen(port, () => {console.log(`Web server iniciado en http://localhost:${port}/`);});