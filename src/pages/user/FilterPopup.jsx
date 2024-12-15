import React from 'react';

const FilterPopup = ({ categories, filterProducts, priceRange, setPriceRange, setIsFilterOpen, selectedCategory, clearFilters }) => {
  const handleCategoryChange = (category) => {
    filterProducts(category);
    setIsFilterOpen(false);
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const range = value.split('-');
    setPriceRange([parseInt(range[0]), parseInt(range[1])]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 max-w-lg">
        <h3 className="text-xl font-semibold text-pink-800 mb-4">Filter Products</h3>

        {/* Price Filter */}
        <div className="mb-4">
          <h4 className="text-md font-medium text-pink-600 mb-2">Price Range</h4>
          <select
            className="border px-3 py-2 rounded-lg w-full"
            value={`${priceRange[0]}-${priceRange[1]}`}
            onChange={handlePriceChange}
          >
            <option value="0-1000000">All products</option>
            <option value="0-1000">₹0 - ₹1000</option>
            <option value="1001-5000">₹1001 - ₹5000</option>
            <option value="5001-8000">₹5001 - ₹8000</option>
            <option value="8001-10000">₹8001 - ₹10000</option>
            <option value="10001-1000000">₹10000 and above</option>
          </select>
        </div>

        {/* Categories Filter */}
        <div className="mb-4">
          <h4 className="text-md font-medium text-pink-600 mb-2">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`block w-full text-left text-sm text-pink-600 hover:bg-pink-100 px-3 py-2 rounded-lg 
                  ${selectedCategory === category.name ? 'bg-pink-200' : ''}`}
                onClick={() => handleCategoryChange(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mb-4">
          <button
            onClick={clearFilters}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Clear Filters
          </button>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-pink-600 hover:bg-pink-100 px-4 py-2 rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
