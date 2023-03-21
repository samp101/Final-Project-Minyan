import {useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../App'

export const Auth = (props) =>{
    const [redirect,setRedirect] = useState(null)
    const {setAccessToken} = useContext(AppContext)
    const navigate = useNavigate()


useEffect(()=>{
    const verify = async()=>{
        try {
            const response = await axios.get('/token',{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json',
        }})
            if(response.status == 200){
                setRedirect(true);
            }
        } catch (error) {
            setTimeout(() => {
                navigate('/login')
            }, 5000);
            
        }
    }
    verify()
},[])
return (
    redirect ? props.children : ''
)
}
