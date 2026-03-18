import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className=" mt-16 bg-[#FFEED9] pt-16 pb-8 text-slate-700">
      {/* Subscribe section */}
      <div className="mx-auto max-w-6xl  container rounded-xl bg-[#002A48] px-8 py-8 text-white shadow-lg">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold md:text-xl">
              Register Now So You Don&apos;t Miss
            </p>
            <p className="text-lg font-semibold md:text-xl">Our Programs</p>
          </div>

          <form
            className="flex w-full max-w-xl flex-col gap-3 md:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your Email"
              className="h-11 flex-1 rounded-md border-none px-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#FCE0C8]"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-md bg-[#FCE0C8] px-5 text-sm font-semibold text-[#002A48] transition-colors hover:bg-white"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      {/* Bottom area */}
      <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-8 border-t border-[#E3C9AA] pt-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-6">
          <a href="#" className="transition-colors hover:text-[#002A48]">
            Home
          </a>
          <a href="#" className="transition-colors hover:text-[#002A48]">
            Category
          </a>
          <a href="#" className="transition-colors hover:text-[#002A48]">
            About
          </a>
          <a href="#" className="transition-colors hover:text-[#002A48]">
            Contact
          </a>
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-4 text-lg md:order-3">
          <button
            aria-label="Facebook"
            className="transition-colors hover:text-[#002A48]"
          >
            <i className="fa-brands fa-facebook-f" />
          </button>
          <button
            aria-label="Twitter"
            className="transition-colors hover:text-[#002A48]"
          >
            <i className="fa-brands fa-twitter" />
          </button>
          <button
            aria-label="Instagram"
            className="transition-colors hover:text-[#002A48]"
          >
            <i className="fa-brands fa-instagram" />
          </button>
          <button
            aria-label="YouTube"
            className="transition-colors hover:text-[#002A48]"
          >
            <i className="fa-brands fa-youtube" />
          </button>
        </div>

        {/* Brand + legal */}
        <div className="flex flex-1 flex-col gap-4 md:order-2 md:items-center">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-xs text-slate-500">
            © 2022 Monito. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs md:order-4 md:justify-end">
          <a href="#" className="transition-colors hover:text-[#002A48]">
            Terms of Service
          </a>
          <a href="#" className="transition-colors hover:text-[#002A48]">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
