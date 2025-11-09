import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Dummy users
  useEffect(() => {
    const dummyUsers = [
      { id: 1, full_name: "John Doe", email: "john@example.com", contact: "0300-1234567", address: "123 Main Street, Lahore" },
      { id: 2, full_name: "Jane Smith", email: "jane@example.com", contact: "0301-9876543", address: "45 Street No. 9, Karachi" },
      { id: 3, full_name: "Ali Khan", email: "ali@example.com", contact: "0333-1112233", address: "Block H, Islamabad" },
    ];
    setUsers(dummyUsers);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users by name OR email (case-insensitive)
  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUsers((prev) =>
      prev.map((user) => (user.id === selectedUser.id ? selectedUser : user))
    );
    setShowEditForm(false);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-[#9C27B0]">Manage Users</h1>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#9C27B0]"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border p-3 text-left">#</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Contact</th>
              <th className="border p-3 text-left">Address</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{user.full_name}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">{user.contact}</td>
                  <td className="border p-3">{user.address}</td>
                  <td className="border p-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className="flex items-center bg-[#9C27B0] text-white px-3 py-1 rounded-lg hover:bg-[#7B1FA2] transition"
                    >
                      <Pencil size={16} className="mr-1" /> Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border p-3 text-center text-gray-500 italic">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center text-[#9C27B0]">
              Edit User Details
            </h2>
            <form onSubmit={handleUpdate}>
              <label className="block mb-2 font-medium">Full Name</label>
              <input
                type="text"
                value={selectedUser.full_name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, full_name: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-[#9C27B0]"
              />

              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-[#9C27B0]"
              />

              <label className="block mb-2 font-medium">Contact</label>
              <input
                type="text"
                value={selectedUser.contact}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, contact: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3 focus:ring-2 focus:ring-[#9C27B0]"
              />

              <label className="block mb-2 font-medium">Address</label>
              <textarea
                value={selectedUser.address}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, address: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-[#9C27B0]"
                rows="3"
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white bg-[#9C27B0] hover:bg-[#7B1FA2] transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
