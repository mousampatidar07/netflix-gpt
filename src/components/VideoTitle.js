import React from 'react'

const VideoTitle = ({title , overview}) => {
  return (
    <div className=' w-screen aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black'>
     <h1 className='text-6xl font-bold'>{title}</h1>
     <p className='py-6 text-lg w-1/2'>{overview}</p> 
     <div className=' flex gap-3'>
        <button className='bg-white text-black rounded-lg text-lg p-4 px-12 hover:bg-opacity-50'>play</button>
        <button className='bg-gray-600  text-white rounded-lg bg-opacity-80 p-4 px-12'>More Info</button>
     </div>
    </div>
  )
}

export default VideoTitle


