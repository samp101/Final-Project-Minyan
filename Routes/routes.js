import express from 'express'
import { register,login,logout,shulList, shulTimes, shulCityTimes,registerShul,tempMin,tempMinGet, tempRegisterShul,userInfo,createMinyan,cM } from '../controller/userControler.js'

const router = express.Router()
// this makes it that you can use a default router name so you dont have to write it everytime

router.post('/register',register)
router.post('/register-shul',registerShul)
router.post('/login', login)

router.get('/city=:cityName', shulList)
router.get('/user-info/:id', userInfo )
router.get('/shul-times', shulTimes)
router.get('/shul-times/city=:search',shulCityTimes )

router.delete('/logout',logout)





router.post('/register-shul1',tempRegisterShul)
router.post('/temp-min',tempMin)

router.post('/prayer',createMinyan)
router.get('/prayer',cM)


router.get('/temp-min',tempMinGet)



export default router
