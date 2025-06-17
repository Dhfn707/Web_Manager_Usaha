import React from 'react'

const Button = ({color, name}) => {
  return (
    <div className={`px-10 py-2`} style={{backgroundColor: color}}>
      {name}
    </div>
  )
}

export default Button
