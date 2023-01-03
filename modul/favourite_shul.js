import {Sequelize} from 'sequelize'
import db from '../configure/Database.js'

const {DataTypes} = Sequelize

const FavouriteShul = db.define('favourite_shul',{
     // this is the table name in the DB
    //  these below are the tables columns

    user_id:{
        type:DataTypes.INTEGER
    },
    shul_id:{
        type:DataTypes.INTEGER 
    },
    
},{
    freezeTableName:true
})

export default FavouriteShul

