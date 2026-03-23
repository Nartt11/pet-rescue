import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoggingIn, user } = useAuth();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { emailOrUsername, password },
      {
        onSuccess: () => {
          setIsSubmitted(true);
        },

        onError: (error: unknown) => {
          let message = "Đăng nhập thất bại";

          // 🔥 lấy lỗi từ BE (nếu có)
          if (axios.isAxiosError(error)) {
            message = error.response?.data?.message || message;
          } else if (error instanceof Error) {
            message = error.message;
          }

          // toast.error(message);
          alert(message);
        },
      },
    );
  };

  useEffect(() => {
    if (isSubmitted && user) {
      // toast.success("Login thành công 🎉");
      alert("Login thành công 🎉");

      // redirect theo role
      if (user.roles.includes("ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, isSubmitted, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Welcome Back
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Please log in to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="text"
              placeholder="Placeholder"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Placeholder"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-slate-400">
              It must be a combination of minimum 8 letters, numbers, and
              symbols.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="mt-2 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            {isLoggingIn ? "Logging..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center">
          <span className="h-px w-full bg-slate-200" />
          <span className="px-3 text-xs text-slate-500">Or log in with</span>
          <span className="h-px w-full bg-slate-200" />
        </div>

        {/* Social buttons */}
        <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
          <button className="flex items-center justify-center gap-1 rounded-md border border-slate-200 px-2 py-2 text-slate-700 hover:bg-slate-50">
            <span>🔵</span>
            <span>Google</span>
          </button>
          <button className="flex items-center justify-center gap-1 rounded-md border border-slate-200 px-2 py-2 text-slate-700 hover:bg-slate-50">
            <span>🍎</span>
            <span>Apple</span>
          </button>
          <button className="flex items-center justify-center gap-1 rounded-md border border-slate-200 px-2 py-2 text-slate-700 hover:bg-slate-50">
            <span>🐦</span>
            <span>Twitter</span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          No account yet?{" "}
          <a
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
