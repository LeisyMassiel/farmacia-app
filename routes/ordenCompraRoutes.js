const express = require('express');
const { OrdenCompra, Laboratorio } = require('../models');

const router = express.Router();

// Listar órdenes
router.get('/', async (req, res) => {
  try {
    const ordenes = await OrdenCompra.findAll({
      include: [
        {
          model: Laboratorio
        }
      ],
      order: [['NroOrdenC', 'ASC']]
    });

    res.render('ordenCompras', { ordenes });
  } catch (error) {
    res.status(500).send('Error al listar órdenes: ' + error.message);
  }
});

// Formulario nueva orden
router.get('/nuevo', async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll({
      order: [['razonSocial', 'ASC']]
    });

    res.render('crearOrdenCompra', { laboratorios });
  } catch (error) {
    res.status(500).send('Error al cargar formulario: ' + error.message);
  }
});

// Guardar orden
router.post('/nuevo', async (req, res) => {
  try {
    await OrdenCompra.create(req.body);

    res.redirect('/ordenes');
  } catch (error) {
    res.status(500).send('Error al registrar orden: ' + error.message);
  }
});

// Formulario editar
router.get('/editar/:id', async (req, res) => {
  try {
    const orden = await OrdenCompra.findByPk(req.params.id);
    const laboratorios = await Laboratorio.findAll({
      order: [['razonSocial', 'ASC']]
    });

    if (!orden) {
      return res.status(404).send('Orden no encontrada');
    }

    res.render('editarOrdenCompra', {
      orden,
      laboratorios
    });
  } catch (error) {
    res.status(500).send('Error al buscar orden: ' + error.message);
  }
});

// Actualizar
router.post('/editar/:id', async (req, res) => {
  try {
    const orden = await OrdenCompra.findByPk(req.params.id);

    if (!orden) {
      return res.status(404).send('Orden no encontrada');
    }

    await orden.update(req.body);

    res.redirect('/ordenes');
  } catch (error) {
    res.status(500).send('Error al actualizar: ' + error.message);
  }
});

// Eliminar
router.post('/eliminar/:id', async (req, res) => {
  try {
    const orden = await OrdenCompra.findByPk(req.params.id);

    if (!orden) {
      return res.status(404).send('Orden no encontrada');
    }

    await orden.destroy();

    res.redirect('/ordenes');
  } catch (error) {
    res.status(500).send('Error al eliminar: ' + error.message);
  }
});

module.exports = router;