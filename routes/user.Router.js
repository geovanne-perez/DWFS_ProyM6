const express = require('express')
const router = express.Router()
const authMidd = require('../middleware/authorization')

const {
    userGet,
    userGetById,
    userCreate,
    userUpdate,
    userDelete,
    login
} = require ('../controllers/users.Controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        Username:
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
 *        Username: Username1
 *        password: "password123"
 *        name: "Mike"
 *        lastname: "Nieva"
 *        email: "mike@email.com"
 *        controlNo: 12345
 *        enabled: true
 *    login:
 *      type: object
 *      properties:
 *        Username:
 *          type: string
 *        password:
 *          type: string
 *      example:
 *        Username: Username1
 *        Password: "password123"
 *    session:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *      example:
 *        token: #####
 */

//Call Controller functions
/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
*     security:
*       - Authorization: []
 *     responses:
 *       200:
 *         description: Usuarios recuperados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/users/',authMidd, userGet);

/**
 * @swagger
 * /api/users/:id:
 *   get:
 *     summary: Obtener un solo usuario
 *     tags: [Users]
*     security:
*       - Authorization: []
 *     responses:
 *       200:
 *         description: Usuario recuperado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/users/:id',authMidd, userGetById);
/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
*     security:
*       - Authorization: []
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
router.post('/users/',authMidd,userCreate);
/**
 * @swagger
 * /api/users/:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Users]
*     security:
*       - Authorization: []
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
router.put('/users/',authMidd,userUpdate);
/**
 * @swagger
 * /api/users/:
 *   delete:
 *     summary: Eliminar un usuario existente
 *     tags: [Users]
*     security:
*       - Authorization: []
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
router.delete('/users/',authMidd,userDelete);
/**
 * @swagger
 * /api/login:
 *  post:
 *     summary: Inicio de Sesión
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: Inicio de Sesión exitoso
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/session'
 */
router.post('/login',login);

module.exports = router;