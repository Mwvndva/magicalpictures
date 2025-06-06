import ContactSection from "../components/ContactSection";
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-3xl text-yellow-500" />,
      title: 'Our Location',
      description: '123 Photography Studio, Creative District, New York, NY 10001',
      link: 'https://maps.google.com',
      linkText: 'View on Map'
    },
    {
      icon: <FaPhone className="text-3xl text-yellow-500" />,
      title: 'Phone Number',
      description: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      linkText: 'Call Now'
    },
    {
      icon: <FaEnvelope className="text-3xl text-yellow-500" />,
      title: 'Email Address',
      description: 'hello@magicallens.com',
      link: 'mailto:hello@magicallens.com',
      linkText: 'Send Email'
    },
    {
      icon: <FaClock className="text-3xl text-yellow-500" />,
      title: 'Working Hours',
      description: 'Monday - Friday: 9:00 AM - 6:00 PM\nWeekend: By appointment only',
      link: '/booking',
      linkText: 'Book an Appointment'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-0 w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 w-full"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Get In Touch
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-yellow-500 mx-auto mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              We'd love to hear from you. Reach out to us for collaborations, inquiries, or just to say hello!
            </motion.p>
          </div>
        </div>
      </section>


      {/* Contact Info & Form */}
      <section className="w-full py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-300 mb-2 whitespace-pre-line">{item.description}</p>
                      <a 
                        href={item.link} 
                        className="text-yellow-500 hover:text-yellow-400 font-medium inline-flex items-center transition-colors duration-300"
                      >
                        {item.linkText}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {['Facebook', 'Instagram', 'Twitter', 'Vimeo'].map((social) => (
                    <a 
                      key={social}
                      href={`https://${social.toLowerCase()}.com`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-800 hover:bg-yellow-500 text-white flex items-center justify-center transition-colors duration-300"
                      aria-label={social}
                    >
                      <span className="sr-only">{social}</span>
                      <span className="text-lg">{social[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900/50 rounded-xl p-8 border border-gray-800"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Send Us a Message
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-lg"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="w-full h-96 relative">
        <div className="absolute inset-0 bg-gray-800">
          {/* Replace with your actual map embed */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <FaMapMarkerAlt className="text-4xl mx-auto mb-4 text-yellow-500" />
              <p>Map Location</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5">
        <div className="container mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's create something extraordinary together. Get in touch to discuss your next project.
          </p>
          <a 
            href="/booking" 
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Book a Session
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
