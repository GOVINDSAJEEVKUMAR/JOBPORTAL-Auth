const express = require("express");
const router = express.Router();
const passport = require("passport")
const {SignUp,Login,Logout,getAll,userVerification,getUser} = require("../Controller/Register")
const {MobileLogin,Otp} = require("../Controller/OtpAuth")
const {googleAuth, googleCallback,  loginSuccess} = require ("../Controller/GoogleAuth")


router.post("/",SignUp)
router.get("/",getAll)
router.post("/login",Login)
router.post("/logout",Logout)
router.get("/verify",userVerification,getUser)

router.post("/mobilelogin",MobileLogin)
router.post("/otp",Otp)



router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/home',
    failureRedirect: 'http://localhost:5173'
}));

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "success", user: req.user });
    } else {
        res.status(400).json({ message: "unsuccess" });
    }
});







module.exports = router