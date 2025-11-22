import { useEffect, useState } from "react";

function formatDate(dateString) {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

const Order = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/user/${user.user_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json();
            setOrders(data);

        }
        getOrders();
    }, []);


    return (
        <div className="text-gray-800 font-sans w-full flex flex-col items-center justify-center mt-[20px]">
            <div className="w-1/2 h-auto flex flex-col gap-[50px]">
                {
                    orders.length ?
                        orders.map(item => (
                            <div
                                key={item.order_id}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition group"
                            >

                                <div className="p-5 flex flex-col gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">ORDER ID:</p>
                                        <p className="font-semibold text-gray-800">{item.order_id}</p>
                                    </div>

                                    <div className="bg-gray-100 rounded-2xl shadow-md p-6 text-center w-full max-w-xs mx-auto mt-4">
                                        <p className="text-sm text-gray-500">Total Amount</p>
                                        <p className="text-xl font-semibold text-gray-800">${item.total_amount}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500 mb-[10px]">Status:</p>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${item.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Placed On:</p>
                                        <p className="font-semibold text-gray-800">{formatDate(item.created_at)}</p>
                                    </div>

                                    {item.productorder.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500 mb-2">Products:</p>
                                            <div className="grid gap-2">
                                                {item.productorder.map((po) => (
                                                    <div
                                                        key={po.id}
                                                        className="bg-purple-50 border border-purple-100 rounded-2xl p-3 flex justify-between items-center shadow-sm hover:shadow-md transition"
                                                    >
                                                        <span className="text-gray-800 font-medium">{po.product.name}</span>
                                                        <span className="text-gray-700 font-semibold">${Number(po.product.price).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>)) :
                        <div className="text-3xl p-[50px] self-center">You have no orders.</div>
                }
            </div>
        </div>
    )
}


export default Order;