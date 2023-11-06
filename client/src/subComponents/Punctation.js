

const Punctation = (props)=>{
    let {firstWord} = props 
    if(!firstWord) { firstWord = ''}
    return( 
        <span>
            {firstWord.split(' ').map(word=> word.charAt(0).toUpperCase()+word.slice(1)).join(' ')}
        </span>

    )
}


export default Punctation

