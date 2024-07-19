import { useEffect, useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.loacl.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})