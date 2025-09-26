'use client';

import { contactInfo } from '@/data/contactInfo';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    projectType: 'consulting'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully. I&apos;ll get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          projectType: 'consulting'
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.error || 'Something went wrong. Please try again or email me directly.');
      }
    } catch (error: unknown) {
      console.error(error);
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-neutral-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gradient">EduCoder.dev</Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-primary-500 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-primary-500 transition-colors">About</Link>
            <Link href="/projects" className="hover:text-primary-500 transition-colors">Projects</Link>
            <Link href="/experience" className="hover:text-primary-500 transition-colors">Experience</Link>
            <Link href="/blog" className="hover:text-primary-500 transition-colors">Blog</Link>
            <Link href="/contact" className="text-primary-500">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Ready to discuss your next project? I&apos;m always interested in hearing about
              innovative opportunities and challenging problems to solve.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-semibold mb-8 text-gradient">Get In Touch</h2>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-neutral-400">{info.label}</div>
                      {info.href ? (
                        <a href={info.href} className="text-foreground hover:text-primary-500 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-foreground">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability Status */}
              <div className={`${ isAvailable ? 'bg-secondary-500/50 border-secondary-500' : 'bg-primary-500/10 border-primary-500/20'} border rounded-xl p-6`}>
                <h3 className={`${ isAvailable ? 'text-secondary-400' : 'text-primary-400'} font-semibold mb-2`}>Current Availability</h3>
                { isAvailable ? (
                  <>
                    <p className="text-sm text-neutral-300 mb-3">
                      I&apos;m currently accepting new projects and consulting opportunities.
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-secondary-400">Available for hire</span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-neutral-300 mb-3">
                      I am not currently accepting new projects and consulting opportunities.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                        placeholder="Your company (optional)"
                      />
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                      >
                        <option value="consulting">Consulting</option>
                        <option value="fulltime">Full-time Position</option>
                        <option value="contract">Contract Work</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                      placeholder="Brief project description"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-vertical"
                      placeholder="Tell me about your project, timeline, and requirements..."
                    />
                  </div>

                  {/* Status Message */}
                  {submitStatus !== 'idle' && (
                    <div className={`flex items-center space-x-3 p-4 rounded-lg ${
                      submitStatus === 'success'
                        ? 'bg-secondary-500/10 border border-secondary-500/20'
                        : 'bg-primary-500/10 border border-primary-500/20'
                    }`}>
                      {submitStatus === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      )}
                      <p className={`text-sm ${
                        submitStatus === 'success' ? 'text-secondary-400' : 'text-primary-400'
                      }`}>
                        {statusMessage}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-500 text-white transform hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-neutral-400"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}