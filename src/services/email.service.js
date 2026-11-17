const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    },
});

transporter.verify((error, success)=>{
    if(error){
        console.error("Error connecting to email server:", error)
    }else{
        console.log("Connected to email server")
    }
})

const sendEmail = async (to, subject, text, html) => {
    try{ 
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        });
        console.log("Email sent successfully:", info.messageId);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

async function sendRegistrationEmail(userEmail, name){
    const subject = "Welcome to Our App";
    const text = `Hi ${name},\n\nWelcome to our app! We're excited to have you on board.`;
    const html = `<p>Hi ${name},</p><p>Welcome to our app! We're excited to have you on board.</p>`;

    await sendEmail(userEmail, subject, text, html);
}


module.exports = { sendRegistrationEmail }; 