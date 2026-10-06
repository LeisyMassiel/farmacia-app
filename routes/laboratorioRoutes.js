const express = require('express');
const { Laboratorio } = require('../models');
const router = express.Router();

// Listar laboratorios
router.get('/', async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll({ order: [['CodLab', 'ASC']] });
    res.render('laboratorios', { laboratorios });
  } catch (error) {
    res.status(500).send('Error al listar laboratorios');
  }
});

// Formulario nuevo
router.get('/nuevo', (req, res) => {
  res.render('crearLaboratorio');
});

// Guardar laboratorio
router.post('/nuevo', async (req, res) => {
  try {
    await Laboratorio.create(req.body);
    res.redirect('/laboratorios');
  } catch (error) {
    res.status(500).send('Error al registrar: ' + error.message);
  }
});

// Formulario editar
router.get('/editar/:id', async (req, res) => {
  try {
    const laboratorio = await Laboratorio.findByPk(req.params.id);
    if (!laboratorio) return res.status(404).send('Laboratorio no encontrado');
    res.render('editarLaboratorio', { laboratorio });
  } catch (error) {
    res.status(500).send('Error al buscar laboratorio');
  }
});

// Actualizar
router.post('/editar/:id', async (req, res) => {
  try {
    const laboratorio = await Laboratorio.findByPk(req.params.id);
    if (!laboratorio) return res.status(404).send('Laboratorio no encontrado');
    await laboratorio.update(req.body);
    res.redirect('/laboratorios');
  } catch (error) {
    res.status(500).send('Error al actualizar: ' + error.message);
  }
});

// Eliminar
router.post('/eliminar/:id', async (req, res) => {
  try {
    const laboratorio = await Laboratorio.findByPk(req.params.id);
    if (!laboratorio) return res.status(404).send('Laboratorio no encontrado');
    await laboratorio.destroy();
    res.redirect('/laboratorios');
  } catch (error) {
    res.status(500).send('Error al eliminar: ' + error.message);
  }
});

module.exports = router;