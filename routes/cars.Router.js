const express = require('express')
const router = express.Router()
const authMidd = require('../middleware/authorization')

const {
    carsGet,
    carsGetbyID,
    carsCreate,
    carsUpdate,
    carsDelete
} = require ('../controllers/cars.Controller');

// Swagger Schema definition
/**
 * @swagger
 * components:
 *  schemas:
 *    car:
 *      type: object
 *      properties:
 *        marca:
 *          type: string
 *        modelo:
 *          type: string
 *        año:
 *          type: number
 *        kilometraje:
 *          type: number
 *        precio:
 *          type: number
 *        color:
 *          type: string
 *        descripción:
 *          type: string
 *        status:
 *          type: number
 *      example:
 *        marca: Volkswagen
 *        modelo: Gold
 *        año: 2020
 *        kilometraje: 50000
 *        precio: 250000
 *        color: Negro
 *        descripción: VW Golf negro 2020 como nuevo
 *        status: 1
 */

/**
 * @swagger
 * /api/cars/:
 *  get:
 *      summary: Obtener todos los autos
 *      tags: [cars]
 *      security:
 *        -  Authorization: []
 *      responses:
 *       200:
 *         description: Autos recuperados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/car'
 *       500:
 *         description: Error interno de servidor
 *       
 */
router.get('/',authMidd,carsGet);
/**
 * @swagger
 * /api/cars/id:
 *  get:
 *     summary: Obtener un auto por ID
 *     tags: [cars]
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Car unique ID
 *     security:
 *       - Authorization: []
 *     responses:
 *      200:
 *          description: Auto encontrado exitosamente
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/car'
 *      400:
 *         description: ID de auto requerido
 *      500:
 *         description: Error interno de servidor
 *       
 */
router.get('/id',authMidd,carsGetbyID);


/**
 * @swagger
 *  /api/cars/:  
 *  post:
 *      summary: Insertar un auto a catálogo
 *      tags: [cars]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/car'
 *      security:
 *          - Authorization: []
 *      responses:
 *          200:
 *              description: Auto insertado exitosamente
 *              content:
 *                  application/json:
*                       schema:
 *                          $ref: '#/components/schemas/car'
 *          400:
 *              description: Información requerida de Auto está incompleta
 *          500:
 *              description: Error interno de servidor
 */
router.post('/',authMidd,carsCreate);

/**
 * @swagger
 * /api/cars/:
 *  put:
 *      summary: Actualizar un auto del catálogo
 *      tags: [cars]
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Car unique ID
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/car'
 *      security:
 *          - Authorization: []
 *      responses:
 *          200:
 *              description: Auto actualizado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/car'
 *          400:
 *              description: Información requerida de Auto está incompleta
 *          500:
 *              description: Error interno de servidor
 */
router.put('/',authMidd,carsUpdate);



/**
 * @swagger
 * /api/cars/:
 *  delete:
 *      summary: Eliminar un auto del catálogo
 *      tags: [cars]
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Car unique ID
 *      security:
 *          - Authorization: []
 *      responses:
 *          200:
 *              description: Auto eliminado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/car'
 *          400:
 *              description: Se requiere el ID del auto a eliminar
 *          500:
 *              description: Error interno de servidor
 */
router.delete('/',authMidd,carsDelete);


module.exports = router;