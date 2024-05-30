const express = require("express");
const router = express.Router();
const authMidd = require("../middleware/authorization");

const {
  GetCart,
  GetActiveCarts,
  AddToCart,
  CheckoutCart,
  CancelCart,
} = require("../controllers/shoppingCarts.Controller");

// Swagger Schema definition
/**
 * @swagger
 * components:
 *  schemas:
 *    cart:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        carId:
 *          type: string
 *      example:
 *        userId: UID
 *        carId: UID
 */

/**
 * @swagger
 *  /api/cart/:
 *  get:
 *      summary: Obtener un carrito de compras
 *      tags: [cart]
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Cart Id
 *      security:
 *          - Authorization: []
 *      responses:
 *          200:
 *              description: Carrito de compras encontrado
 *          400:
 *              description: Id de carrito requerido
 *          409:
 *              description: Carrito no encontrado en catálogo o no disponible
 *          500:
 *              description: Error interno de servidor
 */
router.get("/", authMidd, GetCart);

/**
 * @swagger
 *  /api/cart/userId:
 *  get:
 *      summary: Obtener todos los carritos activos de un usuario
 *      tags: [cart]
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: User Id
 *      security:
 *          - Authorization: []
 *      responses:
 *          200:
 *              description: Carritos de compras encontrados
 *          400:
 *              description: Id de carrito requerido
 *          409:
 *              description: Carrito no encontrado en catálogo o no disponible
 *          500:
 *              description: Error interno de servidor
 */
router.get("/userId", authMidd, GetActiveCarts);

/**
 * @swagger
 *  /api/cart/:
 *  post:
 *      summary: Alta de nuevo producto en carrito
 *      tags: [cart]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/cart'
 *      security:
 *          - Authorization: []
 *      responses:
 *          200:
 *              description: Auto insertado en carrito correctamente
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/cart'
 *          400:
 *              description: Id de usuario y ID de Auto requerido
 *          409:
 *              description: Auto no encontrado en catálogo o no disponible
 *          500:
 *              description: Error interno de servidor
 */
router.post("/", authMidd, AddToCart);

/**
 * @swagger
 *  /api/cart/:
 *  put:
 *      summary: Completar compra de carrito
 *      tags: [cart]
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Cart Id
 *      security:
 *          - Authorization: []
 *      responses:
 *          200:
 *              description: Producto comprado exitosamente
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/cart'
 *          400:
 *              description: Id de carrito requerido
 *          409:
 *              description: Carrito o Auto no encontrado o Auto no disponible
 *          500:
 *              description: Error interno de servidor
 */
router.put("/", authMidd, CheckoutCart);

/**
 * @swagger
 *  /api/cart/:
 *  delete:
 *      summary: Cancelar compra de auto
 *      tags: [cart]
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Cart Id
 *      security:
 *          - Authorization: []
 *      responses:
 *          200:
 *              description: Carrito cancelado exitosamente
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/cart'
 *          400:
 *              description: Id de carrito requerido
 *          409:
 *              description: Carrito o Auto no encontrado o Auto no disponible
 *          500:
 *              description: Error interno de servidor
 */
router.delete("/", authMidd, CancelCart);

module.exports = router;
