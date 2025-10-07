import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  projectType: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Log the submission
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      name: body.name,
      email: body.email,
      company: body.company || 'Not provided',
      subject: body.subject,
      projectType: body.projectType,
      message: body.message
    });

    const toAddress = process.env.NOTIFICATION_EMAIL;

    if (!toAddress) {
      console.error(`Missing NOTIFICATION_EMAIL env variable`)
      return NextResponse.json({ error: 'Missing configuration'}, { status: 500 })
    }

    // Send email notification via Resend
    const result = await resend.batch.send([
      {
        from: 'outreach@mail.educoder.dev',
        to: toAddress, // Your email
        subject: `Contact Form Submission: ${body.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Company:</strong> ${body.company || 'Not provided'}</p>
          <p><strong>Project Type:</strong> ${body.projectType}</p>
          <p><strong>Subject:</strong> ${body.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Submitted at: ${new Date().toLocaleString()}
          </p>
        `,
      },
      {
        from: 'outreach@mail.educoder.dev',
        to: body.email,
        subject: `Thanks for getting in touch. We'll respond shortly`,
        html: `
          <h2>Thanks for reaching out!</h2>
          <p>I will review your message and reach out soon.</p>
          <p>Take care,<br/>
          James</p>
        `
      }
    ]);

    if (result.error) {
      console.error('Resend API error:', result.error.message);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

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