import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { AppContext } from "../App"
import { useContext } from 'react';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CardForShul(props) {
  const {setFavShuls} = useContext(AppContext)
    

  const {shul_id,shul_name, shul_rav, shul_city_city, shul_address} = props.shulItem
  
  
  let shulIsFav = false
  let favId;
  let id = props.userId

  if(!id==''){
    props.favShul.forEach((shul)=>{
      if(shul_id == shul.shul.shul_id){
        shulIsFav = true
        favId = shul.id
      }})
  }
  
  
  
  const removeFavourite = async()=>{ 
      try {
      
            const response = await axios.post('/delete-from-fav',{
              favId
            },{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json',
                }
            })
            
            // const getFavData = async()=>{
                let response1 = await axios.get(`http://localhost:8080/favourite-shul/user=${id}`)
             if (response1.status==200){
                setFavShuls(response1.data)
            }
          // }
            // getFavData()
      
    } catch (error) {
      
    }



  }
  const addToFav = async ()=>{
    try {
      let id = props.userId 
      if (id == '') return alert('Please Log In To Add to Favourites');
      
      const response = await axios.post('/add-to-fav',{
         shul_id, id
      },{
          withCredentials:true,
          headers:{
              'Content-Type':'application/json',
          }
      })
      let response1 = await axios.get(`http://localhost:8080/favourite-shul/user=${id}`)
      if (response1.status==200){
         setFavShuls(response1.data)
     }
} catch (error) {


}



  }
  
  return (
    <Card sx={{ width: '80vw', border:3, borderRadius:5, borderColor:'#E1E1E1', m:5, padding:2}}>
      <CardContent sx={{ display:'flex', flexDirection:'column', alignItems:'start', fontFamily:'Poppins'}}>
        <Typography sx={{fontFamily:'Poppins', fontWeight:600, fontSize:24, color:'#321154'}} variant="h5" color="text.secondary" gutterBottom>
            {shul_name}
        </Typography>
        
        <Typography  variant='h5' sx={{ mb: 1.5, fontFamily:'Poppins', fontSize:15, color:'#321154' }} color="text.secondary">
            {shul_city_city}  
        </Typography>
      </CardContent>
      <CardActions>
         <Button size="small" onClick={()=>props.getMinyanim(shul_id)} >Check Times</Button>
         {shulIsFav ? <Button size="small" onClick={removeFavourite}>Remove From Favourites</Button> 
                    : <Button size="small" onClick={()=>addToFav()}>Add to Favourites</Button>} 
      </CardActions>
    </Card>
  );
}
