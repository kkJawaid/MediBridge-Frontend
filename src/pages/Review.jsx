import {  useEffect, useState } from "react";


const Review = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getReviews = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/getReview`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json();
            setReviews(data);
        }
        getReviews();
    }, []);

    //to remove bookmark
    async function removeReview(item) {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews/deleteReview`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ id: item.review_id })
        })
        const data = await res.json();
        setReviews(reviews.filter(review => review.review_id !== item.review_id))
    }

    return (
        <div className="text-gray-800 font-sans w-full flex items-center justify-center mt-[20px]">
            <div className="w-1/2 h-auto flex flex-col gap-[50px]">
                {
                    reviews.length ?
                        reviews.map(item => (<div
                            key={item.review_id}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition group"
                        >
                            {item.comment && (
                                <div className="px-5 pt-5">
                                    <p className="bg-gray-100 rounded-lg p-4 text-gray-700 text-sm italic">
                                        "{item.comment}"
                                    </p>
                                </div>
                            )}
                            <div className="p-5">
                                <div className="flex flex-col items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500">{item.product.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-[#A36DBD]">
                                            ${item.product.price}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeReview(item)}
                                    className="w-full mt-4 py-2 rounded-lg font-medium transition bg-[#B896C3] text-white hover:bg-[#A36DBD]"
                                >
                                    Remove Review
                                </button>
                            </div>
                        </div>)) :
                        <div className="text-3xl p-[50px] self-center">You have no reviews.</div>
                }
            </div>
        </div>
    )
}


export default Review;