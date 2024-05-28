const express = require('express')
const router = express.Router()
const authMidd = require('../middleware/authorization')

const {
    usedCarsGet,
    usedCarsGetbyID,
    usedCarsCreate,
    usedCarsUpdate,
    usedCarsDelete
} = require ('../controllers/usedCars.Controller');

router.get('/',authMidd,usedCarsGet);

router.get('/:id',authMidd,usedCarsGetbyID);

router.post('/',authMidd,usedCarsCreate);

router.put('/',authMidd,usedCarsUpdate);

router.delete('/',authMidd,usedCarsDelete);