import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export function postUsers(req, res) {
    const user = req.body;
    const password = req.body.password;

    // Hash password
    const passwordHash = bcrypt.hashSync(password, 10);
    user.password = passwordHash;

    const newUser = new User(user);
    newUser.save()
        .then(() => {
            res.status(201).json({
                message: 'User created successfully',
                user: {
                    email: user.email,
                    type: user.type,
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "User creation failed",
                error: err.message
            });
        });
}

export function loginUser(req, res) {
    const credentials = req.body;

    User.findOne({ email: credentials.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            bcrypt.compare(credentials.password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).json({ message: "Invalid password" });
                    }

                    const payload = {
                        _id: user._id,
                        email: user.email,
                        Firstname: user.Firstname,
                        Lastname: user.Lastname,
                        type: user.type
                    };

                    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

                    res.json({
                        message: "Login successful",
                        user: {
                            email: user.email,
                            type: user.type,
                        },
                        token
                    });
                })
                .catch(err => res.status(500).json({
                    message: `Error comparing passwords`,
                    error: err.message
                }));
        })
        .catch(err => res.status(500).json({
            message: `Error finding user`,
            error: err.message
        }));
}

export function getUser(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied, token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        res.json({
            message: "User found",
            user: decoded
        });
    } catch (err) {
        res.status(401).json({ message: "Invalid token", error: err.message });
    }
}

export function isAdminValid(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied, token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.type === "Admin") {
            req.user = decoded;
            next();
        } else {
            res.status(403).json({ message: "Access denied, not an admin" });
        }
    } catch (err) {
        res.status(401).json({ message: "Invalid token", error: err.message });
    }
}

export function isCustomerValid(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied, token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.type === "Customer") {
            req.user = decoded;
            next();
        } else {
            res.status(403).json({ message: "Access denied, not a customer" });
        }
    } catch (err) {
        res.status(401).json({ message: "Invalid token", error: err.message });
    }
}
