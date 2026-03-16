export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="container mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pt-16 md:flex-row md:items-stretch md:pt-20">
        {/* Left content */}
        <div className="z-10 max-w-xl md:w-1/2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#002A48]">
            One More Friend
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#002A48] md:text-4xl lg:text-5xl">
            Thousands More Fun!
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
            Having a pet means you have more joy, a new friend, a happy person
            who will always be with you to have fun. We have 200+ different pets
            that can meet your needs!
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="rounded-full border border-[#002A48] px-6 py-2 text-sm font-semibold text-[#002A48] transition-colors hover:bg-[#002A48] hover:text-white">
              View Intro
            </button>
            <button className="rounded-full bg-[#002A48] px-6 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#02406e]">
              Explore Now
            </button>
          </div>
        </div>

        {/* Right image side */}
        <div className="relative flex w-full items-end justify-center md:w-1/2">
          {/* Background shapes */}
          <div className="absolute inset-y-6 right-6 hidden w-40 rounded-full bg-[#002A48] md:block" />
          <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-[40%] bg-[#FFD4A4] md:h-80 md:w-80" />

          {/* Placeholder main image */}
          <img
            src="https://images.pexels.com/photos/4587995/pexels-photo-4587995.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Happy person holding a cute dog"
            className="relative z-10 max-h-80 rounded-[32px] object-cover shadow-xl md:max-h-96"
          />
        </div>
      </div>
    </section>
  );
}
