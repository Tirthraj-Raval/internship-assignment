import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

import Navbar from "../../components/user/navbar/navbar";
import Footer from "../../components/user/footer/footer";

// Scroll Progress Bar Component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScroll / scrollHeight) * 100);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <motion.div
      style={{ scaleX: scrollProgress / 100 }}
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
    />
  );
};

const Banner = () => {
  const banners = [
    {
      img: 'img/banner/banner-1.jpg',
      title: 'The Chloe Collection',
      subtitle: 'The Project Jacket',
    },
    {
      img: 'img/banner/banner-2.jpg',
      title: 'The Summer Collection',
      subtitle: 'Tropical Vibes',
    },
    {
      img: 'img/banner/banner-3.jpg',
      title: 'The Winter Collection',
      subtitle: 'Cozy for Cold Days',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  // Define responsive styles
  const isMobile = window.innerWidth <= 768;

  const bannerStyles = {
    height: isMobile ? '300px' : '500px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${banners[currentIndex].img})`,
    position: 'relative',
  };

  const textStyles = {
    position: 'absolute',
    top: isMobile ? '40%' : '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
    width: isMobile ? '90%' : 'auto',
  };

  const spanStyles = {
    fontSize: isMobile ? '14px' : '18px',
    color: '#ca1515',
    textTransform: 'uppercase',
  };

  const headingStyles = {
    fontSize: isMobile ? '36px' : '80px',
    color: '#111111',
    fontFamily: '"Cookie", cursive',
    marginBottom: '15px',
  };

  const buttonStyles = {
    fontSize: isMobile ? '1rem' : '1.2rem',
    padding: isMobile ? '10px 20px' : '12px 24px',
  };

  const carouselStyles = {
    textAlign: 'center',
    padding: isMobile ? '80px 0 0' : '150px 0 0',
  };

  const owlDotsStyles = {
    position: 'absolute',
    left: '0',
    top: isMobile ? '260px' : '430px',
    width: '100%',
    textAlign: 'center',
  };

  return (
    <section style={bannerStyles} className="mb-10">
      <div style={textStyles}>
        <span style={spanStyles}>{banners[currentIndex].title}</span>
        <h1 style={headingStyles}>{banners[currentIndex].subtitle}</h1>
        <a
          href="/shop"
          className="text-center py-2 px-4 font-medium text-white bg-gradient-to-r from-pink-500 to-indigo-500 
            rounded-md shadow-sm hover:from-pink-400 hover:to-indigo-400 transition-all"
          style={buttonStyles}
        >
          Shop Now
        </a>
      </div>

      <div style={carouselStyles} className="banner__slider owl-carousel">
        <div style={owlDotsStyles} className="owl-dots">
          {/* Dots are managed by Owl Carousel */}
        </div>
      </div>
    </section>
  );
};

const products = [
  {
    id: 1,
    name: 'Buttons tweed blazer',
    price: 59.0,
    image: '/img/product/product-1.jpg',
    label: 'New',
    labelColor: 'red',
    oldPrice: null,
    category: 'women',
  },
  {
    id: 2,
    name: 'Flowy striped skirt',
    price: 49.0,
    image: '/img/product/product-2.jpg',
    label: null,
    labelColor: null,
    oldPrice: null,
    category: 'men',
  },
  {
    id: 3,
    name: 'Cotton T-Shirt',
    price: 59.0,
    image: '/img/product/product-3.jpg',
    label: 'Out of stock',
    labelColor: 'gray',
    oldPrice: null,
    category: 'accessories',
  },
  {
    id: 4,
    name: 'Slim striped pocket shirt',
    price: 59.0,
    image: '/img/product/product-4.jpg',
    label: null,
    labelColor: null,
    oldPrice: null,
    category: 'cosmetic',
  },
  {
    id: 5,
    name: 'Fit micro corduroy shirt',
    price: 59.0,
    image: '/img/product/product-5.jpg',
    label: null,
    labelColor: null,
    oldPrice: null,
    category: 'kid',
  },
  {
    id: 6,
    name: 'Tropical Kimono',
    price: 49.0,
    image: '/img/product/product-6.jpg',
    label: 'Sale',
    labelColor: 'orange',
    oldPrice: 59.0,
    category: 'women men kid accessories cosmetic',
  },
  {
    id: 7,
    name: 'Contrasting sunglasses',
    price: 59.0,
    image: '/img/product/product-7.jpg',
    label: null,
    labelColor: null,
    oldPrice: null,
    category: 'women men kid accessories cosmetic',
  },
  {
    id: 8,
    name: 'Water resistant backpack',
    price: 49.0,
    image: '/img/product/product-8.jpg',
    label: 'Sale',
    labelColor: 'orange',
    oldPrice: 59.0,
    category: 'women men kid accessories cosmetic',
  },
];

const ProductSection = () => {
  return (
    <section className="product spad flex justify-center">
  <div className="container">
    <div className="row">
      <div className="col-lg-4 col-md-4">
        <div className="section-title">
          <h2 className="text-5xl flex justify-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
            New Products
          </h2>
          <p className="text-gray-700 mt-4 flex justify-center">
            Give yourself a stylish look with our latest collection.
          </p>
        </div>
      </div>
      <div className="col-lg-8 col-md-8">
        <ul className="filter__controls flex flex-wrap justify-center gap-4">
          <li className="active cursor-pointer" data-filter="*">All</li>
          <li data-filter=".women" className="cursor-pointer">Women’s</li>
          <li data-filter=".men" className="cursor-pointer">Men’s</li>
          <li data-filter=".kid" className="cursor-pointer">Kid’s</li>
          <li data-filter=".accessories" className="cursor-pointer">Accessories</li>
          <li data-filter=".cosmetic" className="cursor-pointer">Cosmetics</li>
        </ul>
      </div>
    </div>
    <div className="row property__gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {[
        {
          image: "/img/product/product-1.jpg",
          label: "New",
          title: "Buttons tweed blazer",
          price: "$59.0",
          rating: 5,
          link: "/shop",
        },
        {
          image: "/img/product/product-2.jpg",
          title: "Flowy striped skirt",
          price: "$49.0",
          rating: 5,
          link: "/shop",
        },
        {
          image: "/img/product/product-3.jpg",
          label: "Out of stock",
          labelColor: "gray",
          title: "Cotton T-Shirt",
          price: "$59.0",
          rating: 5,
          link: "/shop",
        },
        {
          image: "/img/product/product-4.jpg",
          title: "Slim striped pocket shirt",
          price: "$59.0",
          rating: 5,
          link: "/shop",
        },
        {
          image: "/img/product/product-5.jpg",
          title: "Fit micro corduroy shirt",
          price: "$59.0",
          rating: 5,
          link: "/shop",
        },
        {
          image: "/img/product/product-6.jpg",
          label: "Sale",
          labelColor: "orange",
          title: "Tropical Kimono",
          price: "$49.0",
          originalPrice: "$59.0",
          rating: 5,
          link: "/shop",
        },
        {
          image: "/img/product/product-7.jpg",
          title: "Contrasting sunglasses",
          price: "$59.0",
          rating: 5,
          link: "/shop",
        },
        {
          image: "/img/product/product-8.jpg",
          label: "Sale",
          labelColor: "orange",
          title: "Water resistant backpack",
          price: "$49.0",
          originalPrice: "$59.0",
          rating: 5,
          link: "/shop",
        },
      ].map((product, index) => (
        <div key={index} className="col-lg-3 col-md-4 col-sm-6 mix" style={{ flex: "1 0 22%" }}>
          <div className="product__item">
            <div
              className="product__item__pic relative"
              style={{
                backgroundImage: `url(${product.image})`,
                width: "100%",
                height: "200px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {product.label && (
                <div
                  className="label"
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: product.labelColor || "red",
                    color: "white",
                    padding: "5px 10px",
                    fontSize: "14px",
                  }}
                >
                  {product.label}
                </div>
              )}
            </div>
            <div className="product__item__text" style={{ padding: "15px" }}>
              <h6>
                <a href="#">{product.title}</a>
              </h6>
              <div className="rating flex gap-1 text-yellow-500">
                {Array.from({ length: product.rating }).map((_, starIndex) => (
                  <i key={starIndex} className="fa fa-star"></i>
                ))}
              </div>
              <div className="product__price">
                {product.price}{" "}
                {product.originalPrice && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                      marginLeft: "5px",
                    }}
                  >
                    {product.originalPrice}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <a
                className="text-normal font-medium hover:text-slate-400 transition duration-300 ease-in-out transform hover:scale-105"
                href={product.link}
              >
                SHOP NOW
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};




const DiscountSection = () => {
  // Define the fixed target date
  const targetDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000); // 30 days, 18 hours from now

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }} className="mb-20">
      <div className="container" style={{ width: '100%' }}>
        <div className="row" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
          <div className="col-lg-6 p-0" style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
            <div className="discount__pic">
              {/* Add an image here if needed */}
            </div>
          </div>
          <div
            className="col-lg-6 p-0"
            style={{
              flex: 1,
              background: isMobile ? '#ffffff' : '#f4f4f4',
              padding: isMobile ? '40px 20px' : '75px 90px 50px',
              textAlign: 'center',
            }}
          >
            <div className="discount__text">
              <div
                style={{
                  position: 'relative',
                  marginBottom: isMobile ? '40px' : '60px',
                  textAlign: 'center',
                }}
              >
                {/* The grey circle */}
                <div
                  style={{
                    position: 'absolute',
                    left: isMobile ? '50%' : '50%',
                    top: isMobile ? '-30px' : '-38px',
                    height: isMobile ? '120px' : '183px',
                    width: isMobile ? '120px' : '183px',
                    background: '#e0e0e0',
                    content: "''",
                    borderRadius: '50%',
                    zIndex: '-1',
                    marginLeft: isMobile ? '-60px' : '-91.5px',
                  }}
                />
                <span style={{ fontSize: '12px', color: '#111111', fontWeight: '500', textTransform: 'uppercase' }}>Discount</span>
                <h2 style={{ fontSize: isMobile ? '40px' : '60px', color: '#ca1515', fontFamily: '"Cookie", cursive', lineHeight: '46px', marginBottom: '10px' }}>
                  Summer 2024
                </h2>
                <h5 style={{ color: '#ca1515', fontWeight: '700' }}>
                  <span style={{ fontSize: '14px', color: '#111111', marginRight: '4px' }}>Sale</span> 50%
                </h5>
              </div>
              <div id="countdown-time" style={{ textAlign: 'center', marginBottom: '10px' }}>
                <div style={{ marginBottom: '15px', float: isMobile ? 'none' : 'left', width: isMobile ? 'auto' : '25%' }}>
                  <span style={{ fontSize: '30px', fontWeight: '600', color: '#111111' }}>{timeLeft.days}</span>
                  <p style={{ color: '#111111', marginBottom: '0', fontWeight: '500' }}>Days</p>
                </div>
                <div style={{ marginBottom: '15px', float: isMobile ? 'none' : 'left', width: isMobile ? 'auto' : '25%' }}>
                  <span style={{ fontSize: '30px', fontWeight: '600', color: '#111111' }}>{timeLeft.hours}</span>
                  <p style={{ color: '#111111', marginBottom: '0', fontWeight: '500' }}>Hours</p>
                </div>
                <div style={{ marginBottom: '15px', float: isMobile ? 'none' : 'left', width: isMobile ? 'auto' : '25%' }}>
                  <span style={{ fontSize: '30px', fontWeight: '600', color: '#111111' }}>{timeLeft.minutes}</span>
                  <p style={{ color: '#111111', marginBottom: '0', fontWeight: '500' }}>Minutes</p>
                </div>
                <div style={{ marginBottom: '15px', float: isMobile ? 'none' : 'left', width: isMobile ? 'auto' : '25%' }}>
                  <span style={{ fontSize: '30px', fontWeight: '600', color: '#111111' }}>{timeLeft.seconds}</span>
                  <p style={{ color: '#111111', marginBottom: '0', fontWeight: '500' }}>Seconds</p>
                </div>
              </div>
              <a
                style={{
                  fontSize: '14px',
                  color: '#111111',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  position: 'relative',
                  padding: '0 0 3px',
                  display: 'inline-block',
                }}
                href="#"
              >
                Shop now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out-cubic",
      once: true,
    });
  }, []);

  const CategoriesSection = () => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const updateView = () => {
        setIsMobile(window.innerWidth <= 1200); // Adjust the width threshold if needed
      };
  
      updateView(); // Check on component mount
      window.addEventListener('resize', updateView); // Check on window resize
  
      return () => window.removeEventListener('resize', updateView); // Cleanup
    }, []);
  
    if (isMobile) {
      return (
        <section
  className="categories"
  style={{
    overflow: "hidden",
    marginTop: "20px",
    width: "100%",
    height: "auto",
  }}
>
  <div
    className="container-fluid"
    style={{
      padding: "0",
      display: "flex",
      flexDirection: "column", // Default to stacked layout for smaller screens
    }}
  >
    {/* Left half with category 1 */}
    <div
      className="categories__left ml-0 md:ml-5"
      style={{
        width: "100%", // Full width for mobile
        height: "300px", // Adjust height
        backgroundImage: "url(img/categories/category-1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "15px",
        marginBottom: "20px", // Add spacing between sections
      }}
    >
      <div
        className="categories__text col-lg-6 p-0"
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          color: "#fff",
          textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
          maxWidth: "90%", // Adjust width for mobile
        }}
      >
        <h1
          style={{
            fontFamily: "'Cookie', cursive",
            fontSize: "36px", // Smaller font for mobile
            marginBottom: "10px",
          }}
        >
          Women’s fashion
        </h1>
        <p style={{ marginBottom: "15px", fontSize: "14px" }}>
          Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-
          unt labore edolore magna aliquapendisse ultrices gravida.
        </p>
        <a
          href="/shop"
          style={{
            fontSize: "14px",
            color: "#fff",
            textTransform: "uppercase",
            fontWeight: "600",
            position: "relative",
            padding: "0 0 3px",
            display: "inline-block",
            letterSpacing: "1px",
            borderBottom: "2px solid transparent",
            transition: "border-bottom 0.3s ease",
          }}
        >
          Shop now
        </a>
      </div>
    </div>

    {/* Other categories */}
    <div
      className="categories__right"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr", // Single column for mobile
        gap: "20px", // Add spacing between items
      }}
    >
      {[
        { title: "Men’s fashion", img: "category-2.jpg", items: 358 },
        { title: "Kid’s fashion", img: "category-3.jpg", items: 273 },
        { title: "Cosmetics", img: "category-4.jpg", items: 159 },
        { title: "Accessories", img: "category-5.jpg", items: 792 },
      ].map((category, idx) => (
        <div
          key={idx}
          className="categories__item"
          style={{
            backgroundImage: `url(img/categories/${category.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "250px",
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            position: "relative",
          }}
        >
          <div
            className="categories__text"
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              color: "#fff",
              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
            }}
          >
            <h4 style={{ fontSize: "20px", fontWeight: "700" }}>
              {category.title}
            </h4>
            <p style={{ fontSize: "14px", marginBottom: "10px" }}>
              {category.items} items
            </p>
            <a
              href="/shop"
              style={{
                fontSize: "12px",
                color: "#fff",
                textTransform: "uppercase",
                fontWeight: "600",
                position: "relative",
                padding: "0 0 3px",
                display: "inline-block",
                letterSpacing: "1px",
                borderBottom: "2px solid transparent",
                transition: "border-bottom 0.3s ease",
              }}
            >
              Shop now
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      );
    }
  
    // Desktop layout remains the same
    return (
      <section className="categories" style={{ overflow: 'hidden', marginTop: '10px', width: '100%', height: '100vh', marginTop: '50px' }}>
  <div className="container-fluid" style={{ padding: '0', display: 'flex', height: '100%' }}>
    {/* Left half with category 1 */}
    <div className="categories__left ml-5" style={{
      width: '50%', 
      height: '100%', 
      backgroundImage: 'url(img/categories/category-1.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      position: 'relative',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
      borderRadius: '15px',
      overflow: 'hidden'
    }}>
      <div className="categories__text col-lg-6 p-0" style={{
        position: 'absolute',
        bottom: '30px',
        left: '30px',
        color: '#fff',
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
        maxWidth: '60%',
        marginBottom: '150px'
      }}>
        <h1 style={{ fontFamily: "'Cookie', cursive", fontSize: '50px', marginBottom: '15px' }}>
          Women’s fashion
        </h1>
        <p style={{ marginBottom: '20px', fontSize: '18px'}}>
          Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-unt labore edolore magna aliquapendisse ultrices gravida.
        </p>
        <a href="/shop" style={{
            fontSize: '18px', 
            color: '#fff', 
            textTransform: 'uppercase', 
            fontWeight: '600', 
            position: 'relative', 
            padding: '0 0 3px', 
            display: 'inline-block', 
            letterSpacing: '1px',
            borderBottom: '2px solid transparent',
            transition: 'border-bottom 0.3s ease',
          }}>
            Shop now
          </a>
      </div>
    </div>

    {/* Right half with 4 categories */}
    <div className="categories__right" style={{
      width: '50%', 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)', 
      gridTemplateRows: 'repeat(2, 1fr)', 
      gap: '10px',
      padding: '10px'
    }}>
      {/* Category 2 */}
      <div className="categories__item col-lg-6 p-0" 
           style={{
             backgroundImage: 'url(img/categories/category-2.jpg)', 
             backgroundSize: 'cover', 
             backgroundPosition: 'center', 
             height: '100%', 
             borderRadius: '15px', 
             boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
             position: 'relative',
             transition: 'transform 0.3s ease'
           }}
           onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} >
        <div className="categories__text" style={{
          position: 'absolute', 
          bottom: '20px', 
          left: '20px', 
    
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)'
        }}>
          <h4 style={{ fontSize: '24px', fontWeight: '700' }}>Men’s fashion</h4>
          <p style={{ fontSize: '16px', marginBottom: '120px' }}>358 items</p>
          <a href="/shop" style={{
            fontSize: '14px', 
            color: '#fff', 
            textTransform: 'uppercase', 
            fontWeight: '600', 
            position: 'relative', 
            padding: '0 0 3px', 
            display: 'inline-block', 
            letterSpacing: '1px',
            borderBottom: '2px solid transparent',
            transition: 'border-bottom 0.3s ease',
          }}>
            Shop now
          </a>
        </div>
      </div>

      {/* Category 3 */}
      <div className="categories__item" 
           style={{
             backgroundImage: 'url(img/categories/category-3.jpg)', 
             backgroundSize: 'cover', 
             backgroundPosition: 'center', 
             height: '100%', 
             borderRadius: '15px', 
             boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
             position: 'relative',
             transition: 'transform 0.3s ease'
           }}
           onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} >
        <div className="categories__text" style={{
          position: 'absolute', 
          bottom: '20px', 
          left: '20px', 
          color: '#fff',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)'
        }}>
          <h4 style={{ fontSize: '24px', fontWeight: '700' }}>Kid’s fashion</h4>
          <p style={{ fontSize: '16px', marginBottom: '120px' }}>273 items</p>
          <a href="/shop" style={{
            fontSize: '14px', 
            color: '#fff', 
            textTransform: 'uppercase', 
            fontWeight: '600', 
            position: 'relative', 
            padding: '0 0 3px', 
            display: 'inline-block', 
            letterSpacing: '1px',
            borderBottom: '2px solid transparent',
            transition: 'border-bottom 0.3s ease'
          }}>
            Shop now
          </a>
        </div>
      </div>

      {/* Category 4 */}
      <div className="categories__item" 
           style={{
             backgroundImage: 'url(img/categories/category-4.jpg)', 
             backgroundSize: 'cover', 
             backgroundPosition: 'center', 
             height: '100%', 
             borderRadius: '15px', 
             boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
             position: 'relative',
             transition: 'transform 0.3s ease'
           }}
           onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} >
        <div className="categories__text" style={{
          position: 'absolute', 
          bottom: '20px', 
          left: '20px', 
          color: '#fff',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)'
        }}>
          <h4 style={{ fontSize: '24px', fontWeight: '700' }}>Cosmetics</h4>
          <p style={{ fontSize: '16px', marginBottom: '120px' }}>159 items</p>
          <a href="/shop" style={{
            fontSize: '14px', 
            color: '#fff', 
            textTransform: 'uppercase', 
            fontWeight: '600', 
            position: 'relative', 
            padding: '0 0 3px', 
            display: 'inline-block', 
            letterSpacing: '1px',
            borderBottom: '2px solid transparent',
            transition: 'border-bottom 0.3s ease'
          }}>
            Shop now
          </a>
        </div>
      </div>

      {/* Category 5 */}
      <div className="categories__item" 
           style={{
             backgroundImage: 'url(img/categories/category-5.jpg)', 
             backgroundSize: 'cover', 
             backgroundPosition: 'center', 
             height: '100%', 
             borderRadius: '15px', 
             boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
             position: 'relative',
             transition: 'transform 0.3s ease'
           }}
           onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} >
        <div className="categories__text" style={{
          position: 'absolute', 
          bottom: '20px', 
          left: '20px', 
          color: '#fff',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)'
        }}>
          <h4 style={{ fontSize: '24px', fontWeight: '700' }}>Accessories</h4>
          <p style={{ fontSize: '16px', marginBottom: '120px' }}>792 items</p>
          <a href="/shop" style={{
            fontSize: '14px', 
            color: '#fff', 
            textTransform: 'uppercase', 
            fontWeight: '600', 
            position: 'relative', 
            padding: '0 0 3px', 
            display: 'inline-block', 
            letterSpacing: '1px',
            borderBottom: '2px solid transparent',
            transition: 'border-bottom 0.3s ease'
          }}>
            Shop now
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
    );
  };
  

  const productCategories = [
    {
      img: "/img/collections/women_wear_image.jpg",
      title: "Women's Wear",
      description: "Elevate your personality with our premium clothes.",
    },
    {
      img: "/img/collections/men_wear_image.jpg",
      title: "Men's Wear",
      description: "Keep up with the latest trends in men's wear.",
    },
    {
      img: "/img/collections/kid_wear_image.jpg",
      title: "Kid's Wear",
      description: "Transform spaces with our sophisticated decor books.",
    },
  ];

  return (
    <>
    <head>
      
    </head>
      <Helmet>
        <title>SaiFashionZone | Latest Fashion Trends </title>
        <meta
          name="description"
          content="Discover unique gifts and thoughtful collections for every occasion."
        />
        <meta name="description" content="SaiFashionZone by Raiba" />
    <meta name="keywords" content="Ashion, unica, creative, html" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        {/* Google Fonts */}
  <link
    href="https://fonts.googleapis.com/css2?family=Cookie&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />

  {/* External CSS Styles */}
  <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />
  <link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />
  <link rel="stylesheet" href="css/elegant-icons.css" type="text/css" />
  <link rel="stylesheet" href="css/jquery-ui.min.css" type="text/css" />
  <link rel="stylesheet" href="css/magnific-popup.css" type="text/css" />
  <link rel="stylesheet" href="css/owl.carousel.min.css" type="text/css" />
  <link rel="stylesheet" href="css/slicknav.min.css" type="text/css" />
  <link rel="stylesheet" href="css/style.css" type="text/css" />
      </Helmet>
      <ScrollProgress />
      <Navbar />
      <div className="w-full bg-gray-100 overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center">
  <div className="absolute inset-0 z-0">
    <motion.img
      src="https://cdn.wallpapersafari.com/89/8/lybQgH.jpg"
      alt="Elegant Gift Background"
      className="w-full h-full object-cover filter brightness-60"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    />
  </div>
  <motion.div
    className="relative z-10 text-center px-4"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <div className="bg-white/20 backdrop-blur-lg p-8 md:p-16 rounded-3xl shadow-2xl">
      <h1 className="mb-6 text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-500">
        Style Meets Comfort
      </h1>
      <p className="mb-8 text-xl text-white max-w-3xl mx-auto">
        Transforming ordinary moments into extraordinary memories with our curated collections.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Link to="/about">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 rounded-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 shadow-lg"
          >
            Explore Our Story
          </motion.button>
        </Link>
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 rounded-full text-white bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 hover:opacity-90 shadow-lg"
          >
            Shop Now
          </motion.button>
        </Link>
      </div>
    </div>
  </motion.div>
</section>


        <section className="pt-10">
        <h2 className="text-5xl flex justify-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
          Select from product categories
        </h2>
        <p className="text-gray-700 mt-4 flex justify-center">
          Choose from a wide range of categories to find the perfect product for you.
              </p>
        </section>

        <CategoriesSection />
        

        <ProductSection />


        {/* Product Categories Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto text-center">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
                Explore Our Collections
              </h2>
              <p className="text-gray-700 mt-4">
                Discover meticulously crafted categories designed to inspire.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {productCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className="group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={category.img}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {category.title}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center mt-10">
          <a href="/shop" className="text-center py-2 px-4 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-indigo-500 
            rounded-md shadow-sm hover:from-pink-400 hover:to-indigo-400 transition-all">Unlock Latest Trends</a>
          </div>
        </section>
        
       
              <Banner />

              <DiscountSection />
      
  {/* Vision Section with Modern Overlay Design */}
    <section className="relative min-h-[80vh] flex items-center" data-aos="fade-up">
      <div className="absolute inset-0 z-0">
        <img
          src="https://tse3.mm.bing.net/th?id=OIP.RNJBshhRJcxPoSt2Slj5bAHaEK&pid=Api&P=0&h=180"
          alt="Vision Background"
          className="w-full h-full object-cover filter brightness-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="bg-white/20 backdrop-blur-md border border-white/20 p-12 md:p-16 rounded-3xl max-w-2xl mx-auto text-center shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Our Vision
          </h2>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed relative z-10">
            We believe in creating more than just products – we craft experiences that connect hearts, 
            celebrate relationships, and turn ordinary moments into extraordinary memories. 
            Our mission is to be your partner in expressing love, appreciation, and thoughtfulness.
          </p>
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 px-12 py-4 rounded-full uppercase text-sm tracking-wider font-semibold shadow-2xl transition-all transform duration-300"
            >
              Our Journey
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>


        

        <Footer />
      </div>

    </>
  );
};

export default HomePage;