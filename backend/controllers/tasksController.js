const userModel = require('../models/userModel')
const openai = require('openai');
const client = new openai.OpenAI({ apiKey: process.env.OPEN_AI_KEY })
const { v4: uuidv4 } = require('uuid');

const createTask = async (req, res) =>{
    try{
        const {username, prompt} = req.body;
        if(!username || !prompt)
            return res.status(400).json("Username/prompt invalid!");

        const user = await userModel.findOne({username});

        if(!user){
            return res.status(400).json({error:'Acest cont nu exista!'});
        }

        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const messages = [
            {
                role: "system", 
content:`From the following prompt, extract the taskName, taskDeadline and taskEmoji variables. Make sure to pick a relevant emoji to the context, and format the task deadline as yyyy-mm-dd, today being the date of ${formattedDate}. Also please do not include any explainations, just the variable names and values, you will use this format: "taskName: \"30 de exercitii la fizica\"  \ntaskDeadline: \"07/01/2025\"  \ntaskEmoji: \"📚\"".  in case of invalid tasks, you output Invalid.`,
            },
            {
                role: "user",
                content: prompt,
            }
        ]

        const completion = await client.chat.completions.create({
            messages: messages,
            model: "gpt-4o-mini"
        })

        const input = completion.choices[0].message.content

        const taskNameMatch = input.match(/taskName:\s*"(.*?)"/);
        const taskDeadlineMatch = input.match(/taskDeadline:\s*"(.*?)"/);
        const taskEmojiMatch = input.match(/taskEmoji:\s*"(.*?)"/);

        const taskName = taskNameMatch ? taskNameMatch[1] : null;
        const taskDeadline = taskDeadlineMatch ? taskDeadlineMatch[1] : null;
        const taskEmoji = taskEmojiMatch ? taskEmojiMatch[1] : null;

        console.log(taskName); 
        console.log(taskDeadline); 
        console.log(taskEmoji);

        const task = {taskName, taskDeadline, taskEmoji, date, completed: false, points: 0, taskId: uuidv4()}

        await userModel.findOneAndUpdate({username}, {
            $push: {'tasks': task}
        })

        res.status(200).json({task});
    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const getTasks = async (req, res) =>{
    try{
        const {username} = req.body;
        if(!username)
            return res.status(400).json("Trebuie sa fii logat!");

        const user = await userModel.findOne({username}).select('tasks');
        console.log(user);
        if(!user){
            return res.status(400).json({error:'Acest cont nu exista!'});
        }

        res.status(200).json(user)
    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const markTaskAsDone = async (req, res) =>{
    try{
        const {username, taskId} = req.body;
        console.log(username, taskId);

        if(!username || !taskId)
            return res.status(400).json("Username/taskId invalid!");

        const user = await userModel.findOneAndUpdate(
            { username, "tasks.taskId": taskId },
            { 
                $set: { "tasks.$.completed": true }, 
            },
            { new: true }
        );
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: "Task not found or user does not exist." });
        }

        res.status(200).json({tasks: user.tasks});
    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const markTaskAsUndone = async (req, res) =>{
    try{
        const {username, taskId} = req.body;
        console.log(username, taskId);

        if(!username || !taskId)
            return res.status(400).json("Username/taskId invalid!");

        const user = await userModel.findOneAndUpdate(
            { username, "tasks.taskId": taskId },
            { 
                $set: { "tasks.$.completed": false }, 
            },
            { new: true }
        );
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: "Task not found or user does not exist." });
        }

        res.status(200).json({tasks: user.tasks});
    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const deleteTask = async (req, res) =>{
    try{
        const {username, taskId} = req.body;
        console.log(username, taskId);

        if(!username || !taskId)
            return res.status(400).json("Username/taskId invalid!");

        const user = await userModel.findOneAndUpdate(
            { username },
            {
                $pull: { tasks: { taskId: taskId } }, 
            },
            { new: true } 
        );
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: "Task not found or user does not exist." });
        }

        res.status(200).json({tasks: user.tasks});
    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

module.exports={
    getTasks,
    createTask,
    markTaskAsDone,
    markTaskAsUndone,
    deleteTask
}