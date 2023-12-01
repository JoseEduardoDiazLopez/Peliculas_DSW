const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.registerUser = async (req, res) => {
    try{
        const {userName, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: "El usuario existe"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({userName, email, password: hashedPassword});
        await newUser.save();
        
        return res.status(201).json({message: 'Usuario registrado !'});
    }catch(error){
        res.status(500).json({error: 'Error al registrar el usuario'});
    }
};

exports.getUsers = async (req, res) => {
    try{
        const users = await User.find();
        return res.status(200).json(
            {
                message: 'Usuarios obtenidos con éxito.',
                data: users
            }
        );
    }catch(error){
        return res.status(500).json({
            error: 'Error al obtener usuarios.',
            data: users
        })
    }
};

exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        //console.log(email + " "+ password);

        await User.findOne({email}).then(async user => {
            //console.log(user);
            if (!user){
                return res.status(401).json({error: 'Credenciales inválidas.'});
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            //console.log(123);

            //console.log(passwordMatch);
            if(!passwordMatch){
                return res.status(401).json({error: 'Credenciales inválidas.'});
            }

            const token = jwt.sign({userId: user._id, userName: user.userName}, 'secreto', {expiresIn: '8h'});

            let formatUser = {
                _id: user._id,
                userName: user.userName,
                userEmail: user.userEmail
            };

            return res.json({
                user: formatUser,
                token: token,
                action: 'login'
            });
        }).catch(err => {
            return res.status(500).json(
                {
                    action: 'login',
                    error: error
                }
            );
        });
    } catch(error){
        res.status(500).json({error: 'Error al iniciar sesión.'});
    }
};
