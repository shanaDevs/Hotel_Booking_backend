import User from "../modules/users.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config()
export function postUsers(req, res) {
    const user = req.body
    const password= req.body.password
    const passwordHash = bcrypt.hashSync(password,10)
    console.log(passwordHash)
    user.password = passwordHash
   const newUser = new User(user)
    newUser.save().then(() => {
        res.json(
            {
                message: 'User created successfully',
                user
            }
        );
    }).catch(err => {
        res.json(
            {
                message: err + "user creation failed",
            }
        )
    });
}

export function loginUser(req, res) {
    const credentials = req.body;

    User.findOne({ email: credentials.email }).then((user) => {
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        bcrypt.compare(credentials.password, user.password).then((isMatch) => {
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid password",
                });
            }

            const payload = {
                _id: user._id,
                email: user.email,
                Firstname: user.Firstname,
                Lastname: user.Lastname
            };

            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

            res.json({
                message: "Login successful",
                user,
                token
            });
        }).catch(err => {
            res.status(500).json({
                message: `Error comparing passwords: ${err.message}`,
            });
        });
    }).catch(err => {
        res.status(500).json({
            message: `Error finding user: ${err.message}`,
        });
    });
}