import { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import InvoiceList from '../components/invoices/InvoiceList';
import { invoices } from '../data/invoices';

const STATUS_TABS = ['All', 'Draft', 'Sent', 'Overdue', 'Paid'];

export default function Invoices() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = invoices.filter(i => activeTab === 'All' || i.status === activeTab);
  const totalUnpaid = invoices.filter(i => ['Sent', 'Overdue'].includes(i.status)).reduce((s, i) => s + i.total, 0);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#1A1D23]">Invoices</h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">${totalUnpaid.toLocaleString()} outstanding</p>
        </div>
        <Button size="sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Invoice
        </Button>
      </div>

      <Card>
        <div className="flex gap-1 p-3 sm:p-4 border-b border-[#E5E7EB] overflow-x-auto">
          {STATUS_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1.5 text-xs sm:text-sm rounded-md font-medium whitespace-nowrap transition-colors shrink-0 ${
                activeTab === tab
                  ? 'bg-[#EEF2FF] text-[#3B5BDB]'
                  : tab === 'Overdue' && invoices.some(i => i.status === 'Overdue')
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-[#6B7280] hover:bg-[#F8F9FA] hover:text-[#1A1D23]'
              }`}
            >
              {tab}
              <span className={`ml-1 text-xs ${activeTab === tab ? 'text-[#3B5BDB]' : 'text-[#9CA3AF]'}`}>
                {tab === 'All' ? invoices.length : invoices.filter(i => i.status === tab).length}
              </span>
            </button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <InvoiceList invoices={filtered} />
        ) : (
          <EmptyState
            icon="💳"
            title="No invoices"
            description={`No invoices with status "${activeTab}".`}
            actionLabel="Clear filter"
            onAction={() => setActiveTab('All')}
          />
        )}
      </Card>
    </PageWrapper>
  );
}
