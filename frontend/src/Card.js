import React from 'react'

function Card({message,name,Nam}) {
  return (
    <div className={`max-w-1/2 w-fit h-fit relative ${name === Nam ? 'bg-cyan-400' : 'bg-emerald-400'} 
    text-black font-black p-2 m-2 font-mono rounded-sm `}>
        <div className=' flex-start text-white text-xs relative right-2'>{name}</div>
    {message}
  </div>
  )
}

export default Card
