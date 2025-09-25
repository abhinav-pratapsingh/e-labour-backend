import { config } from "dotenv";
config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    secure:true,
    host: "smtp.gmail.com",
    port: 465,
    auth : {
        user : process.env.USER_EMAIL,
        pass : process.env.PASS_EMAIL
    }

});

const sendMail = async (to,subject,msg)=>{
    try{
    await transporter.sendMail({
        to,
        subject,
        html:msg
    });
    console.log("email sent")
    return true;
    }catch(e){
        console.log(`there is an error in sending email ${e}`);
        return false;
}
};

export default sendMail;