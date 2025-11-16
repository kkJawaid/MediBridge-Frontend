import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import RatingForm from "../components/RatingForm";

//edit
// export async function addBookmark(item) {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const token = user?.token;
//     const res = await fetch(`http://localhost:5020/api/products/${item.product_id}/bookmark/add`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         }
//     })
//     const data = await res.json();
//     return data;
// }

const Complaint = () => {
    // const navigate = useNavigate();
    // const goToProduct = (id) => {
    //     navigate(`/product/${id}`);
    // }

    const [complaints, setComplaints] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const getComplaints = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const res = await fetch(`http://localhost:5020/api/profile/viewAllComplaints`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json();
            console.log(data);
            setComplaints(data);

        }
        getComplaints();
    }, []);

    //to add complaint 
    const addComplaint = async (complaintBody) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        const res = await fetch(`http://localhost:5020/api/complaints/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ complaint: complaintBody })
        });
        const data = await res.json();
        setComplaints((prev) => [...prev, data]);
        setShowForm(false);
    }

    return (
        <div className="text-gray-800 font-sans w-full flex flex-col items-center justify-center mt-[20px]">
            <button
                onClick={() => setShowForm(true)}
                className="mb-8 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 mt-[20px]"
            >
                Submit New Complaint
            </button>
            {showForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
                    <RatingForm
                        onSubmit={addComplaint}
                        onClose={() => setShowForm(false)}
                    />
                </div>
            )}

            <div className="w-1/2 h-auto flex flex-col gap-[50px]">
                {
                    complaints.length ?
                        complaints.map(item => (
                            <div
                                key={item.complaint_id}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition group"
                            >
                                {item.complaint_body && (
                                    <div className="px-5 pt-5 mb-[10px]">
                                        <p className="bg-gray-100 rounded-lg p-4 text-gray-700 text-sm italic">
                                            "{item.complaint_body}"
                                        </p>
                                    </div>
                                )}
                                <div className="p-5 flex flex-col gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Complaint ID:</p>
                                        <p className="font-semibold text-gray-800">{item.complaint_id}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Response:</p>
                                        <p className="font-medium italic text-gray-700">
                                            {item.response === "n/a" ? "Pending response" : item.response}
                                        </p>
                                    </div>

                                </div>
                            </div>)) :
                        <div className="text-3xl p-[50px] self-center">You have no complaints.</div>
                }
            </div>
        </div>
    )
}


export default Complaint;