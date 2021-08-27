const db=require('./db')
const Usuario= db.sequelize.define('usuarios',{
    nome:{
        type:db.Sequelize.STRING
    },
    cpf:{
        type:db.Sequelize.INTEGER
    }
})

module.exports=Usuario