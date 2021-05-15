const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');


exports.signup = async(req, res) => {
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        //get body of the request
        console.log("REQUEST BODY: ", req.body);
        const { name, email, password } = req.body;
        const user = new User(req.body);

        let isUser = await User.findOne({email})

        // Check Existing user or not
        if(isUser){
            return res
            .status(400)
            .json({errors: "User Alredy Exist"});
        }


        // For password Encryption
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
        //Save to DB
        await user.save();
        res.json(user);


    }catch(err){
        console.log("ERR: ", err.message);
        res.status(500).send('Server Error');
    }

}

exports.signIn = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
        .status(400)
        .json({errors: errors.array()})
    }

    const { email, password } = req.body;


    try{
        let user = await User.findOne({ email });

        console.log("USER:", user);
        
        if(!user){
            return res
            .status(400)
            .json({errors: [{msg: 'Invalid Credentials'}]})
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res
            .status(400)
            .json({errors: [{msg: 'Invalid Credentials'}]})
        }    

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {expiresIn: 36000},
            (err, token) => {
                if(err) throw err;
                res.json({token});
            }
            );

    }catch(err){
        console.log(err.message);
        res.status(500).send("SERVER ERROR")
    }

}

exports.authToken = async (req, res) => {
    try {
        console.log("REQUEST BODY: ", req.body);
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
}





