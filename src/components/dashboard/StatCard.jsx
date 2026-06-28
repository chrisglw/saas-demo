import Card from '../ui/Card';

export default function StatCard({ label, value, sub, accent, icon }) {
  return (
    <Card className="p-3 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-medium text-[#6B7280] uppercase tracking-wide leading-tight">{label}</p>
          <p className={`text-xl sm:text-2xl font-semibold mt-1 ${accent ? 'text-red-600' : 'text-[#1A1D23]'}`}>{value}</p>
          {sub && <p className="text-xs text-[#6B7280] mt-0.5 leading-tight">{sub}</p>}
        </div>
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 ${accent ? 'bg-red-50 text-red-500' : 'bg-[#EEF2FF] text-[#3B5BDB]'}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
