const registro = {};

const sql = require('../Base de datos/BaseDatos.sql')

const passport = require('passport');

registro.mostrarRegistro = async(req, res) => {
    const max = await sql.query('select max(idUsuarios) AS maximo FROM usuarios')
    console.log (max )
    res.render('login/registro', {max});
};

registro.Registro = passport.authenticate('local.signup', {
    successRedirect: '/CerrarSecion',
    failureRedirect: '/Registro',
    failureFlash: true
});

registro.mostrarLogin = (req, res, next) => {
    res.render('login/login');
};

registro.Login = passport.authenticate('local.signin', {
    successRedirect: '/mensaje_bienvenida',
    failureRedirect: '/login',
    failureFlash: true
}); 

registro.cierreSesion = (req, res, next) => {
    req.logOut();
    res.redirect('/login');
};

module.exports = registro;