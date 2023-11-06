
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../App"
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { connect } from "react-redux"
import {getFavs } from '../redux/actions'
import CurrentTime from "../subComponents/CurrentTime"
import { Stack,Typography } from "@mui/material"
import {ShulInfoFav,MinyanFav} from '../subComponents/ShulInfoFav'
import { Box } from "@mui/material"
import { display } from "@mui/system"
import frame from '../static/Frame-2.png'
import Punctation from "../subComponents/Punctation"

const UserDashboard = (props) =>{

    const {accessToken,favShuls,setFavShuls} = useContext(AppContext)
    const [token,setToken] = useState({
        user:'',
        minyans:[],
        // favShuls:[],
    })

    
    const navigate = useNavigate()
    const {user, minyans} = token

    // const {user, minyans, favShuls} = token
   

           
    useEffect(()=>{
        try {
            const decode = jwt_decode(accessToken)
            setToken(decode)
            const expire = token.exp
            const id = decode.user.id
            const getFavData = async()=>{
                const response = await axios.get(`/favourite-shul/user=${id}`)
             if (response.status==200){
                setFavShuls(response.data)
             }
            }
            getFavData()

            
            if(expire * 1000 < new Date().getTime()){
                navigate('/login')
           }

        } catch (e) {
            console.log('not allowed')
            navigate('/')
        }
    },[])
    

    return(
         (accessToken && 
        <div>
            <Box sx={{ position:'relative', backgroundColor:'#3c1961', height:'70vh'}}>
                <Box sx={{position:'absolute', top:80,left:50, display:'flex', flexDirection:'column', alignItems:"flex-start" }}>
                    <Typography sx={{
                        fontStyle:'Gudea',
                        fontWeight:'regular',
                        fontSize:'40px',
                        color: '#debfff'}}
                    >Welcome <Punctation firstWord={user?.user_name}/></Typography>
                    <Typography sx={{
                        fontStyle:'Gudea',
                        fontSize:'40px',
                        fontWeight:'bold',
                        color: 'white'}}
                    >Your current time is <CurrentTime/>   
                    </Typography>
                    
                    
                </Box>
                <Box
        component="img"
        sx={{
            position:'absolute',
            right:0,
            bottom:-20,
          height: 350,
          width: 450,
        }}
        alt="wall"
        src={frame}
      />
            </Box>
                <ShulInfoFav shul={favShuls}/>
            
        </div>)
)}

const mapStateToProps = (state)=>{
    return{
        favourite: state.userFav,
}}
const dispatchStateToProps = (dispatch)=>{
    return{
        getFavInfo : (e)=> dispatch(getFavs(e))
}}

export default connect(mapStateToProps,dispatchStateToProps)(UserDashboard)