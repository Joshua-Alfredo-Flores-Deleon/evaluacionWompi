import modal from "../models/clientes.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../../config.js"
import nodemailer from "nodemailer"

const registerController = {}; 

registerController.register = async (req, res) => {
    const{name,
    email,
    password,
    isVerified
    } = req.body;

    try {
        
        const exist = await modal.findOne({email})
        if(exist){
            return res.status(400).json({message:"Already exist"})
        }

        const passwordHashed = await bcrypt.hash(password, 10)

        const randomNumber = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            {
                randomNumber,
                password: passwordHashed,
                name,
                email,
                isVerified,
            },
            config.JWT.secret,
            {expiresIn:"15m"},
        );

        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user:config.email.user_email,
                pass:config.email.user_password,
            },
        });

        const mailOptions = {
            from: config.email.user_email,
            to:email,
            subject: "Verificacion de cuenta",
            text:
                "Para verificar tu cuenta utiliza este codigo:"+ randomNumber + "Expira en 15 minutos"
        };

        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log("error"+error)
                return res.status(500).json({message:"Error sending"})
            }
            return res.status(200).json({mesage:"email send"})
        });
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

registerController.verifyCode = async ( req, res) => {
    try {

        const {verificationCodeRequest} = req.body;

        const token = req.cookies.registrationCookie;
        if (!token) {
            return res.status(400).json({message:"No active registration session or registration token has expired"})
        }

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        const{
            randomNumber:storedCode,
            name,
            email,
            password,
            isVerified,
        } = decoded;

        if(verificationCodeRequest != storedCode){
            return res.status(400).json({message:"invalid Code"})
        }

        const nuevo = new modal({
            name,
            email,
            password,
            isVerified:true,
        });

        await nuevo.save();
        res.clearCookie("registrationCookie")
        return res.status(200).json({message: "registrered"})
        
    } catch (error) {
        console.log("error"+error)
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Verification code has expired" })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(400).json({ message: "Invalid registration token" })
        }
        return res.status(500).json({message:"Internal Server Error"})    
    }
}

export default registerController;