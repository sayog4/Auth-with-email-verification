import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
dotenv.config()
sgMail.setApiKey(process.env.EMAIL_API_KEY)

export const preSignUpMail = async (email, token) => {
  try {
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account Activation Link.`,
      html: `
      <p>Please use the following link to activate your account.</p>
      <a style="display:inline-block;padding:10px;text-decoration:none;font-size:18px;background-color:blue;color:white"        
       href="${process.env.CLIENT_URL}/activate/${token}">Activate Your Account</a>
      <hr />
      <p>This email contains sensitive information</p>
    `
    }
    await sgMail.send(emailData)
  } catch (error) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
  }
}
