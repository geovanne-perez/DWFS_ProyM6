const express = require('express')
const router = express.Router()

const {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    delUser
} = require ('../controllers/usersController');

// Route preceded by /users in index.js

// Sample routes for testing
/*
router.get('/', (req,res) => {res.send('Function to get all users');});

router.get('/:id', (req,res) => {res.send('Function to get a single user');});

router.post('/',(req,res) => {res.send('Function to create users');});

router.put('/',(req,res) => {res.send('Function to update users');});

router.delete('/',(req,res) => {res.send('Function to delete users permanently');});
*/

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        user:
 *          type: string
 *        password:
 *          type: string
 *        name:
 *          type: string
 *        lastname:
 *          type: string
 *        email:
 *          type: string
 *        controlNo:
 *          type: number
 *        enabled:
 *          type: boolean
 *      example:
 *        user: Username1
 *        password: "password123"
 *        name: "Mike"
 *        lastname: "Nieva"
 *        email: "mike@email.com"
 *        controlNo: 12345
 *        enabled: true
 */

//Users Controller functions

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuarios recuperados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/', getUsers);+

/**
 * @swagger
 * /api/users/:id:
 *   get:
 *     summary: Obtener un solo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario recuperado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/:id', getUserById);
/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: El usuario se creó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/',addUser);
/**
 * @swagger
 * /api/users/:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: El usuario se actualizó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.put('/',updateUser);
/**
 * @swagger
 * /api/users/:
 *   delete:
 *     summary: Eliminar un usuario existente
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: El usuario se actualizó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.delete('/',delUser);

module.exports = router;