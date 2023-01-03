import Users from '../modul/usersModule.js';
import Shul from '../modul/shulModule.js';
import Minyan from '../modul/minyanModule.js';
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
import Min from '../modul/tempMiny.js'
import Prayers from '../modul/prayers.js'
import FavouriteShul from "../modul/favourite_shul.js";



Shul.hasOne(Minyan,{ foreignKey: "shul_id",})
Minyan.belongsTo(Shul,{foreignKey: "shul_id",})

// Shul.hasOne(Min,{ foreignKey: "shul_id",})
// Min.belongsTo(Shul,{foreignKey: "shul_id"})
const addExtraMinyan =  (shul,minyanArray,minyanName)=>{
    minyanArray.forEach( async (prayTime) => {
        await Prayers.create({
            shul_id:shul.shul_id,
            times:prayTime,
            prayer_name:minyanName
         })        
    });
    
}


Shul.hasOne(Prayers,{ foreignKey: "shul_id",})
Prayers.belongsTo(Shul,{foreignKey: "shul_id"})

Shul.hasMany(Users,{foreignKey: "shul_id"})
Users.belongsTo(Shul,{foreignKey: "shul_id"})

Users.hasMany(FavouriteShul,{foreignKey: "id"})
FavouriteShul.belongsTo(Users,{foreignKey: "user_id"})

Shul.hasMany(FavouriteShul,{foreignKey: "shul_id"})
FavouriteShul.belongsTo(Shul,{foreignKey: "shul_id"})

export const register = async (req,res) =>{
    console.log('hello')
    // const {user_id, shul_id, user_name, user_lastname, user_address, user_city, user_country, user_zip_code, user_email, user_password} = req.body.user;
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
        const user = await Users.findAll({
            where:{user_email:user_email}
        })
        console.log(user[0].id);
        await FavouriteShul.create({
            user_id:user[0].id,
            shul_id:shul_id
        })
        res.json({msg:'Register succesful'})
    } catch (error) {
        console.log(error)
        console.log()
        res.status(404).json({msg:'There has been an error with registering. Please try again later.'})
    }
}
export const login = async(req,res)=>{
    const {user_email,user_password} = req.body.user;

    console.log(user_password);
    try {
        const userFromDb = await Users.findAll({
            where:{
                user_email:user_email
            }
            // raw : true
        })
        const match = await bcrypt.compare(user_password,userFromDb[0].user_password)
        // console.log('userFromDb 2 ', userFromDb);
  
        if (!match) return json({msg:"There is an error with either your email or password"})

        // const favShul = await FavouriteShul.findAll({
        //     attributes:['id'], 
        //     where:{user_id:userFromDb[0].id},
        //     include: [
                // { 
                //         model:Users,
                //         where:{id:userFromDb[0].id}
                //     },
                    // { 
                        // model:Shul,
                    //     where:{shul_id:userFromDb[0].shul_id}

                    // }
                    // { 
                    //     model:Shul,
                    //     where:{shul_id:attributes[1]}  
                    // }
        // ] ,
        // raw : true            
        // })
        // const favShulMinyan = await Prayers.findAll({
        //     where:{shul_id:userFromDb[0].shul_id},
        //     order: [
        //         ['prayer_name', 'DESC'],
        //         ['times', 'ASC'],
        //     ]
        
        //  })    


         const user = userFromDb[0] 
        // const favShuls = favShul
        // const minyans = favShulMinyan

        const accessToken = jwt.sign({
                user,
                // favShuls,
                // minyans
            },
            process.env.SECRET_KEY,
            {expiresIn:'600s'})

        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            maxAge: 600 * 1000
        })

        res.json({token: accessToken,userName:user.user_name})
        // res.json({msg:`welcome ${user[0].user_name}${user3.user_city}`})

    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"There is an error with either your email or password"})
        
    }


}
export const logout = (req,res)=>{
    
    const accessToken = req.cookies.accessToken;
    if(!accessToken) return res.json({msg:'Your already logged out'})
    res.clearCookie('accessToken')

    res.json({msg:'You have been succesfully logged out'})
}
export const userInfo = async (req,res)=>{
    try{
        const shul = await Users.findAll({
                where:{
                    id:req.params.id
                },
            include: [{ model: Shul }]
        })
        res.json(shul)
} catch (error) {
    console.log(error);
    res.status(404).json({msg:'There is an error with the database'})      
}

}
export const shulList = async(req,res)=>{
    try {
        const shul = await Shul.findAll({})
        res.json(shul)
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'There is an error with the database'})      
    }
}
export const shulsInCityFun = async(req,res)=>{

    try {
        
        const shulsInCity = await Shul.findAll({
            where:{
                shul_city_city:req.params.search
            }
            
            // include: Min,
            // include: Minyan,
        })
        res.json(shulsInCity)
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'There is an error with the database'})      
    }
}
export const shulTimes = async(req,res)=>{
    
    try {
        const shulTimes = await Prayers.findAll({
            where:{
                shul_id:req.params.shulId
            },
            order: [
                ['prayer_name', 'DESC'],
                ['times', 'ASC'],
            ]
        })
        res.json(shulTimes)
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:'There is an error with the database'})      
    }
}
export const registerShul = async (req,res)=>{
    const { shul_name, shul_rav, shul_address, shul_city_city, shul_country, shul_zip_code, shul_website, shul_phone_number, shachris, mincha, maariv } = req.body.shul
    try { 
        await Shul.create({
            shul_name, shul_rav, shul_address, shul_city_city, shul_country, shul_zip_code, shul_website, shul_phone_number
        })
        const newShul = await Shul.findAll({
            where:{shul_name:shul_name}
        })
        addExtraMinyan(newShul[0],shachris,'shachris')
        addExtraMinyan(newShul[0],mincha,'mincha')
        addExtraMinyan(newShul[0],maariv,'maariv')

        res.json({msg:'Register succesful'})
    } catch (error) {
        res.status(404).json({msg:`There Was An Error Registering The Shul Please Try Again`})
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
export const getFavouritesPrayers = async (req,res)=>{
    // const {shul_id, times,prayer_name} = req.body
    console.log(req.params.id);
    try { 
            const b = await Prayers.findAll({
                where:{shul_id:req.params.id},
                order: [
                    ['prayer_name', 'DESC'],
                    ['times', 'ASC'],
                ]
                
             })    
             res.json(b)
        
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:`The Shul  already exists`})
    }
}
export const addToFav = async (req,res)=>{
    

    const { shul_id, id} = req.body
    console.log('shul_id',shul_id);
    console.log('id',id);
    
    try { 
            await FavouriteShul.create({
                user_id:id,
                shul_id:shul_id
             })    
             res.json({msg:'Register succesful'})
        
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:`The Shul '${shul_name}' already exists`})
    }
}

