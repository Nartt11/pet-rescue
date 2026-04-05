import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const PERKS = [
  {
    emoji: "🆘",
    title: "Báo cáo cứu hộ",
    desc: "Đăng báo cáo ca cứu hộ khẩn cấp, huy động hỗ trợ từ cộng đồng.",
  },
  {
    emoji: "🐾",
    title: "Cộng đồng yêu thú cưng",
    desc: "Kết nối với 1.200+ thành viên, chia sẻ kinh nghiệm chăm sóc thú cưng.",
  },
  {
    emoji: "⭐",
    title: "Tích điểm uy tín",
    desc: "Tham gia cứu hộ để tích lũy điểm và nhận huy hiệu tình nguyện viên.",
  },
  {
    emoji: "🗺️",
    title: "Bản đồ thời gian thực",
    desc: "Theo dõi ca cứu hộ, trung tâm và sự kiện trên bản đồ tương tác.",
  },
];
const HERO_IMG =
  "https://images.unsplash.com/photo-1638552758613-0a9a70102bdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200";

export default function AuthLayout() {
  return (
    <div className="max-h-screen flex font-[Montserrat,sans-serif]">
      {/* ── Left panel ── */}
      <div className="auth-left-panel flex-1 relative flex flex-col justify-end min-h-screen hidden md:flex">
        {/* Background image */}
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,23,31,0.92)_0%,rgba(3,53,79,0.80)_60%,rgba(2,23,31,0.70)_100%)]" />

        {/* Content */}
        <div className="relative z-10 px-12 pt-12 pb-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-12 no-underline">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF9132] to-[#FF584F] flex items-center justify-center text-xl">
              🐾
            </div>
            <div>
              <div className="text-white font-extrabold text-lg">PawHome</div>
              <div className="text-[10px] tracking-[1.5px] text-white/50">
                CỨU HỘ · NHẬN NUÔI · YÊU THƯƠNG
              </div>
            </div>
          </Link>

          {/* Heading */}
          <h1 className="text-[clamp(28px,3vw,42px)] font-black text-white leading-tight max-w-[420px] mb-3">
            Tham gia cộng đồng <br />
            <span className="bg-gradient-to-r from-[#FF9132] to-[#F7DB47] bg-clip-text text-transparent">
              yêu thú cưng Hà Nội
            </span>
          </h1>

          <p className="text-sm text-white/75 leading-relaxed max-w-[380px] mb-9">
            Hơn 1.200 thành viên đang cùng nhau cứu hộ, nhận nuôi và chia sẻ
            tình yêu dành cho thú cưng mỗi ngày.
          </p>

          {/* Perks */}
          <div className="flex flex-col gap-4">
            {PERKS.map((p) => (
              <div key={p.title} className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-lg shrink-0">
                  {p.emoji}
                </div>
                <div>
                  <div className="text-white text-sm font-bold">{p.title}</div>
                  <div className="text-white/60 text-xs leading-relaxed">
                    {p.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-9 flex items-center gap-3">
            <div className="flex">
              {["#2AC789", "#FF9132", "#06A7E7", "#FF584F", "#F7DB47"].map(
                (c, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full border-2 border-[#02171F]/80 flex items-center justify-center text-xs font-bold text-white ${i > 0 ? "-ml-2" : ""}`}
                    style={{ background: c }}
                  >
                    {["HL", "MK", "TH", "VĐ", "TM"][i]}
                  </div>
                ),
              )}
            </div>
            <span className="text-xs text-white/70">
              <strong className="text-[#F7DB47]">1.240+</strong> thành viên đã
              tham gia
            </span>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="auth-right-panel w-full md:w-[480px] bg-white flex flex-col overflow-y-auto">
        {/* Back */}
        <div className="px-10 pt-6">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-[#606479] font-semibold"
          >
            <ArrowLeft size={16} /> Quay lại trang chủ
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-10 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
