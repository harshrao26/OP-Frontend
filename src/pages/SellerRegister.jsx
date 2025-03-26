import { useState } from "react";
import axios from "axios";
import {
  Store,
  Mail,
  Phone,
  User,
  Globe,
  FileText,
  MapPin,
  Building2,
  BadgePercent,
  Star,
  ShieldCheck,
  Smile,
  CheckCircle,
} from "lucide-react";

const SellerRegister = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    contactNo: "",
    shopName: "",
    email: "",
    password: "",
    sellerAddress: "",
    shopWebsite: "",
    gstNumber: "",
    idProof: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    yearsInBusiness: "",
    customerSupport: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        socialMedia: {
          facebook: formData.facebook,
          instagram: formData.instagram,
          twitter: formData.twitter,
          linkedin: formData.linkedin,
        },
      };
      await axios.post("http://localhost:5001/api/seller/auth/register", payload);
      alert("Seller registered successfully!");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
          <Store /> Seller Registration
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Required Fields */}
          <Input label="Owner Name" icon={<User />} name="ownerName" value={formData.ownerName} onChange={handleChange} required />
          <Input label="Contact Number" icon={<Phone />} name="contactNo" value={formData.contactNo} onChange={handleChange} required />
          <Input label="Shop Name" icon={<Building2 />} name="shopName" value={formData.shopName} onChange={handleChange} required />
          <Input label="Email" icon={<Mail />} type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Input label="Password" icon={<ShieldCheck />} type="password" name="password" value={formData.password} onChange={handleChange} required />
          <Input label="Seller Address" icon={<MapPin />} name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} required />
          <Input label="GST Number" icon={<BadgePercent />} name="gstNumber" value={formData.gstNumber} onChange={handleChange} required />
          <Input label="ID Proof (File URL)" icon={<FileText />} name="idProof" value={formData.idProof} onChange={handleChange} required />
          <Input label="Years in Business" icon={<Star />} type="number" name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleChange} required />
          <Input label="Customer Support Contact" icon={<Smile />} name="customerSupport" value={formData.customerSupport} onChange={handleChange} required />

          {/* Optional Fields */}
          <Input label="Shop Website" icon={<Globe />} name="shopWebsite" value={formData.shopWebsite} onChange={handleChange} />
          <Input label="Facebook" icon={<Globe />} name="facebook" value={formData.facebook} onChange={handleChange} />
          <Input label="Instagram" icon={<Globe />} name="instagram" value={formData.instagram} onChange={handleChange} />
          <Input label="Twitter" icon={<Globe />} name="twitter" value={formData.twitter} onChange={handleChange} />
          <Input label="LinkedIn" icon={<Globe />} name="linkedin" value={formData.linkedin} onChange={handleChange} />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} /> Register Seller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, icon, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring focus-within:ring-green-300">
      <div className="text-gray-400 mr-2">{icon}</div>
      <input {...props} className="w-full outline-none text-sm bg-transparent" />
    </div>
  </div>
);

export default SellerRegister;
