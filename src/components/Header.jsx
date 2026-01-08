export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border safe-top">
      <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-dark">
            Website Maintenance
          </h1>
          <p className="text-[15px] text-secondary mt-0.5">
            Task Tracker
          </p>
        </div>
        <img
          src="/peelclear-logo.png"
          alt="Peelclear"
          className="h-7 md:h-10 w-auto"
        />
      </div>
    </header>
  );
}
