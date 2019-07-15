const Url = require('../models/Url');

exports.home = (req, res) => {
    res.render('index');
}

exports.agregarUrl = async (req, res, next) => {

    let respuesta;
    const url = new Url({ urlOriginal : req.body.urlOriginal });

    try {
        let resultado = await url.save();
        respuesta = {
            codigo: 201,
            mensaje : 'Almacenado Correctamente',
            url : resultado.urlCorta
        }
    } catch (error) {
        console.log(error);
        respuesta = {
            codigo: 400,
            error: 'Hubo un error'
        }
    }
    res.json(respuesta);
    next();
}

// Cuando el usuario visita la URL corta
exports.redireccionarUrl = async (req, res, next) => {
    const url = await Url.findOne({ urlCorta : req.params.url });

    if(!url) {
        res.redirect('/?error=404');
        next();
    }
    res.redirect(url.urlOriginal);
    next();
}