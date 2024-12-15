import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaFilter, FaSort, FaThLarge, FaList, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Navbar from '../../components/user/navbar/navbar';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from "react-helmet";
import FilterPopup from './FilterPopup'; // Importing the Filter Popup

const Shop = ({ category }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(6);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [isFilterOpen, setIsFilterOpen] = useState(false); // For toggling the filter popup
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortDirection, setSortDirection] = useState('asc'); // Manage sort direction
  const [sortBy, setSortBy] = useState(''); // State to track the sorting criterion

  const categories = [
    { name: 'Women\'s Wear', img: "/img/collections/women_wear_image.jpg" },
    { name: 'Men\'s Wear', img: "/img/collections/men_wear_image.jpg" },
    { name: 'Kid\'s Wear', img: "/img/collections/kid_wear_image.jpg" },
  ];
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from the backend using the 
        const response = await fetch('https://ecommercebackend-8gx8.onrender.com/get-product');
        const data = await response.json();
        if (data.success) {
          const validProducts = data.products.filter(product =>
            product.name && product.price && product.img && product.category && product._id &&
            (product.visibility === "on" || product.visibility === "true")
          );
          setProducts(validProducts);
          setFilteredProducts(validProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
    setLoadMore(6);
  };

  const sortProducts = (sortBy) => {
    let sorted = [...filteredProducts];
    if (sortBy === 'price') {
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^\d.-]/g, '').trim()); // Remove non-numeric characters
        const priceB = parseFloat(b.price.replace(/[^\d.-]/g, '').trim()); // Remove non-numeric characters
        return sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
      });
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return sortDirection === 'asc' ? ratingA - ratingB : ratingB - ratingA;
      });
    }
    setFilteredProducts(sorted);
  };

  const handleSortDirectionToggle = () => {
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const handleLoadMore = () => {
    setLoadMore(prevLoadMore => prevLoadMore + 6);
  };

  const handleShowLess = () => {
    setLoadMore(prevLoadMore => prevLoadMore - 6);
  };

  const addPostToRecentlyViewed = (productId) => {
    var existingEntries = JSON.parse(localStorage.getItem("recently") || '[]');
    if (!existingEntries.includes(productId)) {
      if (existingEntries.length >= 4) {
        existingEntries.shift();
      }
      existingEntries.push(productId);
      localStorage.setItem("recently", JSON.stringify(existingEntries));
    } else {
      console.log(productId + ' already exists');
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1000000]);
    setSortDirection('asc');
    setSortBy('');
    setFilteredProducts(products);
  };

  const handlePriceRangeChange = (e) => {
    const { value } = e.target;
    const range = value.split('-');
    setPriceRange([parseInt(range[0]), parseInt(range[1])]);
  };

  useEffect(() => {
    // Filter based on selected price range
    const filtered = products.filter(product => {
      const price = parseFloat(product.price.replace(/[^\d.-]/g, '').trim());
      return price >= priceRange[0] && price <= priceRange[1];
    });
    setFilteredProducts(filtered);
  }, [priceRange, products]);

  useEffect(() => {
    if (sortBy) {
      sortProducts(sortBy);
    }
  }, [sortBy, sortDirection, filteredProducts]);


  return (
    <>
      <Helmet>
        <title>Shop | Mera Bestie</title>
      </Helmet>
      <div className="bg-gradient-to-b from-pink-50 to-pink-100 min-h-screen">
        <Navbar />

        {/* Hero Section with Refined Design */}
        <section 
          className="relative bg-cover bg-center py-20 text-center"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('src/assets/bg shop.png')",
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 mb-5">Discover Our Curated Collections</h2>
            <p className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed">
              Discover our exclusive collections tailored just for you, with carefully curated products that speak to your style and personality.
            </p>
          </div>
        </section>

        {/* Categories Section with Hover Effects */}
        <div className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl flex justify-center mb-7 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
              Explore Our Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 
                  hover:scale-105 hover:shadow-2xl cursor-pointer 
                  ${selectedCategory === category.name ? 'border-4 border-pink-500' : ''}`}
                onClick={() => filterProducts(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  className="h-56 bg-cover bg-center transition-transform duration-300 transform hover:scale-110"
                  style={{ backgroundImage: `url('${category.img}')` }}
                />
                <div className="p-5 text-center">
                  <h4 className="text-2xl font-bold text-pink-800 mb-2">{category.name}</h4>
                  <p className="text-gray-600">Explore our curated {category.name.toLowerCase()} collection</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter Button */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              className="bg-pink-100 text-pink-800 px-4 py-2 rounded-lg flex items-center"
            >
              <FaFilter className="mr-2" /> Filters
            </button>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaSort className="mr-2 text-pink-800" />
                <select 
                  className="border-pink-300 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-pink-500 transition"
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    {e.target.value === '' && clearFilters()}
                  }}
                >
                  <option value="">Sort By</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {/* Sort Direction Toggle */}
              <button
                onClick={handleSortDirectionToggle}
                className="flex items-center text-pink-800"
              >
                {sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-800'} hover:bg-pink-500 hover:text-white transition`}
                >
                  <FaThLarge />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-800'} hover:bg-pink-500 hover:text-white transition`}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Show Filter Popup */}
        {isFilterOpen && <FilterPopup 
          categories={categories}
          filterProducts={filterProducts} 
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsFilterOpen={setIsFilterOpen}
          clearFilters = {clearFilters}
        />}

        {/* Products Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <AnimatePresence>
            <motion.div
              className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8' : 'grid-cols-1 gap-6'}`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: {
                    delayChildren: 0.2,
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {filteredProducts.slice(0, loadMore).map((product) => (
  <motion.div
    key={product._id}
    className={`relative bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 
      ${viewMode === 'list' ? 'flex items-center space-x-6 p-4' : 'p-5'} 
      hover:scale-105 hover:shadow-lg`}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.4 }
      }
    }}
  >
    {/* Image Section */}
    <div 
      className={`relative overflow-hidden rounded-md ${viewMode === 'grid' && 'aspect-video'} 
        bg-gray-200`}
    >
      <img
        src={product.img}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 
          transform group-hover:scale-110 border-2 border-slate-950"
      />
    </div>

    {/* Image Section for List View */}
