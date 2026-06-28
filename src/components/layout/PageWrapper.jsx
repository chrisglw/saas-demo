export default function PageWrapper({ children }) {
  return (
    <main className="flex-1 overflow-y-auto bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
        {children}
      </div>
    </main>
  );
}
