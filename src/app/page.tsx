'use client'
import "regenerator-runtime/runtime";
import React, { useState, ChangeEvent } from 'react';
import useTranslate from '@/hooks/useTranslate'

import FileUpload from '@/components/inputs/FileUpload';
import LinkPaste from '@/components/inputs/LinkPaste';
import LangSelector from '@/components/inputs/LangSelector'
import TextArea from '@/components/inputs/TextArea'
import SpeechRecognitionComponent from '@/components/SpeechRecognition/SpeechRecognitionComponent';
import { IconCopy, IconThumbUp, IconVolume, IconThumbDown, IconStar } from "@tabler/icons-react";
import { rtfToText } from '@/utils/rtfToText';
// import SvgDecorations from '@/components/SvgDecorations'
// import CategoryLinks from '@/components/CategoryLinks'

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");

  const [copied, setCopied] = useState<boolean>(false);

  const [fav, setFav] = useState<boolean>(false);

  const [languages] = useState<string[]>(["English", "French", "Spanish", "German", "Hindi", "Chinese"])

  const [selectedLanguage, setSelectedLanguage] = useState("Spanish");

  const targetText = useTranslate(sourceText, selectedLanguage)

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string
        const text = rtfToText(rtfContent)
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  }

  const handleClipCopy = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    }, 2000);
  };

  const handleFav = () => {
    setFav(!fav);
  }

  const hanleLinkPaste = (text: string) => {}

  return (
    <div>
      <div className="h-[100vh] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative overflow-hidden h-screen">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">Convert <span className="text-emerald-500">Lang</span></h1>
              <p className="mt-3 text-neutral-400">Convert Lang: Instant AI Language Translation</p>

              <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                  
                  <div className="relative p-3 z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    <TextArea
                      id='source-language'
                      value={sourceText}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setSourceText(e.target.value)
                      }}
                      placeholder='Source Language'
                    />
                    <div className="flex flex-row justify-between w-full">
                      <span className="flex flex-row space-x-2 cursor-pointer">
                        <SpeechRecognitionComponent
                          setSourceText={setSourceText}
                        />
                        <IconVolume
                          size={22}
                          onClick={() => handleAudioPlayback(sourceText)}
                        />
                        <FileUpload handleFileUpload={handleFileUpload} />
                        <LinkPaste handleLinkPaste={hanleLinkPaste}/>
                      </span>
                      <span className="text-sm pr-4">{ sourceText.length } / 2000</span>
                    </div>
                  </div>
                  
                  <div className="relative p-3 z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    <TextArea
                        id='target-language'
                        value={targetText}
                        onChange={() => {}}
                        placeholder='Target Language'
                    />
                    <div className="flex flex-row justify-between w-full">
                      <span className="flex flex-row items-center space-x-2 cursor-pointer">
                        <LangSelector
                          selectedLanguage={selectedLanguage}
                          setSelectedLanguage={setSelectedLanguage}
                          languages={languages}
                        />
                        <IconVolume size={22} onClick={() => handleAudioPlayback(targetText)}/>
                      </span>
                      <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                        <IconCopy size={22} onClick={handleClipCopy} />
                        {copied && <span className="text-xs text-green-500">Copied</span>}
                        <IconThumbUp size={22} />
                        <IconThumbDown size={22} />
                        <IconStar size={22} onClick={handleFav} className={fav ? "text-yellow-500" : ""} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              {/* <SvgDecorations /> */}
              {/* <CategoryLinks /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
