import {Link, useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
// import Home from './Home'
import axios from 'axios'
import { AppContext } from '../App'
import {useContext, useState, useEffect} from 'react'
import CurrentTime from '../subComponents/CurrentTime'
import {Auth} from '../auth/Auth'
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'
import {clearUser} from '../redux/actions'
import { Box } from '@mui/material'
  
// const StyledButton = styled(Button)(`
//   text-transform: none;
//   fontStyle:'Poppins';
//   fontSize:'40px';
//   color:'#6F4A96;
// `);


const Navbar = (props) => {

const {accessToken,setAccessToken} = useContext(AppContext)

const navigate = useNavigate()

const [userName, setUserName] = useState('')

useEffect(()=>{
    if(accessToken){
        const decode = jwt_decode(accessToken)
        setUserName(decode.user.user_name)
    console.log('im from navbar in the navbar');

    }
},[accessToken])
    
const logout = async()=>{
        try{
            const response = await axios.delete('/logout',{},{//the second parameter is empty becuase we arent sending anyting in the dleif
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json',
                }
            })
            console.log('logout=> ', response);
            if(response.status == 200|| response.status == 204){
                setAccessToken(null)
                setUserName(null)
                navigate('/login')

            }
        }
        catch(e){
            console.log(e);
            navigate('/login')

        }

    }


    return (
        
        <div> 
            <Stack 
                
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={3}
                >
                    <Box>
                    <Button  sx={{
                        textTransform: 'none',
                        fontFamily:'Poppins',
                        fontSize:'24px',
                        color:'#6F4A96',
                        }}
                    component={Link} to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight:'10px'}} width="26" height="26" viewBox="0 0 46 46" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.70801 19.7757C6.70801 10.9593 14.0754 3.83333 22.9871 3.83333C31.9239 3.83333 39.2913 10.9593 39.2913 19.7757C39.2913 24.2184 37.6756 28.3429 35.0162 31.8388C32.0824 35.6951 28.4663 39.0549 24.396 41.6921C23.4645 42.3016 22.6238 42.3476 21.6014 41.6921C17.5079 39.0549 13.8918 35.6951 10.9831 31.8388C8.32181 28.3429 6.70801 24.2184 6.70801 19.7757ZM17.6219 20.2721C17.6219 23.2256 20.032 25.5485 22.9871 25.5485C25.9441 25.5485 28.3774 23.2256 28.3774 20.2721C28.3774 17.3416 25.9441 14.9056 22.9871 14.9056C20.032 14.9056 17.6219 17.3416 17.6219 20.2721Z" fill="#6F4A96"/>
                        </svg> Find A Minyan
                    </Button>
     
                        
                    </Box>
                <Box>
                { !userName=='' &&
                <Button sx={{textTransform: 'none',
                            fontFamily:'Poppins',
                            fontSize:'16px',
                            color:'#3c1961'}} 
                       onClick={logout}>Logout
                </Button>
                }
                { !userName=='' &&
                <Button  
                        sx={{
                            textTransform: 'none',
                            fontFamily:'Poppins',
                            fontSize:'16px',
                            color:'#3c1961'
                        }}
                        component={Link}
                        to='/register-shul'>
                               Register Shul
                        </Button>
                }
                { !userName==''
                ? <Button component={Link} to={`/userdashboard/${userName}`}>
                     <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z" fill="#3C1961"/>
                        </svg>
                </Button>
                :<Button component={Link} to='/login'>
                        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z" fill="#3C1961"/>
                        </svg>
                </Button>
                }
            


                    </Box>

                {/* <Auth><Button component={Link} to='/users'>Users</Button></Auth> */}
                {/* <Button component={Link} to='/register-user'>Register</Button> */}
            
                
            </Stack>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return{
        clearUserInfo: ()=>dispatch(clearUser())
    }
}


export default connect(null,mapDispatchToProps)(Navbar)