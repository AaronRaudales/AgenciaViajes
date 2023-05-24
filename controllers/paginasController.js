import { Viajes } from '../models/Viajes.js';
import { Testimonial } from '../models/Testimoniales.js';

// Pagina Inicio
const paginaInicio = async(req, res)=>{ // req - lo que enviamos, res - lo que express nos responde

    try {
         // Creamos un promise para que ambas consultas se ejecuten al mismo tiempo
        const [viajes, testimoniales] = await Promise.all([
        Viajes.findAll({ limit: 3 }), // Consultar 3 viajes del modelo viajes para la pagina de inicio
        Testimonial.findAll({ limit: 3 }) // Consultar 3 testimoniales del modelo viajes para la pagina de inicio
        ])

        res.render('inicio', {  // El nombre de la vista
            pagina: 'Inicio', 
            clase: 'home',
            viajes ,
            testimoniales
        });
        
    } catch (error) {
        console.log(error);
    }
 
}

 // Pagina Nosotros 
const PaginaNosotros = (req, res)=>{ // url
    res.render('nosotros', {// El nombre de la vista
        pagina: 'Nosotros'
    }); 
}

// Pagina viaje y detalle 
const paginaViajes = async (req, res)=>{ //url
    // Consultar BD, importar el modelo
  try {
    const viajes = await Viajes.findAll();
    
    res.render('viaje', {// El nombre de la vista
        pagina: 'Próximos Viajes',
        viajes
    }); 
  } catch (error) {
    console.log(error);
  }
}
// Muestra el viaje por su slug
const paginaDetalleViajes = async (req, res)=>{ //url

    //
    const { viajeSlug } = req.params;

    try {
        const viaje = await Viajes.findOne({ where: {slug: viajeSlug}});
        res.render('detalleViaje', {// El nombre de la vista
            pagina: 'Información Viaje',
            viaje
        }); 
    } catch (error) {
        console.log(error);
    }
}

// Pagina Testimoniales 
const paginaTestimoniales = async(req, res)=>{ 
    // Consultar BD, importar el modelo
   try {
     const testimoniales = await Testimonial.findAll(); // El findAll nos va a retornar un arreglo

    res.render('testimoniales', {// El nombre de la vista
        pagina: 'Testimoniales',
        testimoniales,
    }); 
   } catch (error) {
    console.log(error);
   }

}

export {
    paginaInicio,
    PaginaNosotros,
    paginaViajes,
    paginaDetalleViajes,
    paginaTestimoniales
}