const express = require("express");
const jwt = require("jsonwebtoken");

function generateToken(user) {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
    });
    return token;
};

function generateRefreshToken(user) {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "7h",
    });
    return token;
};

function verifyToken(token) {
   return jwt.verify(token, process.env.SECRET_KEY); 
}
 
module.exports = {generateToken,generateRefreshToken,verifyToken}