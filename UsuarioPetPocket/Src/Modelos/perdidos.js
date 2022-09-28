const perdido = (sequelize, type) =>{
    return sequelize.define('perdido', {
        idPerdido: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ImagenPerdido: type.STRING,
        FechaPerdido: type.STRING,
        DescripcionPerdido: type.STRING,
        TelefonoPerdido: type.STRING,

        creacionPerdido:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionPerdido:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = perdido
