// import { GoogleGenAI } from '@google/genai';
// import { NextResponse } from 'next/server';
// export async function POST(req) {
//     const { mood, region ,days,budget,people} = await req.json();
//  const promt = `Generate Travel Plan with "${mood}" mood in "${region}" region ,for "${days}" Days for "${people}" with a "${budget}" budget, give me destination place name , address ,  hotels options list with HotelName,Hotel address, price , hotel img url ticket pricing, time travel each of the location for "${days}" days with each day plan with best time to visit in JSON format.`
//     const ai = new GoogleGenAI({
//         // apiKey: process.env.GEMINI_API_KEY,
//         apiKey: "AIzaSyBjzbpLtboNAicE6tpGXrYELk172n2prVE",
//     });

//     const config = {
//         responseMimeType: 'text/plain',
//     };

//     const model = 'gemini-2.0-flash';

//     const contents = [
//         {
//             role: 'user',
//             parts: [{ text: promt }],
//         },
//     ];

//     try {
//         const response = await ai.models.generateContent({
//             model,
//             config,
//             contents,
//         });
//         const generatedText = response.text;
//         console.log('Gemini AI raw output:', generatedText);
//         const rawjson = generatedText.replace('```json', '').replace('```', '')
//         const realjson = JSON.parse(rawjson)
//         return NextResponse.json(realjson);
//     } catch (error) {
//         console.error('Error generating recommendations:', error);
//         return NextResponse.json(
//             { error: 'Failed to generate recommendations. ' + (error.message || '') },
//             { status: 500 }
//         );
//     }
// }
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { mood, region, days, budget, people } = await req.json();

  const prompt = `Generate Travel Plan with "${mood}" mood in "${region}" region, for "${days}" Days for "${people}" with a "${budget}" budget. 
  Give me destination place name, address, hotels options list with HotelName, Hotel address, price, hotel img url, ticket pricing, 
  time travel for each location for "${days}" days with a daily plan including the best time to visit in JSON format.`;

  const ai = new GoogleGenAI({
    // apiKey: process.env.GEMINI_API_KEY,
    apiKey: "AIzaSyBjzbpLtboNAicE6tpGXrYELk172n2prVE",
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-2.0-flash';

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const generatedText = response.text;
    console.log('Gemini AI raw output:', generatedText);

    // If you just need to log the response and not use it,
    // you can simply return a success message.
    return NextResponse.json({ message: 'Gemini AI output logged to console.' });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations. ' + (error.message || '') },
      { status: 500 }
    );
  }
}
