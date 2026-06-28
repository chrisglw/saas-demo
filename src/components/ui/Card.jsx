export default function Card({ children, className = '', onClick }) {
  return (
    <div
      className={`bg-white border border-[#E5E7EB] rounded-lg ${onClick ? 'cursor-pointer hover:border-[#3B5BDB] transition-colors' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
