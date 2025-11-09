import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export async function addBookmark(item) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const res = await fetch(`http://localhost:5020/api/products/${item.product_id}/bookmark/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const data = await res.json();
    return data;
}

const Bookmark = () => {
    const navigate = useNavigate();
    const goToProduct = (id) => {
        navigate(`/product/${id}`);
    }
    //bookmarks is state variable, fetched data store here
    //setBookmarks used to update bookmark, cant update variable directly
    const [bookmarks, setBookmarks] = useState([]);

    //used from within component, used to interact w external things like DOM elements, apis
    //so when component re-renders, function not called again
    useEffect(() => {
        const getBookmarks = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const res = await fetch(`http://localhost:5020/api/profile/viewBookmarks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json();
            setBookmarks(data);
        }
        getBookmarks();
    }, []);

    //to remove bookmark
    async function removeBookmark(item) {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("user", user);
        const token = user?.token;
        console.log("token", token)
        const res = await fetch(`http://localhost:5020/api/products/${item.product_id}/bookmark/remove`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json();
        setBookmarks(bookmarks.filter(bookmark => bookmark.b_id !== item.b_id))
    }

    return (
        <div className="text-gray-800 font-sans w-full flex items-center justify-center mt-[20px]">
            <div className="w-1/2 h-auto flex flex-col gap-[50px]">
                {   
                    bookmarks.length ? 
                    bookmarks.map(item => (<div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition group"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={item.product.image_url}
                                alt={item.product.name}
                                className="w-full h-auto  object-center group-hover:scale-110 transition duration-300"
                            />
                            <div
                                className={`absolute top-2 right-2 ${item.product.is_available ? "bg-green-500" : "bg-red-500"
                                    } text-white px-3 py-1 rounded-full text-xs font-medium`}
                            >
                                {item.product.is_available ? "Available" : "Unavailable"}
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex flex-col items-start justify-between mb-2">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">{item.product.name}</h3>
                                    <p className="text-sm text-gray-500">{item.product.category}</p>
                                </div>
                                <div className="text-right">
                                    {/* <p className="text-2xl font-bold text-[#A36DBD]">
                                        Rs.
                                        {activeTab === "buy"
                                            ? item.buyPrice.toLocaleString()
                                            : item.rentPrice.toLocaleString()}
                                    </p> */}
                                    <p className="text-2xl font-bold text-[#A36DBD]">
                                        Rs.{item.product.price}
                                    </p>
                                    {/* <p className="text-xs text-gray-500">{activeTab === "rent" && "/month"}</p> */}
                                </div>
                            </div>
                            <button
                                //onClick={() => handleAddToCart(item, activeTab)}
                                onClick={() => goToProduct(item.product.product_id)}
                                disabled={!item.product.is_available}
                                className={`w-full mt-4 py-2 rounded-lg font-medium transition ${item.product.is_available
                                    ? "bg-[#B896C3] text-white hover:bg-[#A36DBD]"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                {item.product.is_available ? "View Product" : "Currently Unavailable"}
                            </button>
                            <button
                                //onClick={() => handleAddToCart(item, activeTab)}
                                onClick={() => removeBookmark(item)}
                                disabled={!item.product.is_available}
                                className={`w-full mt-4 py-2 rounded-lg font-medium transition ${item.product.is_available
                                    ? "bg-[#B896C3] text-white hover:bg-[#A36DBD]"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                {item.product.is_available ? "Remove Bookmark" : ""}
                            </button>
                        </div>
                    </div>)) : 
                    <div className="text-3xl p-[50px] self-center">You have no bookmarks.</div>
                    }
            </div>
        </div>
    )
}


export default Bookmark;