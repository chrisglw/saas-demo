import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

function fmt(n) {
  return '$' + n.toLocaleString();
}

export default function InvoiceDetailView({ invoice }) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate('/invoices')}
        className="text-xs text-[#6B7280] hover:text-[#3B5BDB] mb-5 flex items-center gap-1 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        All Invoices
      </button>

      {invoice.status === 'Overdue' && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <div>
            <p className="text-sm font-semibold text-red-700">This invoice is overdue</p>
            <p className="text-xs text-red-600 mt-0.5">Due date was {new Date(invoice.dateDue).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.</p>
          </div>
        </div>
      )}

      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden max-w-3xl">
        {/* Header band */}
        <div className="bg-[#1A1D23] px-5 sm:px-8 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <div className="text-white text-base sm:text-lg font-semibold">StoneCraft Co.</div>
              <div className="text-[#9CA3AF] text-xs mt-0.5">1847 Industrial Pkwy · Austin, TX 78744</div>
              <div className="text-[#9CA3AF] text-xs">(512) 555-0192 · hello@stonecraftco.com</div>
            </div>
            <div className="sm:text-right">
              <div className="text-white text-xl sm:text-2xl font-bold">INVOICE</div>
              <div className="text-[#9CA3AF] text-sm mt-0.5">{invoice.invoiceNumber}</div>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-8 py-5 sm:py-6">
          {/* Meta row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
            <div>
              <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-1.5">Bill To</p>
              <p className="font-semibold text-[#1A1D23]">{invoice.customerName}</p>
              <p className="text-sm text-[#6B7280]">{invoice.customerEmail}</p>
              <p className="text-sm text-[#6B7280]">{invoice.customerPhone}</p>
            </div>
            <div className="sm:text-right">
              <div className="space-y-1 text-sm">
                <div className="flex sm:justify-end gap-3">
                  <span className="text-[#9CA3AF]">Invoice Date:</span>
                  <span className="font-medium text-[#1A1D23]">{new Date(invoice.dateCreated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex sm:justify-end gap-3">
                  <span className="text-[#9CA3AF]">Due Date:</span>
                  <span className={`font-medium ${invoice.status === 'Overdue' ? 'text-red-600' : 'text-[#1A1D23]'}`}>
                    {invoice.dateDue ? new Date(invoice.dateDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                  </span>
                </div>
                <div className="flex sm:justify-end gap-3 items-center">
                  <span className="text-[#9CA3AF]">Status:</span>
                  <Badge status={invoice.status} />
                </div>
                {invoice.datePaid && (
                  <div className="flex sm:justify-end gap-3">
                    <span className="text-[#9CA3AF]">Paid:</span>
                    <span className="font-medium text-green-700">{new Date(invoice.datePaid).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Job reference */}
          <div className="bg-[#F8F9FA] rounded-md px-4 py-3 mb-5 sm:mb-6">
            <p className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wide">Project</p>
            <p className="text-sm font-semibold text-[#1A1D23] mt-0.5">{invoice.jobName}</p>
          </div>

          {/* Line items */}
          <div className="overflow-x-auto mb-5 sm:mb-6">
            <table className="w-full text-sm min-w-[260px]">
              <thead>
                <tr className="border-b-2 border-[#1A1D23]">
                  <th className="text-left py-2.5 text-xs font-semibold text-[#1A1D23] uppercase tracking-wide">Description</th>
                  <th className="text-right py-2.5 px-3 text-xs font-semibold text-[#1A1D23] uppercase tracking-wide">Qty</th>
                  <th className="text-right py-2.5 px-3 text-xs font-semibold text-[#1A1D23] uppercase tracking-wide hidden sm:table-cell">Unit Price</th>
                  <th className="text-right py-2.5 text-xs font-semibold text-[#1A1D23] uppercase tracking-wide">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.lineItems.map((item, i) => (
                  <tr key={i} className="border-b border-[#F3F4F6]">
                    <td className="py-3 text-[#1A1D23] text-xs sm:text-sm">{item.description}</td>
                    <td className="py-3 px-3 text-right text-[#6B7280] text-xs sm:text-sm whitespace-nowrap">{item.qty} {item.unit}</td>
                    <td className="py-3 px-3 text-right text-[#6B7280] hidden sm:table-cell">${item.unitPrice.toLocaleString()}</td>
                    <td className="py-3 text-right font-medium text-[#1A1D23] whitespace-nowrap">{fmt(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-48 sm:w-56">
              <div className="flex justify-between py-2 text-sm border-t border-[#E5E7EB]">
                <span className="text-[#6B7280]">Subtotal</span>
                <span className="font-medium text-[#1A1D23]">{fmt(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm border-t border-[#E5E7EB]">
                <span className="text-[#6B7280]">Tax</span>
                <span className="text-[#6B7280]">$0.00</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-[#1A1D23]">
                <span className="font-semibold text-[#1A1D23]">Total Due</span>
                <span className={`font-bold text-lg sm:text-xl ${invoice.status === 'Overdue' ? 'text-red-600' : 'text-[#1A1D23]'}`}>{fmt(invoice.total)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-5 pt-4 sm:pt-5 border-t border-[#E5E7EB]">
              <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-1.5">Notes</p>
              <p className="text-sm text-[#6B7280] leading-relaxed">{invoice.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-8 py-4 bg-[#F8F9FA] border-t border-[#E5E7EB]">
          <p className="text-xs text-[#9CA3AF] mb-3">Questions? Call (512) 555-0192 or email hello@stonecraftco.com</p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="secondary" size="sm">Print / PDF</Button>
            {invoice.status !== 'Paid' && (
              <Button variant={invoice.status === 'Overdue' ? 'danger' : 'primary'} size="sm">Mark as Paid</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
