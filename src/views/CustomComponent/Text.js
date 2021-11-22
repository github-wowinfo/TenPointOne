import React from "react"

const Text = ({ text = '', fchar, lchar, style = {}, }) => {
    
    return (
        <label style={style} className='text'>{text.slice(0, fchar || 18)}...{text.slice(text.length - (lchar || 4), text.length)}</label>
    )
}

export default Text
