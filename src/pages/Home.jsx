import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NewsletterSignup from "../components/engagement/NewsletterSignup";

const featuredItems = [
  {
    name: "Signature Steak",
    price: "$45",
    image: "/assets/images/pexels-elevate-1269025.jpg",
    description: "Prime cut with our house-made sauce",
    category: "Mains"
  },
  {
    name: "Truffle Pasta",
    price: "$32",
    image: "/assets/images/pexels-vincent-ma-janssen-1310777.jpg",
    description: "Handmade pasta with black truffle",
    category: "Mains"
  },
  {
    name: "Chocolate Soufflé",
    price: "$18",
    image: "/assets/images/pexels-ella-olsson-572949-1640772.jpg",
    description: "Warm chocolate soufflé with vanilla ice cream",
    category: "Desserts"
  }
];

const whatsNew = [
  {
    title: "Summer Tasting Menu",
    image: "/assets/images/pexels-mali-64208.jpg",
    date: "June 1 - August 31",
    description: "Experience our seasonal tasting menu featuring the finest summer ingredients."
  },
  {
    title: "Wine Pairing Event",
    image: "/assets/images/pexels-pixabay-262978.jpg",
    date: "Every Thursday",
    description: "Join our sommelier for an evening of wine exploration and perfect pairings"
  }
];

