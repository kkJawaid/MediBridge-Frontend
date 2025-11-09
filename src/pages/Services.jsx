import React, { useState, useEffect } from "react";
import { Filter, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//import { useCart } from "../context/CartContext";
//import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  //const { addToCart } = useCart();
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    priceRange: "all",
    availability: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // const servicesData = [
  //   {
  //     id: 1,
  //     name: "MRI Scan",
  //     category: "Imaging",
  //     buyPrice: 5000,
  //     available: true,
  //     image:
  //       "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200",
  //     description: "High-resolution imaging for brain, spine, and joints.",
  //   },
  //   {
  //     id: 2,
  //     name: "Physiotherapy Session",
  //     category: "Rehabilitation",
  //     buyPrice: 100,
  //     available: true,
  //     image:
  //       "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200",
  //     description: "Personalized treatment for recovery and mobility.",
  //   },
  //   {
  //     id: 3,
  //     name: "Blood Test Package",
  //     category: "Diagnostic",
  //     buyPrice: 200,
  //     available: true,
  //     image:
  //       "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=1200",
  //     description: "Comprehensive blood testing for general health.",
  //   },
  //   {
  //     id: 4,
  //     name: "Emergency Consultation",
  //     category: "Emergency",
  //     buyPrice: 150,
  //     available: false,
  //     image:
  //       "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200",
  //     description: "Immediate access to certified emergency physicians.",
  //   },
  // ];

  // const showToast = (msg) =>
  //   toast.success(msg, {
  //     duration: 2000,
  //     position: "top-center",
  //     style: {
  //       border: "1px solid #A36DBD",
  //       background: "#fff",
  //       color: "#4B2A63",
  //       fontWeight: 500,
  //       fontSize: "14px",
  //       padding: "12px 18px",
  //       borderRadius: "10px",
  //     },
  //     icon: "🛒",
  //   });
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5020/api/products/");
        const data = await res.json();
        const mappedData = data.filter(item => item.type === "service").map(item => ({
          id: item.product_id,
          name: item.name,
          category: item.category,
          buyPrice: Number(item.price),
          available: item.is_available,
          image: item.image_url || "https://via.placeholder.com/400",
          description: item.description || "",
        }));
        setServicesData(mappedData);
      } catch(err) {
        console.log("Error: ", err)
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const goToProduct = (id) => {
    // const cartItem = {
    //   ...item,
    //   price: item.buyPrice,
    //   quantity: 1,
    //   type: "buy",
    //   itemType: "service",
    // };
    // addToCart(cartItem);
    //showToast(`${item.name} has been successfully added to your cart.`);
    navigate(`/product/${id}`);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: value });
  };

  const filteredServices = servicesData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedFilters.category === "all" ||
      item.category === selectedFilters.category;
    const matchesAvailability =
      selectedFilters.availability === "all" ||
      (selectedFilters.availability === "available" && item.available) ||
      (selectedFilters.availability === "unavailable" && !item.available);
    const matchesPrice =
      selectedFilters.priceRange === "all" ||
      (selectedFilters.priceRange === "low" && item.buyPrice <= 500) ||
      (selectedFilters.priceRange === "medium" &&
        item.buyPrice > 500 &&
        item.buyPrice <= 3000) ||
      (selectedFilters.priceRange === "high" && item.buyPrice > 3000);

    return (
      matchesSearch && matchesCategory && matchesAvailability && matchesPrice
    );
  });

  const renderFilterDropdowns = () => (
    <>
      {["category", "availability", "priceRange"].map((filter) => (
        <div key={filter} className="mb-6">
          <label className="block text-sm font-medium text-[#A36DBD] mb-2 capitalize">
            {filter === "priceRange" ? "Price Range" : filter}
          </label>
          <select
            value={selectedFilters[filter]}
            onChange={(e) => handleFilterChange(filter, e.target.value)}
            className="w-full px-3 py-2 border border-[#B896C3] text-[#A36DBD] rounded-lg focus:ring-2 focus:ring-[#A36DBD] focus:border-transparent"
          >
            {filter === "category" && (
              <>
                <option value="all">All Categories</option>
                <option value="Imaging">Imaging</option>
                <option value="Rehabilitation">Rehabilitation</option>
                <option value="Diagnostic">Diagnostic</option>
                <option value="Emergency">Emergency</option>
                <option value="Patient Care">Patient Care</option>
              </>
            )}
            {filter === "availability" && (
              <>
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </>
            )}
            {filter === "priceRange" && (
              <>
                <option value="all">All Prices</option>
                <option value="low">Under $500</option>
                <option value="medium">$500 – $3,000</option>
                <option value="high">Above $3,000</option>
              </>
            )}
          </select>
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 relative">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `
              linear-gradient(rgba(156, 39, 176, 0.6), rgba(163, 109, 189, 0.6)),
              url('https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=1200&q=80')
            `,
          }}
        ></div>

        <motion.div
          className="relative z-10 max-w-3xl px-6 text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Medical Services Marketplace
          </h1>
          <p className="text-white/90 text-lg md:text-2xl drop-shadow">
            Book or buy trusted healthcare services from certified providers.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
              <div className="flex items-center mb-6">
                <Filter className="w-5 h-5 mr-2 text-[#A36DBD]" />
                <h3 className="font-semibold text-[#A36DBD]">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#A36DBD] mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search services..."
                    className="w-full pl-10 pr-3 py-2 border border-[#B896C3] rounded-lg focus:ring-2 focus:ring-[#A36DBD] focus:border-transparent text-[#A36DBD]"
                  />
                </div>
              </div>

              {renderFilterDropdowns()}
            </div>
          </div>

          {/* Mobile Filter */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full py-2 px-4 bg-[#A36DBD] text-white rounded-lg font-medium hover:bg-[#9355af] transition"
            >
              {showMobileFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-white p-4 rounded-lg shadow-md space-y-4"
              >
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="absolute right-4 top-3 text-gray-500"
                >
                  <X size={16} />
                </button>
                 {/* Add Search Input here */}
                <div className="mb-4 relative">
                  <label className="block text-sm font-medium text-[#A36DBD] mb-1">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search services..."
                      className="w-full pl-10 pr-3 py-2 border border-[#B896C3] rounded-lg focus:ring-2 focus:ring-[#A36DBD] focus:border-transparent text-[#A36DBD]"
                    />
                  </div>
                </div>
                {renderFilterDropdowns()}
              </motion.div>
            )}
          </div>

          {/* Services Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div
                      className={`absolute top-2 right-2 ${
                        item.available ? "bg-green-500" : "bg-red-500"
                      } text-white px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {item.available ? "Available" : "Unavailable"}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {item.category}
                    </p>

                    <div className="flex justify-between items-center mb-3">
                      <p className="text-2xl font-bold text-[#B896C3]">
                        ${item.buyPrice.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => goToProduct(item.id)}
                      disabled={!item.available}
                      className={`w-full py-2 rounded-xl font-medium text-white transition ${
                        item.available
                          ? "bg-[#B896C3] hover:bg-[#A36DBD]"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      View Product
                    </button>
                  </div>
                </div>
              ))}

              {filteredServices.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-[#A36DBD]">
                    No services found matching your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
