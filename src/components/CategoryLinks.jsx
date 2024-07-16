import React from 'react';
import {
    IconBriefcase,
    IconBulb,
    IconSchool,
    IconWriting,
    IconMoodSmile,
    IconHeart
} from '@tabler/icons-react'

const categories = [
    { icon: IconBriefcase, lable: "Business" },
    { icon: IconSchool, lable: "Education" },
    { icon: IconBulb, lable: "Creative" },
    { icon: IconHeart, lable: "Health" },
    { icon: IconWriting, lable: "Journaling" },
    { icon: IconMoodSmile, lable: "Communication" },
]

const CategoryLinks = () => {
    return (
        <div className='mt-10 sm:mt-20'>
            {categories.map(({icon:Icon, lable}) => (
                <div
                    key={lable}
                    className='m-1 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none bg-neutral-900 text-white'
                >
                    <Icon size={40}/>
                    <p className='text-2xl'>{lable}</p>
                </div>
            ))}
        </div>
    )
}

export default CategoryLinks