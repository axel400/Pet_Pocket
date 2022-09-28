const tiendaCTl = {}

const orm = require('../Base de datos/BaseDatos.orm')
const sql = require('../Base de datos/BaseDatos.sql')

tiendaCTl.mostrar = (req, res) => {
    res.render('tienda/agregar');
}

tiendaCTl.mandar = async (req, res) => {
    const id = req.user.idUsuario
    const { fotoTienda, categoriaTienda, descripccionTienda, tituloTienda } = req.body
    const nuevoTienda = {
        fotoTienda,
        categoriaTienda,
        descripccionTienda,
        tituloTienda,
    }
    await orm.tiendas.create(nuevoTienda)
    req.flash('success', 'Guardado con exito')
    res.redirect('/tienda/lista/' + id);
}

tiendaCTl.lista = async (req, res) => {
    const lista = await sql.query('select * from tiendas')
    res.render('tiendas/lista', { lista })
}

tiendaCTl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from tiendas where idPerdido = ?', [ids])
    res.render('/tienda/editar/', { lista })
}

tiendaCTl.actualizar = async (req, res) => {
    //const id = req.user.idUsuario
    const ids = req.params.id
    const { fotoTienda, categoriaTienda, descripccionTienda, tituloTienda } = req.body
    const nuevoProducto = {
        fotoTienda,
        categoriaTienda,
        descripccionTienda,
        tituloTienda,
    }
    await orm.perdido.findOne({ where: { idtienda: ids } })
        .then(actualizar => {
            actualizar.update(nuevoProducto)
            req.flash('success', 'Actuaizado con exito')
            res.redirect('/tienda/lista/' /*+ id*/);
        })
}

tiendaCTl.eliminar = async (req, res) => {
    const ids = req.params.id
    const id = req.user.idUsuario
    await orm.perdido.destroy({ where: { idPerdido: ids } })
        .then(() => {
            req.flash('success', 'Actuaizado con exito')
            res.redirect('/tienda/lista/' /*+ id*/);
        })
}

module.exports = tiendaCTl;