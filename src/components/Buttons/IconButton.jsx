import React from 'react'

const IconButton = ({Icon, onClick}) => {
    return (
        <span className='flex items-center cursor-pointer space-x-2' onClick={onClick}>
            <Icon size={22} />
        </span>
    )
}

export default IconButton