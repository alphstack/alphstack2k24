const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const signin = async (req, res) =>{
    try{
        const {username, password} = req.body;
        if(!username || !password)
            return res.status(400).json({error: 'Toate campurile sunt obligatorii.'});

        let emailValidator = req.body.username.split("");
        let isEmail = false;
        for (let i =0; i < emailValidator.length; i++) {
            if(emailValidator[i] == '@'){
                isEmail = true;
                break;
            }
        }
        let user;
        if(isEmail)
            user = await userModel.findOne({email: username});
        else
            user = await userModel.findOne({username: username});
        if(user){
            const passMatch = await bcrypt.compare(password, user.password);

            if(passMatch){
                const token = createToken(user._id)

                res.status(200).json({username:user.username, token});
            }
            else
                return res.status(400).json({error: 'Parola incorecta!'});
        }
        else
            return res.status(400).json({error: 'Contul nu exista!'});
    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

const signup = async (req, res) =>{
    try{
        const saltRounds = 12;

        const {email, username, password, confirmPassword} = req.body;
        if(!email || !username || !password || !confirmPassword)
            return res.status(400).json({error: 'Toate campurile sunt obligatorii.'});

        if(password !== confirmPassword)
            return res.status(400).json({error: 'Parolele nu sunt identice.'});

        if(password.length < 7)
            return res.status(400).json({error: 'Parola trebuie sa aiba minim 7 caractere'});
        let cifre = 0;
        for(let i = 0; i < password.length; i++){
            if(password[i] === ' ')
                return res.status(400).json({error: 'Parola nu poate contine spatii goale!'});
            if(password[i] >= '0' && password[i] <= '9')
                cifre++;
        }
        if(cifre < 3)
            return res.status(400).json({error: 'Parola trebuie sa aiba minim 3 cifre!'});
        
        if(!email.includes('@') && !email.includes('+') && !email.includes('%')){
            return res.status(400).json({error:"Email invalid!"});
        }

        const existingUser = await userModel.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
        
        if(existingUser){
            return res.status(400).json({ error: 'Usernameul este deja folosit!'});
        }

        if(!/^[a-zA-Z0-9.]*$/.test(username)){
            return res.status(400).json({error: 'Numele poate sa contina doar litere din alfabetul englez!'});
        }   

        const existingEmail = await userModel.findOne({email})
        if(existingEmail){
            return res.status(400).json({error:'Emailul este deja folosit!'})
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const data = {
            username,
            email,
            password: hashedPassword,
            prompts: [{role: 'system', content:'Tu esti un terapeut, psiholog si trebuie sa consulti oamenii legat de activitatile lor zilnice, nu ai voie sa raspunzi la intrebari out of context.'}],
            tasks: []
        
        }

        const user = await userModel.create(data);

        console.log(user._id);
        const token = createToken(user._id);
        console.log(user._id, token);

        res.status(200).json({username, token})
    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);
    }
}

module.exports ={
    signup,
    signin
}