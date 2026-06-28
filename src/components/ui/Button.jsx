export default function Button({ children, variant = 'primary', size = 'md', onClick, className = '', type = 'button' }) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-md transition-colors cursor-pointer';
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };
  const variants = {
    primary: 'bg-[#3B5BDB] text-white hover:bg-[#3451c7] active:bg-[#2f49b3]',
    secondary: 'bg-white text-[#1A1D23] border border-[#E5E7EB] hover:bg-[#F8F9FA] active:bg-gray-100',
    ghost: 'text-[#6B7280] hover:bg-[#F8F9FA] hover:text-[#1A1D23]',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
