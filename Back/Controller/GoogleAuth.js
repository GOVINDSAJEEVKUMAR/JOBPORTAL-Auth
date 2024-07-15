const express = require("express");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const PORT = process.env.PORT || 8020
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const userdb = require('../Models/googleSchema');
require("../ConnectData/ConnectDB");





passport.use(passport.initialize());
passport.use(passport.session());


passport.use(
    new OAuth2Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('Access Token:', accessToken);
            console.log('Profile:', profile);
            
            let user = await userdb.findOne({ google: profile.id });
            if (!user) {
                user = new userdb({
                    google: profile.id,
                    displayname: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                });
                await user.save();
                
            }
            console.log('User:', user);
            return done(null, user);
        } catch (err) {
            console.error('Error in OAuth2Strategy callback:', err);
            return done(err, null);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;