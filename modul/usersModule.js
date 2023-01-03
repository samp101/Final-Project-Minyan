import {Sequelize} from 'sequelize'
import db from '../configure/Database.js'

const {DataTypes} = Sequelize

const Users = db.define('users',{
     // this is the table name in the DB
    //  these below are the tables columns
    // id:{
    //     type:DataTypes.INTEGER,
    //     primaryKey:true 
    // },
    shul_id:{
        type:DataTypes.INTEGER 
    },
    user_name:{
        type:DataTypes.STRING 
    },
    user_lastname:{
        type:DataTypes.STRING,
    },
    user_address:{
        type:DataTypes.STRING
    },
    user_city:{
        type:DataTypes.STRING 
    },
    user_country:{
        type:DataTypes.STRING,
    },
    user_zip_code:{
        type:DataTypes.STRING
    },
    user_phone_number:{
        type:DataTypes.STRING 
    },
    user_email:{
        type:DataTypes.STRING,
    },
    user_password:{
        type:DataTypes.STRING,
    },
},{
    freezeTableName:true
})

export default Users
