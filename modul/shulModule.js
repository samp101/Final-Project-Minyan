import {Sequelize} from 'sequelize'
import db from '../configure/Database.js'

const {DataTypes} = Sequelize

const Shul = db.define('shul',{
     // this is the table name in the DB
    //  these below are the tables columns

    shul_id:{
        type:DataTypes.INTEGER ,
        autoIncrement:true,
        primaryKey:true
    },
    shul_name:{
        type:DataTypes.STRING,
    },
    shul_rav:{
        type:DataTypes.STRING
    },
    shul_address:{
        type:DataTypes.STRING 
    },
    shul_city_city:{
        type:DataTypes.STRING,
    },
    shul_country:{
        type:DataTypes.STRING
    },
    shul_zip_code:{
        type:DataTypes.STRING 
    },
    shul_website:{
        type:DataTypes.STRING,
    },
    shul_phone_number:{
        type:DataTypes.INTEGER,
    },
},{
    freezeTableName:true
})
Shul.removeAttribute('id')

export default Shul

