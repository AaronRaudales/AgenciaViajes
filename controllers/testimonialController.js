import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async(req, res) => {
   // Validar
   const { nombre, correo, mensaje} = req.body;

   const errores = [];

   if(nombre.trim() === ''){
        errores.push({mensaje: 'El nombre esta vacio '});
    }

    if(correo.trim() === ''){
        errores.push({mensaje: 'El correo esta vacio '});
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El mensaje esta vacio '});
    }

    if(errores.length > 0) {
        // Consultar Testimoniales Existentes
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {// El nombre de la vista
            pagina: 'Testimoniales',
            errores,
            nombre, // lo enviamos y lo almacena en el valor de "value" del formulario
            correo, // lo enviamos y lo almacena en el valor de "value" del formulario
            mensaje,// lo enviamos y lo almacena en el valor de "value" del formulario
            testimoniales
        }); 
    } else {
        // Almacenarlo en la base de datos
        try {
            await Testimonial.create( {
                nombre, 
                correo,
                mensaje
            });

            //Luego redireccionamos
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
}