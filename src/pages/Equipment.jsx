import { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Equipment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("buy");
  const [equipmentData, setEquipmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    priceRange: "all",
    availability: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  }
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await fetch("http://localhost:5020/api/products/");
        const data = await res.json();
        const typeFilter = activeTab == "buy" ? "equipment-buy" : "equipment-rent";
        const mappedData = data.filter(item => item.type === typeFilter).map(item => ({
          id: item.product_id,
          name: item.name,
          category: item.category,
          buyPrice: Number(item.price),
          rentPrice: Number(item.price),
          available: item.is_available,
          image: item.image_url || "https://via.placeholder.com/400",
          description: item.description || "",
        }));
        setEquipmentData(mappedData);
      } catch(err) {
        console.log("error: ",err);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, [activeTab]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: value });
  };

  const filteredEquipment = equipmentData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedFilters.category === "all" || item.category === selectedFilters.category;
    const matchesAvailability =
      selectedFilters.availability === "all" ||
      (selectedFilters.availability === "available" && item.available) ||
      (selectedFilters.availability === "unavailable" && !item.available);

    let matchesPrice = true;
    if (selectedFilters.priceRange !== "all") {
      const price = activeTab === "buy" ? item.buyPrice.toLocaleString() : item.rentPrice.toLocaleString();
      if (selectedFilters.priceRange === "low") matchesPrice = price < 5000;
      else if (selectedFilters.priceRange === "medium")
        matchesPrice = price >= 5000 && price < 20000;
      else if (selectedFilters.priceRange === "high") matchesPrice = price >= 20000;
    }

    return matchesSearch && matchesCategory && matchesAvailability && matchesPrice;
  });

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
              url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80')
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
            Medical Equipment Marketplace
          </h1>
          <p className="text-white/90 text-lg md:text-2xl drop-shadow">
            Buy or rent certified, high-quality equipment from trusted healthcare providers.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-64 flex-shrink-0 hidden lg:block">
           <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
              <div className="flex items-center mb-6">
                <Filter className="w-5 h-5 mr-2 text-[#A36DBD]" />
                <h3 className="font-semibold text-[#A36DBD]">Filters</h3>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#A36DBD] mb-2">Search</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search equipment..."
                    className="w-full pl-10 pr-3 py-2 border border-[#B896C3] rounded-lg focus:ring-2 focus:ring-[#A36DBD] focus:border-transparent text-[#A36DBD]"
                  />
                </div>
              </div>

              {["category", "priceRange", "availability"].map((filter) => (
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
                        <option value="Diagnostic">Diagnostic</option>
                        <option value="Imaging">Imaging</option>
                        <option value="Surgery">Surgery</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Patient Care">Patient Care</option>
                      </>
                    )}
                    {filter === "priceRange" && (
                      <>
                        <option value="all">All Prices</option>
                        <option value="low">Under $5,000</option>
                        <option value="medium">$5,000 - $20,000</option>
                        <option value="high">Over $20,000</option>
                      </>
                    )}
                    {filter === "availability" && (
                      <>
                        <option value="all">All</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                      </>
                    )}
                  </select>
                </div>
              ))}
            </div>
          </div>


          {/* Mobile Filter Dropdown */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full py-2 px-4 bg-[#A36DBD] text-white rounded-lg font-medium hover:bg-[#9355af] transition"
            >
              {showMobileFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {showMobileFilters && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow-md space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-[#A36DBD] mb-1">Category</label>
                  <select
                    value={selectedFilters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-[#B896C3] text-[#A36DBD] rounded-lg focus:ring-2 focus:ring-[#A36DBD] focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="Diagnostic">Diagnostic</option>
                    <option value="Imaging">Imaging</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Patient Care">Patient Care</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-[#A36DBD] mb-1">Price Range</label>
                  <select
                    value={selectedFilters.priceRange}
                    onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                    className="w-full px-3 py-2 border border-[#B896C3] text-[#A36DBD] rounded-lg focus:ring-2 focus:ring-[#A36DBD] focus:border-transparent"
                  >
                    <option value="all">All Prices</option>
                    <option value="low">Under $5,000</option>
                    <option value="medium">$5,000 - $20,000</option>
                    <option value="high">Over $20,000</option>
                  </select>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-[#A36DBD] mb-1">Availability</label>
                  <select
                    value={selectedFilters.availability}
                    onChange={(e) => handleFilterChange("availability", e.target.value)}
                    className="w-full px-3 py-2 border border-[#B896C3] text-[#A36DBD] rounded-lg focus:ring-2 focus:ring-[#A36DBD] focus:border-transparent"
                  >
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
                {/* Search Input for Mobile */}
                <div className="mb-4 relative">
                  <label className="block text-sm font-medium text-[#A36DBD] mb-1">Search</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search equipment..."
                      className="w-full pl-10 pr-3 py-2 border border-[#B896C3] rounded-lg focus:ring-2 focus:ring-[#A36DBD] focus:border-transparent text-[#A36DBD]"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>


          {/* Equipment Cards */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-md mb-6">
              <div className="flex border-b">
                {["buy", "rent"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 font-medium transition ${
                      activeTab === tab
                        ? "text-[#A36DBD] border-b-2 border-[#A36DBD]"
                        : "text-gray-600 hover:text-[#A36DBD]"
                    }`}
                  >
                    {tab === "buy" ? "Buy Equipment" : "Rent Equipment"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEquipment.map((item) => (
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
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#A36DBD]">
                          $
                          {activeTab === "buy"
                            ? item.buyPrice.toLocaleString()
                            : item.rentPrice.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">{activeTab === "rent" && "/month"}</p>
                      </div>
                    </div>

                    <button
                      //onClick={() => handleAddToCart(item, activeTab)}
                      onClick={() => goToProduct(item.id)}
                      disabled={!item.available}
                      className={`w-full mt-4 py-2 rounded-lg font-medium transition ${
                        item.available
                          ? "bg-[#B896C3] text-white hover:bg-[#A36DBD]"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {item.available ? "View Product" : "Currently Unavailable"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Equipment;
