import { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import EstimateList from '../components/estimates/EstimateList';
import { estimates } from '../data/estimates';

const STATUS_TABS = ['All', 'Draft', 'Sent', 'Approved', 'Declined'];

export default function Estimates() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = estimates.filter(e => activeTab === 'All' || e.status === activeTab);
  const totalValue = filtered.reduce((s, e) => s + e.total, 0);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#1A1D23]">Estimates</h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">{filtered.length} estimate{filtered.length !== 1 ? 's' : ''} · ${totalValue.toLocaleString()}</p>
        </div>
        <Button size="sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Estimate
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
                  : 'text-[#6B7280] hover:bg-[#F8F9FA] hover:text-[#1A1D23]'
              }`}
            >
              {tab}
              <span className={`ml-1 text-xs ${activeTab === tab ? 'text-[#3B5BDB]' : 'text-[#9CA3AF]'}`}>
                {tab === 'All' ? estimates.length : estimates.filter(e => e.status === tab).length}
              </span>
            </button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <EstimateList estimates={filtered} />
        ) : (
          <EmptyState
            icon="📄"
            title="No estimates"
            description={`No estimates with status "${activeTab}".`}
            actionLabel="Clear filter"
            onAction={() => setActiveTab('All')}
          />
        )}
      </Card>
    </PageWrapper>
  );
}
