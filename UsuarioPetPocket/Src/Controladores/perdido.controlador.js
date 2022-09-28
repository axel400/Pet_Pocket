const perdidoCtl = {}

const orm = require('../Base de datos/BaseDatos.orm')
const sql = require('../Base de datos/BaseDatos.sql')

perdidoCtl.mostrar = (req, res) => {
    res.render('perdidos/agregar');
}

perdidoCtl.mandar = async (req, res) => {
    const id = req.user.idUsuario
    const { ImagenPerdido, FechaPerdido, DescripcionPerdido, TelefonoPerdido } = req.body
    const nuevoPerdido = {
        ImagenPerdido,
        FechaPerdido,
        DescripcionPerdido,
        TelefonoPerdido,
    }
    await orm.perdido.create(nuevoPerdido)
    req.flash('success', 'Guardado con exito')
    res.redirect('/perdido/lista/' + id);
}

perdidoCtl.lista = async (req, res) => {
    const lista = await sql.query('select * from perdidos')
    res.render('perdidos/lista', { lista })
}

perdidoCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from perdidos where idPerdido = ?', [ids])
    res.render('perdidos/editar', { lista })
}

perdidoCtl.actualizar = async (req, res) => {
    //const id = req.user.idUsuario
    const ids = req.params.id
    const { ImagenPerdido, FechaPerdido, DescripcionPerdido, TelefonoPerdido } = req.body
    const nuevoPerdido = {
        ImagenPerdido,
        FechaPerdido,
        DescripcionPerdido,
        TelefonoPerdido
    }
    await orm.perdido.findOne({ where: { idPerdido: ids } })
        .then(actualizar => {
            actualizar.update(nuevoPerdido)
            req.flash('success', 'Actuaizado con exito')
            res.redirect('perdidos/lista/' /*+ id*/);
        })
}

perdidoCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    const id = req.user.idUsuario
    await orm.perdido.destroy({ where: { idPerdido: ids } })
        .then(() => {
            req.flash('success', 'Actuaizado con exito')
            res.redirect('perdidos/lista/' /*+ id*/);
        })
}

module.exports = perdidoCtl;
