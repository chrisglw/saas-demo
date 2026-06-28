import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';

function fmt(n) {
  return '$' + n.toLocaleString();
}

export default function InvoiceList({ invoices }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[260px]">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide hidden sm:table-cell">Invoice #</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Job</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide hidden sm:table-cell">Customer</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Status</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide hidden sm:table-cell">Due Date</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr
              key={inv.id}
              onClick={() => navigate(`/invoices/${inv.id}`)}
              className={`border-b border-[#F3F4F6] hover:bg-[#F8F9FA] cursor-pointer transition-colors ${inv.status === 'Overdue' ? 'bg-red-50/50' : ''}`}
            >
              <td className="py-3.5 px-4 font-mono text-xs text-[#6B7280] hidden sm:table-cell">{inv.invoiceNumber}</td>
              <td className="py-3.5 px-4 font-medium text-[#1A1D23]">{inv.jobName}</td>
              <td className="py-3.5 px-4 text-[#6B7280] hidden sm:table-cell">{inv.customerName}</td>
              <td className="py-3.5 px-4"><Badge status={inv.status} /></td>
              <td className="py-3.5 px-4 text-[#6B7280] hidden sm:table-cell">
                {inv.dateDue ? new Date(inv.dateDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
              </td>
              <td className={`py-3.5 px-4 text-right font-medium ${inv.status === 'Overdue' ? 'text-red-600' : 'text-[#1A1D23]'}`}>
                {fmt(inv.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
