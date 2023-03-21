
const Minyanim = (props)=>{
    const {prayers} = props

return(
    
            <div style={{ display:'flex', justifyContent:'start' }}>
                <ol style={{padding:0}}>
                    Shachris: 
                        {prayers.filter(prayerName=>prayerName.prayer_name =='shachris').map((minyan)=>{
                            return(
                                <div>{minyan.times}</div>
                            )
                        })}
                </ol>

                    <ol>
                    Mincha:     
                        {prayers.filter(prayerName=>prayerName.prayer_name =='mincha').map((minyan)=>{
                            return(
                            <div>{minyan.times}</div>
                            )
                        })}
                    </ol>

                    <ol>
                    Marriv:  
                        {prayers.filter(prayerName=>prayerName.prayer_name =='maariv').map((minyan)=>{
                            return(
                            <div>{minyan.times}</div>
                            )
                        })}
                    </ol> 
            </div> 
)
}

export default Minyanim