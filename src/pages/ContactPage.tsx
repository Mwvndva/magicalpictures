import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import PageTransition from '../components/PageTransition';
import { localBusinessJsonLd } from '../lib/seo';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-yellow-500" />,
      title: 'Our Location',
      description: 'Nairobi, Kenya'
    },
    {
      icon: <Phone className="h-6 w-6 text-yellow-500" />,
      title: 'Phone Number',
      description: '+254 790 108410',
      link: 'tel:+254790108410',
      linkText: 'Call Now'
    },
    {
      icon: <Mail className="h-6 w-6 text-yellow-500" />,
      title: 'Email Address',
      description: 'talktomagicalpictures@gmail.com',
      link: 'mailto:talktomagicalpictures@gmail.com',
      linkText: 'Send Email'
    },
    {
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      title: 'Working Hours',
      description: 'Monday - Friday: 9:00 AM - 6:00 PM\nWeekend: By appointment only',
      link: '/booking',
      linkText: 'Book an Appointment'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center">
        <PageMeta
          title="Contact a Nairobi Photography & Video Production Company"
          description="Contact Magical Pictures Productions in Nairobi, Kenya for photography, videography, corporate video production, event coverage, commercials, live streaming, and drone coverage."
          canonical="/contact"
          keywords={[
            'contact photographer Nairobi',
            'video production company Nairobi contact',
            'videographer Nairobi phone',
            'Magical Pictures Productions contact',
          ]}
          jsonLd={localBusinessJsonLd}
        />

        <section className="relative w-full pt-20 pb-8 md:pt-28 md:pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-0 w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 w-full" />
          </div>

          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 relative z-10 text-center">
            <motion.h1
              className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-100 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Get In Touch
            </motion.h1>
            <motion.div
              className="w-16 h-0.5 bg-yellow-500 mx-auto mb-5"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.7 }}
            />
            <motion.p
              className="text-sm sm:text-base text-gray-300 mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              We'd love to hear from you. Reach out to us for collaborations, inquiries, or just to say hello!
            </motion.p>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-black">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-zinc-950/35 rounded-lg p-4 sm:p-5 md:p-6 border border-zinc-800"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-6 text-center">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-1 p-2.5 rounded-lg bg-zinc-900 group-hover:bg-yellow-500/10 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-100 mb-1.5">{item.title}</h3>
                      <p className="text-sm text-gray-300 mb-2 whitespace-pre-line leading-relaxed">{item.description}</p>
                      {item.link && (
                        <a
                          href={item.link}
                          className="text-yellow-500 hover:text-yellow-400 font-medium inline-flex items-center transition-colors duration-300"
                        >
                          {item.linkText}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-100 mb-5 font-heading">Follow Us</h3>
                <div className="flex space-x-7">
                  <a
                    href="https://www.facebook.com/share/1BqkE5K5FL/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/magicalpkenya?s=21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                    aria-label="X"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.3174 10.7749L19.145 3H17.7646L12.7039 9.88256L8.66193 3H3.2002L9.33991 12.8955L3.2002 21H4.58096L9.98858 13.7878L14.3135 21H19.7752L13.3171 10.7749H13.3174ZM10.822 12.9738L9.92872 11.5136L4.86499 4.16971H7.84254L11.9462 10.7289L12.8395 12.1891L18.2098 19.8805H15.2323L10.8217 12.9741L10.822 12.9738Z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/magical_pictures_productions?igsh=MXdlcHEwY2lyb3ZtbQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.976.045-1.505.207-1.858.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/@magicalpicturesproductions5452?si=HQDux0VALQJgyQX6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-10 md:py-12 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 text-center flex flex-col items-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-100 mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's create something extraordinary together. Get in touch to discuss your next project.
            </p>
            <a
              href="/booking"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2.5 px-6 rounded-full text-sm sm:text-base transition-all duration-300"
            >
              Book a Session
            </a>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