export const deleteFromFav = async (req,res)=>{
    
    const { favId} = req.body
    console.log('favId',favId);

    
    try { 
            await FavouriteShul.destroy({
                where:{
                    id:favId
                }
             })    
             res.json({msg:'deleted'})
        
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:`The Shul '${shul_name}' already exists`})
    }
}

export const getFavShul = async (req,res)=>{
    
    console.log('req.params.id',req.params.id);
    try { 
        const favShul = await FavouriteShul.findAll({
            attributes:['id','user_id'], 
            where:{user_id:req.params.id},
            include: [{ model:Shul}],
            order: [
                ['id', 'DESC'],
            ]
        })   
        res.json(favShul)     
        
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:`The Shul  already exists`})
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


        // const a = users[where:{id:userid}]
        // include:[{modelFavouriteShul],
        // include:shuls}


        // Categories.hasMany(Businesses, { foreignKey: "businesse_category_id" });
        // Businesses.belongsTo(Categories, { foreignKey: "businesse_category_id" });
        // Businesses.hasMany(Reviews, { foreignKey: "business_id" });
        // export const getCategoriesAndBusinesses = async (req, res) => {
        //   try {
        //     const categories = await Categories.findAll({
        //       include: [{ model: Businesses, include: [Reviews] }],
        //     });
        //     res.json(categories);
        //   } catch (err) {
        //     console.log(err);
        //     res.status(404).json({ msg: "categories not found" });
        //   }
        // };

export const ff = async (req,res)=>{
    // const { shachris, mincha, maariv } = req.body
        try { 
            const favShulMinyan = await Users.findAll({
                where:{id:req.body.id},
                include:[{model:FavouriteShul,include:{model:Shul,where:{shul_id:1}}}]
            })
        res.json({favShulMinyan})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:`The Shul already exists`})
    }
}

