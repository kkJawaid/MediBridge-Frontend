import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addBookmark } from "./Bookmark";
import RatingForm from "../components/RatingForm";

const Product = () => {
    const showToast = (msg) =>
        toast.success(msg, {
            duration: 2000,
            position: "top-center",
            style: {
                border: "1px solid #A36DBD",
                background: "#fff",
                color: "#4B2A63",
                fontWeight: 500,
                fontSize: "14px",
                padding: "12px 18px",
                borderRadius: "10px",
            },
            icon: "🛒",
        });

    const { addToCart } = useCart();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [review, setReview] = useState(null);
    const [showForm, setShowForm] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`http://localhost:5020/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.log(err);
            }
        }
        async function fetchReviews() {
            try {
                const res = await fetch(`http://localhost:5020/api/reviews/product/${id}`);
                const data = await res.json();
                setReview(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProduct();
        fetchReviews();
    }, [id]);

    if (!product) return <div>Product not found!</div>

    async function handleAddToCart(item) {
        const response = await addToCart(product);
        if (response === undefined) {
            return;
        }
        if (response == "already in cart!") {
            showToast(`${product.name} is already in your cart!`);
        } else {
            showToast(`${product.name} has been successfully added to your cart.`);
        }
    }

    async function handleBookmark(item) {
        const response = await addBookmark(product);
        const message = typeof response === "string" ? response : response?.message;
        if (message === "Invalid token") {
            showToast("You must be logged in first.");
            return;
        }
        if (response == "Bookmark already present.") {
            showToast(`${product.name} is already in your Bookmarks!`);
        } else {
            showToast(`${product.name} has been successfully added to your bookmarks.`);
        }
    }

    const submitReview = async (comment) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        if (token === undefined) {
            showToast("You must be logged in first.");
            return;
        }
        const res = await fetch(`http://localhost:5020/api/reviews/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                comment
            })
        })
        const data = await res.json();
        setReview([data, ...review]);
        setShowForm(false);
    }

    return (
        <div className="text-gray-800 font-sans">
            <Navbar />
            <div className="w-full flex flex-col justify-start items-center gap-[50px]">
                <div className="flex justify-between align-center gap-[50px]">
                    <div className="relative h-auto overflow-hidden mt-10">
                        <img
                            src={product.image_url}
                            alt={"product picture"}
                            className="w-[300px] h-auto object-cover group-hover:scale-110 transition duration-300"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-full p-5">
                                <h2 className="font-semibold text-gray-900 text-5xl mb-1">
                                    {product.name}
                                </h2>
                                <p className="text-1xl text-gray-500 mb-4">
                                    {product.category}
                                </p>
                            </div>
                            <div className="w-full flex justify-start items-start mb-3">
                                <p className="ml-3 text-5xl font-bold text-[#B896C3]">
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-[50px]">
                    <div>
                        <h2 className="font-semibold text-gray-900 text-3xl mb-1">
                            {"Description: "}
                        </h2>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-[10px] justify-center items-center mt-[50px]">
                <button onClick={() => handleAddToCart(product)} className="w-[300px] py-2 rounded-xl font-medium text-white transition bg-[#B896C3] hover:bg-[#A36DBD]">
                    Add To Cart
                </button>
                <button onClick={() => handleBookmark(product)} className="w-[300px] py-2 rounded-xl font-medium text-white transition bg-[#B896C3] hover:bg-[#A36DBD]">
                    Bookmark Product
                </button>
                <button onClick={() => setShowForm(true)} className="w-[300px] py-2 rounded-xl font-medium text-white transition bg-[#B896C3] hover:bg-[#A36DBD]">
                    Leave Review
                </button>
            </div>

            {
                showForm &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <RatingForm onSubmit={submitReview} onClose={() => setShowForm(false)} />
                </div>
            }
            <div className="w-full h-auto flex flex-col gap-[50px]">
                <div className="w-1/2 h-auto flex flex-col gap-[30px] m-10">
                    <h1 className="font-semibold text-gray-900 text-3xl">Reviews: </h1>
                    {review && review.length ? (
                        review.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition group p-5"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-gray-900 text-lg">
                                            {item.user.full_name || "Anonymous"}
                                        </h3>
                                    </div>

                                    <p className="text-gray-700 text-base leading-relaxed">
                                        {item.comment || "Review unable to be rendered"}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className=" w-full text-3xl p-[50px] self-center">No reviews yet.</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Product;