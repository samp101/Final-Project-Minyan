import express from 'express'
import {  register,
        login,
        logout,
        shulList,
        shulTimes,
        shulsInCityFun,
        registerShul,
        tempMin,
        tempMinGet,
        tempRegisterShul,
        userInfo,
        addToFav,
        ff,
        deleteFromFav,
        createMinyan,
        getFavShul,
        getFavouritesPrayers
                                 } from '../controller/userControler.js'

const router = express.Router()
// this makes it that you can use a default router name so you dont have to write it everytime

router.post('/register',register)
router.post('/register-shul',registerShul)
router.post('/login', login)

router.get('/city', shulList)
// router.get('/city=:cityName', shulList)
router.get('/user-info/:id', userInfo )
// router.get('/shul-times', shulTimes)
router.get('/shul-times/shul:shulId', shulTimes)
router.get('/shul-times/city=:search',shulsInCityFun )
router.get('/prayers/shulid=:id',getFavouritesPrayers )
router.get('/favourite-shul/user=:id',getFavShul )


router.post('/add-to-fav',addToFav)
router.post('/delete-from-fav',deleteFromFav)
router.delete('/logout',logout)



router.post('/register-shul1',tempRegisterShul)
router.post('/temp-min',tempMin)
// router.get('/ss/:shulId/user=:id',getFavourites)

router.post('/prayer',createMinyan)


router.get('/temp-min',tempMinGet)
router.get('/ff',ff)



export default router
