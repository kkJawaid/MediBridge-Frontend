import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import bgImage from "../assets/proj.png";

export default function Registration() {
  const brand = "#B896C3";
  const vibrantLavender = "#A36DBD";

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  //validation logic
  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email required";
    if (!formData.password.trim()) newErrors.password = "Password required";

    if (!isLogin) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name required";
      if (!formData.confirmPassword.trim())
        newErrors.confirmPassword = "Confirm password required";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //register logic
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setErrors({}); // clear previous errors

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitSuccess(true);
        setIsSubmitting(false);
        //redirection to login page after registration
        setTimeout(() => {
          setIsLogin(true);     // switch to login form
          setSubmitSuccess(false);
        }, 1200);          // adjust delay
      } else {
        setErrors({ form: data.message || "Registration failed" });
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("error: ", err);
      setErrors({ form: "Network error" });
      setIsSubmitting(false);
    }
  }

  //login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setErrors({}); // clear previous errors
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Check if admin
        if (formData.email === "admin@medibridge.com" && formData.password === "admin123") {
          localStorage.setItem("user", JSON.stringify({ role: "admin", name: "Admin", token: data.token }));
          navigate("/admin");
        } else {
          localStorage.setItem("user", JSON.stringify({ role: "user", ...data.user, token: data.token }));
          navigate("/"); // normal home page
        }
        setIsSubmitting(false);
      } else {
        console.error("Login failed:", data.message);
        setErrors({ form: data.message || "Login failed" });
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Form container */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-4 text-center"
            style={{ color: "#2E0249" }}
          >
            {isLogin ? "Login" : "Register"}
          </h2>

          {/* Toggle Login/Register */}
          <div className="text-center mb-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 hover:underline text-sm"
              style={{ color: vibrantLavender }}
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <span
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                  <span
                    className="absolute right-3 top-2 cursor-pointer"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </span>
                </div>
              </div>
            )}
            {errors.form && (
              <div className="text-red-600 text-center text-sm mb-2">
                {errors.form}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-lg text-white hover:bg-purple-700 transition"
              style={{ backgroundColor: vibrantLavender }}
            >
              {isSubmitting ? "Submitting..." : isLogin ? "Login" : "Register"}
            </button>

            {submitSuccess && (
              <p
                className="text-center mt-2 font-medium"
                style={{ color: brand }}
              >
                {isLogin
                  ? "Login successful!"
                  : "Registration successful!"}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
