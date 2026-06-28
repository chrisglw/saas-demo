import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';

function fmt(n) {
  return '$' + n.toLocaleString();
}

export default function EstimateList({ estimates }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[260px]">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide hidden sm:table-cell">Estimate #</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Job</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide hidden sm:table-cell">Customer</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Status</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide hidden sm:table-cell">Date</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Total</th>
          </tr>
        </thead>
        <tbody>
          {estimates.map(est => (
            <tr
              key={est.id}
              onClick={() => navigate(`/estimates/${est.id}`)}
              className="border-b border-[#F3F4F6] hover:bg-[#F8F9FA] cursor-pointer transition-colors"
            >
              <td className="py-3.5 px-4 font-mono text-xs text-[#6B7280] hidden sm:table-cell">{est.estimateNumber}</td>
              <td className="py-3.5 px-4 font-medium text-[#1A1D23]">{est.jobName}</td>
              <td className="py-3.5 px-4 text-[#6B7280] hidden sm:table-cell">{est.customerName}</td>
              <td className="py-3.5 px-4"><Badge status={est.status} /></td>
              <td className="py-3.5 px-4 text-[#6B7280] hidden sm:table-cell">{new Date(est.dateCreated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
              <td className="py-3.5 px-4 text-right font-medium text-[#1A1D23]">{fmt(est.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
