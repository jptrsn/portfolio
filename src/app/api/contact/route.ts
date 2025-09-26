import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  projectType: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Basic validation
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log the submission (in production, you'd want to save this to a database)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      name: body.name,
      email: body.email,
      company: body.company || 'Not provided',
      subject: body.subject,
      projectType: body.projectType,
      message: body.message
    });

    // Here you can add different notification methods:

    // Option 1: Send email using a service like Resend, SendGrid, or Nodemailer
    // await sendEmailNotification(body);

    // Option 2: Save to database (Supabase, PlanetScale, etc.)
    // await saveToDatabase(body);

    // Option 3: Send to Slack/Discord webhook
    // await sendSlackNotification(body);

    // Option 4: Send to a form service like Formspree
    // await sendToFormspree(body);

    // For now, we'll just simulate success
    // In production, you'd implement one of the above methods

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received successfully!'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Example email notification function (commented out - requires email service)
/*
async function sendEmailNotification(formData: ContactFormData) {
  // Using Resend (popular choice for Next.js)
  const { Resend } = require('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'contact@educoder.dev',
    to: 'your@email.com',
    subject: `New Contact Form: ${formData.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
      <p><strong>Project Type:</strong> ${formData.projectType}</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
    `
  });
}
*/

// Example Slack notification function
/*
async function sendSlackNotification(formData: ContactFormData) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `New contact form submission from ${formData.name} (${formData.email})`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*New Contact Form Submission*\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Company:* ${formData.company || 'Not provided'}\n*Project Type:* ${formData.projectType}\n*Subject:* ${formData.subject}\n*Message:* ${formData.message}`
          }
        }
      ]
    })
  });
}
*/