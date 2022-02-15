const User = require('../models/User');
const bcrypt = require('bcryptjs')
class UserController {

    //[POST] api/users/new -- create user  
    async register(req, res, next) {
        const { email, username, password, passwordConfirmation } = req.body;

        if (!(email && username && password && passwordConfirmation)) {
            return res.status(400).json("Please enter require fields!");
        }

        const emailexists = await User.findOne({ email });
        if (emailexists) return res.status(401).json("Email is exists , Please login!");
        console.log("password:", password)
        console.log("passwordConfirmation:", passwordConfirmation)
        const isPasswordMatched = password.toString() === passwordConfirmation.toString();
        console.log(isPasswordMatched)
        if (!isPasswordMatched) return res.status(401).json("password is not match ,please re-enter!");

        const user = await User.create({
            email,
            username,
            password,
        })

        res.status(201).json({
            success: true,
            user,
        });
    }

    // [POST] api/user/login

    async login(req, res, next) {

        const { email, password } = req.body;

        if (!email || !password.toString()) return res.status(400).json({
            success: false,
            message: "Please enter email & password!",
        });

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found (email is not exists)!",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "incorrect password!",
            });
        }

        res.status(201).json({
            success: true,
            message: "login successfull!",
            user,
        });

    }

    // [GET] api/users/ -- get all user
    async getAllUser(req, res, next) {
        const users = await User.find();
        const userCount = await User.countDocuments();
        if (!users) {
            res.status(400).json({
                success: false,
                message: "User not found!",
            });
        };

        res.status(200).json({
            success: true,
            userCount,
            users,
        })

    }

    //[DELETE] api/products/:id -- getbyId
    // async delete(req, res, next) {
    //     const nameexists = await User.findOneAndDelete({ username: req.body.username },
    //         (err, result) => {
    //             if (err) return res.send(500, err)
    //             console.log('got deleted');
    //             res.redirect('/');
    //         })
    // }

}
module.exports = new UserController;