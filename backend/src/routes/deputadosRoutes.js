const express = require('express');

const {
    buscarDeputados,
    buscarDeputadosPorId
} = require('../controllers/deputadosController');

const router = express.Router();

router.get('/', buscarDeputados);

router.get('/:id', buscarDeputadosPorId);

module.exports = router;