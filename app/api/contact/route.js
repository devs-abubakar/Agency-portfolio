// app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, service, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure the email transporter
    // Note: For Gmail, you will need an App Password (not your login password)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // This helps if your local machine has certificate issues
    rejectUnauthorized: false
  }
});
    // Set up email data
    const mailOptions = {
      from: process.env.EMAIL_USER, // The email sending the message
      to: process.env.AGENCY_EMAIL, // Your agency email receiving the message
      replyTo: email, // Allows you to hit "Reply" and answer the user directly
      subject: `New Inquiry: ${service} from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Service: ${service}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
} catch (error) {
    console.error('--- GMAIL ERROR LOG ---');
    console.error('Code:', error.code);
    console.error('Response:', error.response);
    console.error('Message:', error.message);
    console.error('-----------------------');
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}