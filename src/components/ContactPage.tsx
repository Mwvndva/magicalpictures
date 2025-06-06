export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-white uppercase tracking-wider">
          CONTACT US
        </h1>
        <div className="mt-12 max-w-2xl mx-auto text-gray-300 text-lg md:text-xl">
          <p className="mb-6">Ready to bring your vision to life? Let's create something amazing together.</p>
          <div className="space-y-4">
            <p>Email: <a href="mailto:info@magicallens.com" className="text-yellow-400 hover:underline">info@magicallens.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="text-yellow-400 hover:underline">+1 (234) 567-890</a></p>
            <p>Based in Los Angeles, CA</p>
          </div>
          <div className="mt-12">
            <a 
              href="mailto:info@magicallens.com" 
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-colors duration-300 text-lg"
            >
              Send Us a Message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
