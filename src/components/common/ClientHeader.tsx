import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const tabs = [
  { name: "Trang chủ", path: "/" },
  { name: "Nhận nuôi", path: "/adoption" },
  { name: "Bản đồ", path: "/maps" },
  { name: "Liên hệ", path: "/contact" },
  { name: "Tin tức", path: "/news" },
];

export default function ClientHeader() {
  const nav = useNavigate();
  return (
    <header className="top-0 z-50 bg-transparent flex items-center justify-between py-4 px-10">
      <div className="flex items-center space-x-4">
        <Logo />

        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => nav(tab.path)}
            className="px-4 py-2 rounded-4xl text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* search */}
      <div className="flex items-center space-x-4">
        <input
          placeholder="Search"
          type="text"
          className="px-4 py-2 rounded-4xl min-w-64 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {/* button */}
        <button
          onClick={() => nav("/login")}
          className="rounded-4xl bg-primary text-white px-4 py-2"
        >
          {" "}
          Join the community
        </button>
      </div>
    </header>
  );
}