<div 
  className={`relative overflow-hidden rounded-md ${viewMode === 'list' && 'w-1/4 h-32'} 
    bg-gray-200`}
>
  <img
    src={product.img}
    alt={product.name}
    className="absolute w-full h-full object-cover transition-transform duration-500 
      transform group-hover:scale-110 border-2 border-slate-950 rounded-md"
  />
</div>


    {/* Product Details */}
    <div className={`flex flex-col justify-between ${viewMode === 'grid' ? 'mt-3 text-center' : 'flex-grow pl-5'}`}>
      {/* Title and Price */}
      <div className="mb-4">
        <h4 className="font-medium text-lg text-gray-800">
          {product.name}
        </h4>

        <div className={`mt-2 flex ${viewMode == "grid" ? 'justify-center' : "justify-start" } items-center space-x-3`}>
          <span className="text-gray-400 line-through text-sm">
            ₹{product.price.split('₹')[1] || 400}
          </span>
          <span className="text-lg font-semibold text-pink-500">
            ₹{product.price.split('₹')[2] || product.price}
          </span>
        </div>
      </div>

      {/* Rating Section */}
      <div className={`flex items-center ${viewMode == "grid" ? 'justify-center' : "justify-start" } space-x-2 text-yellow-500`}>
        {'★'.repeat(Math.floor(product.rating))}
        <span className="text-gray-400 text-sm">
          {'★'.repeat(5 - Math.floor(product.rating))}
        </span>
        <span className="text-gray-500 text-xs">({product.rating})</span>
      </div>

      {/* Action Button */}
      <Link 
        to={`/${product._id}`} 
        className="mt-3"
      >
        <button 
          className="py-2 px-4 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-indigo-500 
            rounded-md shadow-sm hover:from-pink-400 hover:to-indigo-400 transition-all"
          onClick={e => addPostToRecentlyViewed(product._id)}
        >
          View Details
        </button>
      </Link>
    </div>
  </motion.div>
))}

            </motion.div>
          </AnimatePresence>

          <div className="text-center mt-12">
            {loadMore < filteredProducts.length ? (
              <button 
                className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                onClick={handleLoadMore}
              >
                Load More Products
              </button>
            ) : (
              <button 
                className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                onClick={handleShowLess}
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
