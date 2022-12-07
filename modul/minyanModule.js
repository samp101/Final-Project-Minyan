import { Sequelize } from "sequelize";

import db from "../configure/Database.js";


const {DataTypes} = Sequelize

const Minyan = db.define('minyans',{
    shul_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        // references: {
        //     model: 'Shul',
        //     key: 'shul_id'
        //     // deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE,
        //   }
    },
    shachris:{
        type:DataTypes.TIME,
    },
    mincha:{
        type:DataTypes.TIME,
    },
    maariv:{
        type:DataTypes.TIME,
    },
},{
    freezeTableName:true
})

Minyan.removeAttribute('id')


export default Minyan