export default function TopBar({ title, onMenuClick, actions }) {
  return (
    <header className="h-14 bg-white border-b border-[#E5E7EB] flex items-center px-3 sm:px-4 lg:px-6 shrink-0 gap-3">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-md text-[#6B7280] hover:bg-[#F8F9FA] transition-colors shrink-0"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <h1 className="text-sm sm:text-base font-semibold text-[#1A1D23] flex-1 truncate">{title}</h1>

      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}

      <div className="flex items-center gap-2 shrink-0">
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
          Demo Mode
        </span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#3B5BDB] text-xs font-semibold">
          JD
        </div>
      </div>
    </header>
  );
}