function Home() {
  const navigate = useNavigate();
  const [showScroll, setShowScroll] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#7b2f3b] via-[#f5e6e8] to-[#53354a] font-sans flex flex-col">
        {/* Hero Section with Video Background */}
        <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/assets/images/pexels-mali-64208.jpg"
          >
            <source src="/assets/videos/3015488-hd_1920_1080_24fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-0" />
          <div className="relative z-10 text-center text-white flex flex-col items-center justify-center w-full px-4">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-6xl md:text-7xl font-serif font-bold drop-shadow-lg mb-4"
            >
              Arevei Restaurant
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-2xl md:text-3xl font-sans mb-8 drop-shadow"
            >
              A Multi-Course Culinary Journey
            </motion.h2>
            <div className="flex flex-col md:flex-row gap-4">
            <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-primary text-white rounded-full shadow-lg text-lg font-bold transition-all duration-200 hover:bg-accent"
              onClick={() => navigate("/reservation")}
            >
                Book a Table
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-white text-primary rounded-full shadow-lg text-lg font-bold transition-all duration-200 hover:bg-gray-100"
                onClick={() => navigate("/menu")}
              >
                View Menu
            </motion.button>
          </div>
          </div>
        </section>

        {/* Featured Items Section */}
        <section className="max-w-7xl mx-auto -mt-20 px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm font-medium bg-primary/90 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                    <span className="text-lg font-bold text-accent">{item.price}</span>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
            </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What's New Section */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <h2 className="text-4xl font-serif font-bold text-center mb-12 text-white">What's New</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatsNew.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
                className="bg-white/90 rounded-2xl shadow-xl overflow-hidden group"
              >
                <div className="relative h-80">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm font-medium mb-2">{item.date}</p>
                    <p className="text-white/90">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Location Section */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Visit Us</h2>
                <div className="space-y-4">
                  <p className="text-lg">
                    <span className="font-bold">Address:</span><br />
                    123 Culinary Street<br />
                    Foodie District, FC 12345
                  </p>
                  <p className="text-lg">
                    <span className="font-bold">Hours:</span><br />
                    Monday - Thursday: 11am - 10pm<br />
                    Friday - Saturday: 11am - 11pm<br />
                    Sunday: 10am - 9pm
                  </p>
                  <p className="text-lg">
                    <span className="font-bold">Contact:</span><br />
                    (123) 456-7890<br />
                    info@arevei.com
                  </p>
                </div>
                <button
                  onClick={() => navigate("/reservation")}
                  className="mt-6 px-8 py-3 bg-primary text-white rounded-full font-semibold shadow hover:bg-accent transition"
                >
                  Make a Reservation
                </button>
              </div>
              <div className="h-96 md:h-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.285888062837!2d-73.9877717845941!3d40.75800057932646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2585501103f19%3A0xb6c7e3f8b0d2621d!2sTimes%20Square%2C%20New%20York%2C%20NY%2010036%2C%20USA!5e0!3m2!1sen!2s!4v1647043087964!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map of Times Square"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Team Section */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-96 md:h-auto">
                <img
                  src="/assets/images/pexels-reneterp-2544829.jpg"
                  alt="Join our team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Join Our Team</h2>
                <p className="text-lg mb-6">
                  We're always looking for passionate individuals to join our culinary family. Whether you're an experienced chef, server, or looking to start your career in hospitality, we'd love to hear from you.
                </p>
            <button
                  onClick={() => navigate("/careers")}
                  className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow hover:bg-accent transition"
            >
                  View Opportunities
            </button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <div className="mt-20 max-w-xl mx-auto">
          <NewsletterSignup />
        </div>

        {/* Footer */}
        <footer className="mt-20 bg-white/90 dark:bg-matte-black/90 border-t border-secondary">
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Newsletter Section */}
            <div className="mb-12 text-center">
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">Stay Connected</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for exclusive offers, special events, and culinary insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-accent transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Restaurant Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold text-primary">Arevei</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A culinary journey through modern American cuisine, where every dish tells a story and every guest becomes family.
                </p>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/menu" className="text-gray-600 hover:text-primary transition-colors">Menu</a>
                  </li>
                  <li>
                    <a href="/reservation" className="text-gray-600 hover:text-primary transition-colors">Reservations</a>
                  </li>
                  <li>
                    <a href="/giftcards" className="text-gray-600 hover:text-primary transition-colors">Gift Cards</a>
                  </li>
                  <li>
                    <a href="/careers" className="text-gray-600 hover:text-primary transition-colors">Careers</a>
                  </li>
                  <li>
                    <a href="/group-dining" className="text-gray-600 hover:text-primary transition-colors">Group Dining</a>
                  </li>
                  <li>
                    <a href="/private-events" className="text-gray-600 hover:text-primary transition-colors">Private Events</a>
                  </li>
                  <li>
                    <a href="/catering" className="text-gray-600 hover:text-primary transition-colors">Catering</a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Contact Us</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>123 Culinary Street<br />Foodie District, FC 12345</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>(123) 456-7890</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@arevei.com</span>
                  </li>
                </ul>
              </div>

              {/* Hours & Additional Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-4">Hours</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between">
                      <span>Monday - Thursday</span>
                      <span>11am - 10pm</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Friday - Saturday</span>
                      <span>11am - 11pm</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>10am - 9pm</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-4">Payment Methods</h3>
                  <div className="flex space-x-2">
                    <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v12h16V6H4zm2 2h12v2H6V8zm0 4h12v2H6v-2z"/>
                    </svg>
                    <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                    <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  &copy; {new Date().getFullYear()} Arevei Restaurant. All rights reserved.
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <a href="/privacy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="/terms" className="text-gray-600 hover:text-primary transition-colors">Terms & Conditions</a>
                  <a href="/accessibility" className="text-gray-600 hover:text-primary transition-colors">Accessibility</a>
                  <a href="/sitemap" className="text-gray-600 hover:text-primary transition-colors">Sitemap</a>
                  <a href="/faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</a>
                  <a href="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </footer>

      {/* Floating Reserve Now Button for Mobile */}
      <button
        onClick={() => navigate("/reservation")}
        className="fixed bottom-6 right-6 z-50 px-6 py-3 bg-primary text-white rounded-full shadow-lg text-lg font-bold transition-all duration-200 hover:bg-accent hover:text-secondary md:hidden"
        aria-label="Reserve Now"
      >
        Reserve Now
      </button>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 px-4 py-2 bg-accent text-white rounded-full shadow-lg text-lg font-bold transition-all duration-200 hover:bg-primary hover:text-secondary"
            aria-label="Scroll to top"
        >
            ↑
        </button>
      )}
      </div>
    </>
  );
}

export default Home; 