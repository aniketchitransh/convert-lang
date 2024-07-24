import { useEffect, useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
    dangerouslyAllowBrowser: true,
});

const useTranslate = (sourceText, selectedLanguage) => {
    const [targetText, setTargetText] = useState();

    useEffect(() => {
        const handleTranslate = async (sourceText) => {
            try {
                const response = await openai.chat.completions.create({
                    model: 'whisper-1',
                    messages: [{
                        role: 'user',
                        content:
                            `
                                You will be provided with a sentence. This sentence: ${sourceText}. Your task is to: 
                                - detect what language the sentence is written in
                                - translate the sentence into ${selectedLanguage}
                                do not return anything other than the translated sentence
                            `
                    }]
                })
                const data = response.choices[0].message.content
                setTargetText(data)
            } catch (error) {
                console.log('Error translating text:', error);
            }
        }

        if (sourceText.trim()) {
            const timeoutId = setTimeout(() => {
                handleTranslate(sourceText)
            }, 500)

            return () => clearTimeout(timeoutId)
        }
    }, [sourceText, selectedLanguage])

    return targetText;
}

export default useTranslate;