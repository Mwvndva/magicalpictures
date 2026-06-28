import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Clock, Mail, MapPin, Phone, Shield, User, Wallet } from 'lucide-react';
import { toast } from 'sonner';

const BookingSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    location: '',
    guests: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Send booking details to Formspree
    fetch('https://formspree.io/f/xjgpvjvq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        _replyto: formData.email,
        _subject: `New Booking Request: ${formData.eventType} on ${formData.eventDate}`,
      }),
    })
      .then(response => response.json())
      .then(data => {
        toast.success('Booking request sent!', {
          description: 'We will review your request and get back to you soon.',
        });
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          eventTime: '',
          location: '',
          guests: '',
          message: ''
        });
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Booking failed', {
          description: 'Connection error. Please try again later.',
        });
      });
  };

  const eventTypes = [
    'Wedding',
    'Corporate Event',
    'Music Video',
    'Commercial',
    'Documentary',
    'Private Event',
    'Other'
  ];

  return (
    <section className="py-8 md:py-10 bg-black text-white w-full">
      <div className="mx-auto w-full max-w-6xl px-4">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wide mb-3">
            Book a Session
          </h2>
          <motion.div
            className="w-16 h-0.5 bg-yellow-500 mx-auto mb-5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <p className="font-body text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Let's create something amazing together. Fill out the form below to book your session.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto bg-zinc-950/45 rounded-lg overflow-hidden border border-zinc-800">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Booking Form */}
            <div className="p-4 sm:p-5 lg:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Booking Request</h3>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-1">
                    Type of Event *
                  </label>
                  <div className="relative">
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-zinc-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm text-white appearance-none"
                      required
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type.toLowerCase().replace(' ', '-')}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-300 mb-1">
                      Event Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-zinc-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm text-white"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="eventTime" className="block text-sm font-medium text-gray-300 mb-1">
                      Event Time *
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="eventTime"
                        name="eventTime"
                        value={formData.eventTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-zinc-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm text-white"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                    Event Location *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm text-white"
                      placeholder="Venue name and address"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm text-white"
                        placeholder="John Doe"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm text-white"
                        placeholder="your@email.com"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 bg-zinc-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm text-white"
                        placeholder="+254 790 108410"
                        required
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-300 mb-1">
                      Expected Guests
                    </label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-zinc-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm text-white"
                      placeholder="Approximate number"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm text-white"
                    placeholder="Tell us more about your event..."
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2.5 px-5 rounded-md transition-colors duration-300 flex items-center justify-center text-sm"
                  >
                    <span>Send Booking Request</span>
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Booking Info */}
            <div className="bg-yellow-600 p-4 sm:p-5 lg:p-6 text-white">
              <div className="h-full flex flex-col">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Booking Information</h3>

                <div className="space-y-5 mb-7">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-yellow-500/20 p-2 rounded-full">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium">Response Time</h4>
                      <p className="text-sm text-yellow-100">We typically respond within 24 hours to confirm your booking.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-yellow-500/20 p-2 rounded-full">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium">Availability</h4>
                      <p className="text-sm text-yellow-100">Weekends book up quickly, so please plan in advance. Weekday bookings receive a 10% discount.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-yellow-500/20 p-2 rounded-full">
                      <Wallet className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium">Pricing</h4>
                      <p className="text-sm text-yellow-100">Pricing varies based on event type, duration, and requirements. We'll provide a custom quote after reviewing your details.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-yellow-400/30">
                  <h4 className="text-base font-medium mb-3">Need immediate assistance?</h4>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-yellow-200 mr-3" />
                    <span className="text-yellow-100 text-base font-medium">+254 790 108410</span>
                  </div>
                  <p className="text-yellow-100 text-sm mt-1">Available 24/7 for urgent inquiries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
