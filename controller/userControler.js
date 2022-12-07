import Users from '../modul/usersModule.js';
import Shul from '../modul/shulModule.js';
import Minyan from '../modul/minyanModule.js';
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
import Min from '../modul/tempMiny.js'
import Prayers from '../modul/prayers.js'



// Shul.hasOne(Minyan,{ foreignKey: "shul_id",})
// Minyan.belongsTo(Shul,{foreignKey: "shul_id",})

// Shul.hasOne(Min,{ foreignKey: "shul_id",})
// Min.belongsTo(Shul,{foreignKey: "shul_id"})


Shul.hasOne(Prayers,{ foreignKey: "shul_id",})
Prayers.belongsTo(Shul,{foreignKey: "shul_id"})

Shul.hasMany(Users,{foreignKey: "shul_id"})
Users.belongsTo(Shul,{foreignKey: "shul_id"})



export const register = async(req,res) =>{
    console.log('hello')
    const {user_id, shul_id, user_name, user_lastname, user_address, user_city, user_country, user_zip_code, user_phone_number, user_email, user_password} = req.body.user;
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(user_password,salt) // this is how we encrypt our information
    console.log(user_email);
    try {
        await Users.create({ //this is how we are SENDING the information into the DB 
        shul_id:shul_id,
        user_name:user_name,
        user_lastname:user_lastname,
        user_address:user_address,
        user_city:user_city,
        user_country:user_country,
        user_zip_code:user_zip_code,
        user_phone_number:user_phone_number,
        user_email:user_email,
        user_password:hashPassword
        })
        res.json({msg:'Register succesful'})
    } catch (error) {
        console.log(error)
        console.log()
        res.status(404).json({msg:'Email already exists'})
    }
}
export const login = async(req,res)=>{
    const {user_email,user_password} = req.body.user;
    console.log(user_email,user_password);
    try {
        const userFromDb = await Users.findAll({
            where:{
                user_email:user_email
            }
        })
        const match = await bcrypt.compare(user_password,userFromDb[0].user_password)
        
        const e = new Error("There is an error with either your email or password");
        if (!match) throw e;

        const user = userFromDb[0] 

        const accessToken = jwt.sign({user},process.env.SECRET_KEY,{expiresIn:'600s'})

        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            maxAge: 600 * 1000
        })
        res.json({token: accessToken})
        // res.json({msg:`welcome ${user[0].user_name}${user3.user_city}`})

    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'There is an error with either your email or password'})
        
    }


}

export const logout = (req,res)=>{
    console.log(req.cookies);
    console.log('access  ',req.cookies.accessToken);
    const accessToken = req.cookies.accessToken;
    if(!accessToken) return res.json({msg:'Your already logged out'})
    res.clearCookie('accessToken')

    console.log('from cookies ',req.cookies.accessToken);
    res.json({msg:'You have been succesfully logged out'})
}

export const userInfo = async (req,res)=>{

    try{
        const shul = await Users.findAll({
                where:{
                    id:req.params.id
                },
            include: [{ model: Shul, include: [Minyan] }]
        })
        res.json(shul)
} catch (error) {
    console.log(error);
    res.status(404).json({msg:'There is an error with the database'})      
}

}
export const shulList = async(req,res)=>{
    try {
        const shul = await Shul.findAll({
            where:{
            shul_city_city:req.params.cityName
        }})
        res.json(shul)
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'There is an error with the database'})      
    }
}
export const shulCityTimes = async(req,res)=>{

    const {userCitySearch} = req.params.search

    try {
        
        const shul = await Shul.findAll({
            where:{
                shul_city_city:req.params.search
            },
            include: Prayers,
            
            // include: Min,
            // include: Minyan,
        })
        res.json(shul)
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'There is an error with the database'})      
    }
}
export const shulTimes = async(req,res)=>{
    // console.log();
    console.log('I am from the Shul times functoin');
    console.log('param id ', req.params.search);

    try {
        // Shul.hasOne(Minyan,{ foreignKey: "shul_id",}
        // )
        // Minyan.belongsTo(Shul,{foreignKey: "shul_id",}
        // )
        const shul = await Shul.findAll({
            include: Minyan,
        })
        res.json(shul)
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'There is an error with the database'})      
    }
}

export const registerShul = async (req,res)=>{
    const { shul_name, shul_rav, shul_address, shul_city_city, shul_country, shul_zip_code, shul_website, shul_phone_number, shachris, mincha, maariv } = req.body.text
    try { 
        await Shul.create({
            shul_name, shul_rav, shul_address, shul_city_city, shul_country, shul_zip_code, shul_website, shul_phone_number
        })
        const newShul = await Shul.findAll({
            where:{shul_name:shul_name}
        })
        await Prayers.create({
           shul_id:newShul[0].shul_id, shachris, mincha, maariv  
        })
        res.json({msg:'Register succesful'})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:`The Shul '${shul_name}' already exists`})
    }
}
export const createMinyan = async (req,res)=>{
    const {shul_id, times,prayer_name} = req.body
    
    try { 
            await Prayers.create({
                shul_id:shul_id,
                times:times,
                prayer_name:prayer_name
             })    
             res.json({msg:'Register succesful'})
        
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:`The Shul '${shul_name}' already exists`})
    }
}







export const tempRegisterShul = async (req,res)=>{
    console.log(req.body);
    console.log(req.body.text);
    const { shul_name, shul_rav, shul_address, shul_city_city, shul_country, shul_zip_code, shul_website, shul_phone_number} = req.body.text
    const {shachris,mincha,maariv} = req.body.extraShachris
    try { 
        await Shul.create({
            shul_name, shul_rav, shul_address, shul_city_city, shul_country, shul_zip_code, shul_website, shul_phone_number
        })
        const newShul = await Shul.findAll({
            where:{shul_name:shul_name}
        })
        await Min.create({
           shul_id:newShul[0].shul_id, shachris, mincha, maariv  
        })
        res.json({msg:'Register succesful'})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:`The Shul '${shul_name}' already exists`})
    }
}


export const tempMin = async (req,res)=>{
    const { shachris, mincha, maariv } = req.body
        try { 
        
        await Min.create({
            shachris, mincha, maariv  
        })
        res.json({msg:'Register succesful'})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:`The Shul '${shul_name}' already exists`})
    }
}
export const tempMinGet = async (req,res)=>{
    // const { shachris, mincha, maariv } = req.body
        try { 
        
        const min = await Min.findAll()
        res.json({min})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:`The Shul already exists`})
    }
}

