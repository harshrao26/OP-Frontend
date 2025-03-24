import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/customer/auth/register", { name, email, phone, password });
      alert("Registration successful");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input type="text" placeholder="Name" className="border p-2 w-full mb-2" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Phone" className="border p-2 w-full mb-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
}
