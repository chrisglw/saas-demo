import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { estimates } from '../../data/estimates';
import { invoices } from '../../data/invoices';
import { files } from '../../data/files';

const TABS = ['Overview', 'Estimate', 'Invoice', 'Materials', 'Files', 'Activity'];

function fmt(n) {
  return '$' + n.toLocaleString();
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
        active
          ? 'border-[#3B5BDB] text-[#3B5BDB]'
          : 'border-transparent text-[#6B7280] hover:text-[#1A1D23] hover:border-[#E5E7EB]'
      }`}
    >
      {label}
    </button>
  );
}

function LineItemsTable({ items }) {
  const total = items.reduce((s, i) => s + i.total, 0);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[280px]">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            <th className="text-left py-2.5 px-0 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Description</th>
            <th className="text-right py-2.5 px-3 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Qty</th>
            <th className="text-right py-2.5 px-3 text-xs font-medium text-[#6B7280] uppercase tracking-wide hidden sm:table-cell">Unit Price</th>
            <th className="text-right py-2.5 px-0 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-b border-[#F3F4F6]">
              <td className="py-2.5 text-[#1A1D23]">{item.description}</td>
              <td className="py-2.5 px-3 text-right text-[#6B7280]">{item.qty} {item.unit}</td>
              <td className="py-2.5 px-3 text-right text-[#6B7280] hidden sm:table-cell">${item.unitPrice.toLocaleString()}</td>
              <td className="py-2.5 text-right font-medium text-[#1A1D23]">{fmt(item.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="pt-3 text-right font-semibold text-[#1A1D23]">Total</td>
            <td className="pt-3 text-right font-semibold text-[#1A1D23] text-base">{fmt(total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default function JobDetailView({ job }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  const estimate = estimates.find(e => e.id === job.estimateId);
  const invoice = invoices.find(i => i.id === job.invoiceId);
  const jobFiles = files.filter(f => f.jobId === job.id);

  const activityLog = [
    { date: '2026-06-18', action: 'Status changed to In Progress', user: 'Admin' },
    { date: '2026-06-15', action: 'Template measurements uploaded', user: 'Admin' },
    { date: '2026-06-01', action: 'Invoice sent to customer', user: 'Admin' },
    { date: '2026-05-12', action: 'Job created', user: 'Admin' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <button
          onClick={() => navigate('/jobs')}
          className="text-xs text-[#6B7280] hover:text-[#3B5BDB] mb-2 flex items-center gap-1 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          All Jobs
        </button>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-base sm:text-xl font-semibold text-[#1A1D23]">{job.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-xs sm:text-sm text-[#6B7280]">{job.customerName}</span>
              <Badge status={job.status} />
              {job.value > 0 && <span className="text-xs sm:text-sm font-medium text-[#1A1D23]">${job.value.toLocaleString()}</span>}
            </div>
          </div>
          <Button variant="secondary" size="sm" className="shrink-0">Edit Job</Button>
        </div>
      </div>

      {/* Tabs — horizontally scrollable */}
      <div className="border-b border-[#E5E7EB] mb-5 overflow-x-auto">
        <div className="flex">
          {TABS.map(tab => (
            <TabButton key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-[#1A1D23] mb-2">Description</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{job.description}</p>
            </Card>
            {job.notes && (
              <Card className="p-4 sm:p-5 bg-amber-50 border-amber-200">
                <h3 className="text-sm font-semibold text-[#1A1D23] mb-2 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                  Notes
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{job.notes}</p>
              </Card>
            )}
          </div>
          <div className="space-y-3 sm:space-y-4">
            <Card className="p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-[#1A1D23] mb-3">Key Dates</h3>
              <div className="space-y-2.5">
                <div>
                  <p className="text-xs text-[#9CA3AF]">Start Date</p>
                  <p className="text-sm font-medium text-[#1A1D23]">{new Date(job.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                {job.estimatedCompletion && (
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Est. Completion</p>
                    <p className="text-sm font-medium text-[#1A1D23]">{new Date(job.estimatedCompletion).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                )}
              </div>
            </Card>
            <Card className="p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-[#1A1D23] mb-3">Summary</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Estimate', value: <Badge status={estimate?.status || 'None'} /> },
                  { label: 'Invoice', value: <Badge status={invoice?.status || 'Not Sent'} /> },
                  { label: 'Materials', value: <span className="font-medium text-[#1A1D23] text-sm">{job.materials.length} items</span> },
                  { label: 'Files', value: <span className="font-medium text-[#1A1D23] text-sm">{jobFiles.length} files</span> },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center text-sm">
                    <span className="text-[#6B7280]">{label}</span>
                    {value}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'Estimate' && (
        <Card className="p-4 sm:p-6">
          {estimate ? (
            <>
              <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <div>
                  <h3 className="text-base font-semibold text-[#1A1D23]">{estimate.estimateNumber}</h3>
                  <p className="text-sm text-[#6B7280] mt-0.5">Created {new Date(estimate.dateCreated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <Badge status={estimate.status} />
              </div>
              <LineItemsTable items={estimate.lineItems} />
              {estimate.notes && <p className="text-xs text-[#9CA3AF] mt-4 pt-4 border-t border-[#F3F4F6]">{estimate.notes}</p>}
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-sm text-[#9CA3AF]">No estimate created yet.</p>
              <Button className="mt-4" size="sm">Create Estimate</Button>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'Invoice' && (
        <Card className="p-4 sm:p-6">
          {invoice ? (
            <>
              <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <div>
                  <h3 className="text-base font-semibold text-[#1A1D23]">{invoice.invoiceNumber}</h3>
                  <p className="text-sm text-[#6B7280] mt-0.5">
                    {invoice.dateDue ? `Due ${new Date(invoice.dateDue).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` : 'No due date set'}
                  </p>
                </div>
                <Badge status={invoice.status} />
              </div>
              <LineItemsTable items={invoice.lineItems} />
              {invoice.notes && <p className="text-xs text-[#9CA3AF] mt-4 pt-4 border-t border-[#F3F4F6]">{invoice.notes}</p>}
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-sm text-[#9CA3AF]">No invoice created yet.</p>
              <Button className="mt-4" size="sm">Create Invoice</Button>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'Materials' && (
        <Card>
          {job.materials.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[320px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Material</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Qty</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {job.materials.map((m, i) => (
                    <tr key={i} className="border-b border-[#F3F4F6]">
                      <td className="py-3 px-4 font-medium text-[#1A1D23]">{m.name}</td>
                      <td className="py-3 px-4 text-right text-[#6B7280]">{m.quantity}</td>
                      <td className="py-3 px-4 text-right text-[#6B7280]">{m.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-sm text-[#9CA3AF]">No materials allocated yet.</p>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'Files' && (
        <div>
          {jobFiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {jobFiles.map(file => (
                <Card key={file.id} className="p-3 sm:p-4 flex items-center gap-3 cursor-pointer">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${file.type === 'image' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                    {file.type === 'image' ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#1A1D23] truncate">{file.name}</p>
                    <p className="text-xs text-[#9CA3AF]">{file.size} · {new Date(file.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-sm text-[#9CA3AF]">No files attached.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Activity' && (
        <Card className="divide-y divide-[#F3F4F6]">
          {activityLog.map((entry, i) => (
            <div key={i} className="flex items-start gap-3 px-4 sm:px-5 py-3.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3B5BDB] mt-2 shrink-0" />
              <div>
                <p className="text-sm text-[#1A1D23]">{entry.action}</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {entry.user}</p>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
