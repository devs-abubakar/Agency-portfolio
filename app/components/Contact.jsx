'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Shield, Copy, Check } from 'lucide-react';

const Contact = () => {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const copyTimeoutRef = useRef(null);

  // Encoded contact information
  const encodedEmail = 'aGVsbG9AYWl2b3JhLmRpZ2l0YWw='; // Base64 encoded
  const encodedPhone = '+MSAoNTU1KSAwMDAtQUlWT1JB'; // Base64 encoded

  // Decode function
  const decodeBase64 = (str) => {
    try {
      return atob(str);
    } catch {
      return 'Contact unavailable';
    }
  };

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle contact info reveal
  const handleContactReveal = (type) => {
    if (type === 'email') {
      setEmailRevealed(true);
    } else {
      setPhoneRevealed(true);
    }
  };

  // Handle copy to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', service: 'Web Development', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Services options
  const services = [
    'Web Development',
    'Digital Marketing',
    'AI Chatbots',
    'Graphic Design',
    'UI/UX Design',
    'Mobile App Development',
    'E-commerce Solutions',
    'SEO Optimization'
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-3xl sm:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-20 shadow-2xl shadow-blue-500/20 overflow-hidden relative">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 sm:translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-cyan-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 relative z-10">
            {/* Left Column - Contact Info */}
            <div>
              <div className="mb-6 sm:mb-8 md:mb-10">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200" />
                  <h2 className="text-blue-200 font-bold uppercase tracking-widest text-xs sm:text-sm">Secure Contact</h2>
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 md:mb-8 text-white leading-tight">
                  Ready to{' '}
                  <span className="text-blue-200 underline decoration-blue-400/50 underline-offset-4 sm:underline-offset-6">
                    Scale Up?
                  </span>
                </h3>
                <p className="text-blue-100/80 text-sm sm:text-base">
                  Get in touch with our expert team. We protect your contact information.
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Email Contact */}
                <div className="group relative">
                  <div 
                    className="flex items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 cursor-pointer"
                    onClick={() => handleContactReveal('email')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleContactReveal('email');
                      }
                    }}
                  >
                    <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl group-hover:bg-white group-hover:text-blue-600 transition-colors duration-300 flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-blue-200 text-xs sm:text-sm font-semibold mb-1">Secure Email</p>
                      <div className="flex items-center justify-between gap-2">
                        {emailRevealed ? (
                          <div className="flex items-center gap-2 sm:gap-3">
                            <p className="text-base sm:text-lg md:text-xl font-bold text-white truncate">
                              {decodeBase64(encodedEmail)}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(decodeBase64(encodedEmail));
                              }}
                              className="p-1.5 sm:p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                              title="Copy email"
                              aria-label={copied ? 'Email copied to clipboard' : 'Copy email to clipboard'}
                            >
                              {copied ? (
                                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="h-4 sm:h-5 bg-white/20 rounded animate-pulse w-32 sm:w-40"></div>
                            <span className="text-xs text-blue-300/70 font-medium">Click to reveal</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Gmail action button */}
                  {emailRevealed && (
                    <div className="mt-2 pl-4 sm:pl-14">
                      <a
                        href={`mailto:${decodeBase64(encodedEmail)}?subject=Contact from Aivora Website&body=Hello Aivora Team,`}
                        className="w-full sm:inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Open in Gmail
                      </a>
                    </div>
                  )}
                </div>

                {/* Phone Contact */}
                <div className="group relative">
                  <div 
                    className="flex items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 cursor-pointer"
                    onClick={() => handleContactReveal('phone')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleContactReveal('phone');
                      }
                    }}
                  >
                    <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl group-hover:bg-white group-hover:text-blue-600 transition-colors duration-300 flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-blue-200 text-xs sm:text-sm font-semibold mb-1">Protected Phone</p>
                      <div className="flex items-center justify-between gap-2">
                        {phoneRevealed ? (
                          <div className="flex items-center gap-2 sm:gap-3">
                            <p className="text-base sm:text-lg md:text-xl font-bold text-white truncate">
                              {decodeBase64(encodedPhone)}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(decodeBase64(encodedPhone));
                              }}
                              className="p-1.5 sm:p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                              title="Copy phone"
                              aria-label={copied ? 'Phone number copied to clipboard' : 'Copy phone number to clipboard'}
                            >
                              {copied ? (
                                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="h-4 sm:h-5 bg-white/20 rounded animate-pulse w-32 sm:w-40"></div>
                            <span className="text-xs text-blue-300/70 font-medium">Click to reveal</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* WhatsApp action button */}
                  {phoneRevealed && (
                    <div className="mt-2 pl-4 sm:pl-14">
                      <a
                        href={`https://wa.me/${decodeBase64(encodedPhone).replace(/\D/g, '')}?text=Hello%20Aivora%20Team,%20I%20came%20from%20your%20website`}
                        className="w-full sm:inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.507 14.307l-.009.075c-2.199-1.096-2.429-1.242-2.713-.816-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.293-.506.32-.578.878-1.634.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.576-.05-.997-.05-1.368.344-1.614 1.774-1.207 3.604.174 5.55 2.714 3.552 4.16 4.206 6.804 5.114.714.227 1.365.195 1.88.121.574-.091 1.754-.721 2.006-1.413.255-.697.255-1.29.18-1.417-.074-.129-.279-.21-.58-.329z"/>
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 2.13.663 4.105 1.8 5.73L0 24l6.335-1.65A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm6.987 18.627c-.315.9-1.53 1.65-2.565 1.875-.705.135-1.59.225-3.96-.45-2.73-.75-5.19-2.85-6.405-5.115-1.14-2.16-1.29-4.635-.33-6.705.53-1.125 1.485-1.965 2.595-2.385.66-.24 1.41-.315 2.19-.165.54.09 1.02.3 1.47.615.27.195.615.555.615.555s.165.12.24.375c.075.255.09.405.045.615-.06.21-.27.63-.555 1.02-.285.39-.42.495-.465.69-.045.195.045.39.255.615.495.57 1.05 1.125 1.485 1.395.435.27.72.255.99.165.27-.09 1.11-.435 1.275-.435.165 0 .27.09.375.285.105.195.555 1.185.645 1.575.09.39.135.435.24.435.105 0 .27-.06.495-.27s1.065-1.05 1.32-1.41c.255-.36.51-.3.675-.18.165.12 1.065.615 1.245.72.18.105.3.165.345.27.045.105.045.615-.105.93z"/>
                        </svg>
                        Open WhatsApp
                      </a>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/10">
                  <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs sm:text-sm font-semibold mb-1">Our Studio</p>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-white">
                      Innovation Blvd, Silicon Valley
                    </p>
                    <p className="text-blue-100/70 text-xs sm:text-sm mt-1">
                      Visit by appointment only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-slate-950/60 backdrop-blur-xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                Start Your Project
              </h3>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                  <p className="text-green-300 text-sm sm:text-base">
                    ✅ Thank you! We'll contact you within 24 hours.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-slate-300">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all text-white placeholder-slate-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-slate-300">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all text-white placeholder-slate-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-slate-300">
                    Service Needed *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all text-white appearance-none"
                  >
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-slate-300">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your project, timeline, and budget..."
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all text-white placeholder-slate-500 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Initiate Contact</span>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>
                
                <p className="text-slate-400 text-xs text-center">
                  By submitting, you agree to our Privacy Policy. We respect your data.
                </p>
              </form>
            </div>
          </div>
          
          {/* Mobile instructions */}
          {isMobile && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-blue-200/80 text-xs text-center">
                💡 Tap on email/phone to reveal contact information
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;