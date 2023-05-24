import express from 'express';
import {
    paginaInicio, 
    PaginaNosotros, 
    paginaViajes,
    paginaDetalleViajes, 
    paginaTestimoniales
} from '../controllers/paginasController.js';
import {
    guardarTestimonial
} from '../controllers/testimonialController.js';

const router = express.Router();

// Rutas de ejemplo
router.get('/', paginaInicio);

router.get('/nosotros', PaginaNosotros);

router.get('/viajes', paginaViajes);

// Le daremos el nombre con un comodin
router.get('/viajes/:viajeSlug', paginaDetalleViajes);

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);


export default router;