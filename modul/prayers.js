import {Sequelize} from 'sequelize'
import db from '../configure/Database.js'

const {DataTypes} = Sequelize

const Prayers = db.define('prayers',{
     // this is the table name in the DB
    //  these below are the tables columns

    shul_id:{
        type:DataTypes.INTEGER,
    },
    times:{
        type:DataTypes.TIME
    },
    prayer_name:{
        type:DataTypes.STRING 
    },
    
},{
    freezeTableName:true
})

export default Prayers

