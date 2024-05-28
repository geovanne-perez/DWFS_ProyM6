// Invocar express
const express = require('express')

// Llamar dotenv (requiere NPM install) para obtener variables de entorno
require('dotenv').config()

const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb'); 

// Obtener Puerto desde environment
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
    components: {
            securitySchemes: {
                Authorization: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    value: "Bearer <JWT token here>"
                }
            }
        },
        servers: [
            {
                url: serverUrl,
            },
        ],
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

/*app.get('/',(req,res) => {
    res.send(`Web server iniciado en http://localhost:${port}/`);
});
*/
app.use(cors());

// Declaración para decirle a Express que se utilizará formato JSON en el body de los requests.
app.use(express.json());


// Llamada de Ruta como app.use sencillo
    //app.use('/api/users', require('./routes/user.Routes.js'))

// También se puede usar como IIFE
    // IIFE = Immediately Invoked Function Expression

const userRouter = require('./routes/user.Router.js');
const carsRouter = require('./routes/cars.Router.js');
const {dbConnection} = require('./database/config.js');

(async ()=> {
    await dbConnection();
    app.use('/api/users',userRouter);
    app.use('/api/cars',carsRouter);
})();

// Use Swagger
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.listen(port, () => {console.log(`Web server iniciado en http://localhost:${port}/`);});