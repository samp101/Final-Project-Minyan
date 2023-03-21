import {useState, useEffect} from 'react'

const CurrentTime = () =>{
    

    const [time,setTime] = useState('')

    useEffect(()=>{
        setInterval(()=>setTime(new Date()),1000)
    },[])

  return(
    
    <div style={{
            display:'inline-block',
                fontFamily:'Gudea',
                fontSize:'40px',
                color:'white'
                }}>
        {time.toLocaleString( undefined,{
            hour:'numeric',
            minute:'numeric',
            hour12:true    
        })}
    </div>
    )
}

export default CurrentTime
