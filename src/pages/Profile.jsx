import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, Outlet } from "react-router-dom";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("Details");
    const navigate = useNavigate();

    function handleTabClick(tab) {
        setActiveTab(tab);
        navigate(`${tab.toLowerCase()}`)
    }
    return (
        <div className="text-gray-800 font-sans">
            <Navbar />
             <div className="bg-white rounded-2xl shadow-md mb-6">
              <div className="flex border-b">
                {["Details", "Bookmarks", "Reviews", "Orders", "Complaints"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`flex-1 py-4 px-6 font-medium transition ${
                      activeTab === tab
                        ? "text-[#A36DBD] border-b-2 border-[#A36DBD]"
                        : "text-gray-600 hover:text-[#A36DBD]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <Outlet ></Outlet>
            </div>
            <Footer />
        </div>
    )
}


export default Profile;