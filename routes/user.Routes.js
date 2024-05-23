const express = require('express')
const router = express.Router()
// También se puede hacer la importación directa de la siguiente forma:
// const {Router} = require('express');
// const router = Router();

const {
    userGet,
    userGetById,
    userCreate,
    userUpdate,
    userDelete
} = require ('../controllers/users.Controller');

// Route preceded by /users in index.js


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

//Call Controller functions
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
router.get('/', userGet);
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
router.get('/:id', userGetById);
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
router.post('/',userCreate);
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
router.put('/',userUpdate);
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
router.delete('/',userDelete);

module.exports = router;