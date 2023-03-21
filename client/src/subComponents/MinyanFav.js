
import { Button,Stack,Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

import Minyanim from "./Minyanim";


export const MinyanFav = (props)=>{ 

    const [prayers,setPrayers]=useState([])
    const {shul} = props.selectedShul

    const getTimes = async(e)=>{
        console.log(e.shul_id);
        const response = await axios.get(`http://localhost:8080/shul-times/shul${e.shul_id}`)
         if (response.status==200){
            setPrayers(response.data)
        }
    }
    const eraseTime=()=>{
        return setPrayers([])
    }

    // const {minyans} = props
    // console.log(minyans);
return(
        <Stack>
            {prayers.length>=1
            ?<Button onClick={eraseTime}>Minimize Times</Button>
            :<Button onClick={()=>getTimes(shul)}> Check Times</Button>
            }
            {prayers.length>0 && <Minyanim prayers={prayers}/>
            }
        </Stack>
    )
}