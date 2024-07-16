import React from 'react';
import {IconLanguage} from '@tabler/icons-react'

const LangSelector = ({selectedLanguage, setSelectedLanguage, languages}) => {
    return (
        <span className='cursor-pointer rounded-full space-x-1 pl-2 bg-black flex items-center flex-row'>
            <IconLanguage size={20}/>
            <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className='flex flex-row bg-black rounded-full py-1 text-white'
            >
                {languages.map((language) => (
                    <option value={language} key={language}>{language}</option>
                ))}
            </select>
        </span>
    )
}

export default LangSelector