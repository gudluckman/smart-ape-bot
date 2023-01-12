// function for errorhandler doesn't work currently

// module.exports = async function enableAI() {
//     try {
//         if (message.author.bot) return;
//         const gptResponse = await openai.createCompletion({
//            model: "text-davinci-003",
//            prompt: `Hey Give me a response for this: ${message.content}`,
//            temperature: 0.5,
//            max_tokens: 60,
//            top_p: 1.0,
//            frequency_penalty: 0.5,
//            presence_penalty: 0.0,
//         });

//         const result = gptResponse.data.choices[0].text;
//         console.log("chatGPT_GENERAL RESPONSE");

//         return result;

//     } catch(error){
//         console.log(error);
//     }
// }