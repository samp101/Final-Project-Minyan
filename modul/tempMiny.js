import { Sequelize } from "sequelize";

import db from "../configure/Database.js";


const {DataTypes} = Sequelize

const Min = db.define('minyan',{
    shul_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },
    shachris:{
        type:DataTypes.JSON,
    },
    mincha:{
        type:DataTypes.JSON,
    },
    maariv:{
        type:DataTypes.JSON,
    },
},{
    freezeTableName:true
})

Min.removeAttribute('id')


export default Min