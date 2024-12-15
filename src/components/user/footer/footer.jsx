import React, { useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {

  

  useEffect(() => {
    // Setting the chatbot configuration
    window.embeddedChatbotConfig = {
      chatbotId: "twF2p4ovBF7eHu3CcXywR",
      domain: "www.chatbase.co"
    };

    // Dynamically loading the external script
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.async = true;
    script.defer = true;
    script.setAttribute('chatbotId', "twF2p4ovBF7eHu3CcXywR");
    script.setAttribute('domain', "www.chatbase.co");

    document.body.appendChild(script);

    return () => {
      // This is the code for cleaning up the script whem the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-white py-16 text-black border-t border-pink-200">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
      <div className="flex flex-col items-center md:items-start">
        <h4 className="text-3xl font-extrabold text-pink-800 mb-4">SaiFashionZone by Raiba</h4>
        <p className="text-gray-600 mb-4 text-center md:text-left">
          Your one-stop destination for thoughtful and unique gifts.
        </p>
        <div className="flex space-x-6 text-3xl mt-4">
          <FaFacebook className="text-pink-600 hover:text-pink-800 transition cursor-pointer" />
          <FaInstagram className="text-pink-600 hover:text-pink-800 transition cursor-pointer" />
          <FaTwitter className="text-pink-600 hover:text-pink-800 transition cursor-pointer" />
        </div>
      </div>
      <div className="text-center md:text-right">
        <h5 className="text-2xl font-bold text-pink-800 mb-4">Contact Us</h5>
        <p className="text-gray-600">
          3181 Street Name, City, India
          <br />
          Email: support@merabestie.com
          <br />
          Phone: +91 1234567890
        </p>
      </div>
    </div>
    <script src="/js/jquery-3.3.1.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script src="/js/jquery.magnific-popup.min.js"></script>
<script src="/js/jquery-ui.min.js"></script>
<script src="/js/mixitup.min.js"></script>
<script src="/js/jquery.countdown.min.js"></script>
<script src="/js/jquery.slicknav.js"></script>
<script src="/js/owl.carousel.min.js"></script>
<script src="/js/jquery.nicescroll.min.js"></script>
<script src="/js/main.js"></script>

  </footer>
  );
};

export default Footer;