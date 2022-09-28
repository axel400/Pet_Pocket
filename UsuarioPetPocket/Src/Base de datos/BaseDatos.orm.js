const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

const dbName = process.env.DB_SCHEMAS || "PetPocket";

mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    user     : process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD || "",
}).then( connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
        console.info("Base de datos creada o comprobada correctamente");
    })
})

const usuarioModelo = require('../Modelos/usuario')
const proyectoModelo = require('../Modelos/proyecto')

//campaña//
const campañasModelo = require('../Modelos/campaña')
const perdidoModelo = require('../Modelos/perdidos')




const sequelize = new Sequelize(
  'PetPocket',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  }
)

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })

sequelize.sync({ force: false })
  .then(() => {
    console.log("Tablas sincronizadas")
  })

  const usuario = usuarioModelo(sequelize, Sequelize)
  const proyecto = proyectoModelo(sequelize, Sequelize)

//campaña//
  const campañas = campañasModelo(sequelize, Sequelize)
  const perdido = perdidoModelo(sequelize, Sequelize)

  

  usuario.hasMany(proyecto)
  proyecto.belongsTo(usuario)

  campañas.hasMany(proyecto)
  proyecto.belongsTo(campañas)
  perdido.belongsTo(perdido)

module.exports = {
    usuario,
    proyecto,
    campañas,
    perdido
}
