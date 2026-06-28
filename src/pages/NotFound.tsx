import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <motion.h1
            className="text-4xl font-bold mb-4 text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            404
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Oops! Page not found
          </motion.p>
          <Link to="/" className="text-yellow-500 hover:text-yellow-400 underline">
            Return to Home
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
