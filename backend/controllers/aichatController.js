const userModel = require('../models/userModel')
const openai = require('openai');
const client = new openai.OpenAI({ apiKey: process.env.OPEN_AI_KEY })

const sendNewMessage = async (req, res) =>{
    try{
        const {prompt, username} = req.body;

        if(!username)
            return res.status(400).json({error: "Trebuie sa fii logat ca sa comunici cu AI-ul!"});

        const pushedPrompt = {
            role:"user",
            content: prompt,
            date: new Date()
        }
        const user = await userModel.findOneAndUpdate({username: username, }, {
            $push: {'prompts': pushedPrompt}
        }).select('prompts');
        console.log(user);
        if(!user){
            return res.status(400).json({error: 'Aceasta conversatie nu exista.'});
        }

        const chatHistory = user.prompts;
        chatHistory.push(pushedPrompt);

        const completion = await client.chat.completions.create({
            messages: chatHistory,
            model: "gpt-4o-mini"
        })

        const newPrompt = {
            role:"assistant",
            content: completion.choices[0].message.content,
            date: new Date()
        }

        await userModel.findOneAndUpdate({username: username}, {
            $push: {'prompts': newPrompt},
        });


        res.status(200).json({message: completion.choices[0].message.content});
    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const filterByDate = async (req, res) =>{
    try{
        const {username, date} = req.body;

        const user = await userModel.findOne({username});
        
        if(!user){
            return res.status(400).json({error: 'Trebuie sa fii logat!'});
        }

        const mesaje = user.prompts.filter(prompt => {
            const promptDate = new Date(prompt.date).toLocaleDateString();
            const requestDate = new Date(date).toLocaleDateString();
            return promptDate === requestDate;
          });

        if(!mesaje)
            return res.status(400).json({error: 'Nu exita conversatie pentru data respectiva.'});

        return res.status(200).json({mesaje});
    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

module.exports ={
    sendNewMessage,
    filterByDate
}