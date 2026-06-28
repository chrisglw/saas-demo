import { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import EmptyState from '../components/ui/EmptyState';
import JobTable from '../components/jobs/JobTable';
import { jobs } from '../data/jobs';

const STATUS_TABS = ['All', 'New', 'In Progress', 'On Hold', 'Completed'];

export default function Jobs() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = jobs.filter(j => {
    const matchTab = activeTab === 'All' || j.status === activeTab;
    const matchSearch = !search || j.name.toLowerCase().includes(search.toLowerCase()) || j.customerName.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-[#1A1D23]">Jobs</h2>
        <Button size="sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Job
        </Button>
      </div>

      <Card>
        <div className="p-3 sm:p-4 border-b border-[#E5E7EB] space-y-2">
          {/* Status tabs — horizontally scrollable */}
          <div className="flex gap-1 overflow-x-auto pb-0.5 -mx-0.5 px-0.5">
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
                  {tab === 'All' ? jobs.length : jobs.filter(j => j.status === tab).length}
                </span>
              </button>
            ))}
          </div>
          <SearchInput value={search} onChange={setSearch} placeholder="Search jobs..." />
        </div>

        {filtered.length > 0 ? (
          <JobTable jobs={filtered} />
        ) : (
          <EmptyState
            icon="📋"
            title="No jobs found"
            description={search ? `No jobs match "${search}".` : `No jobs with status "${activeTab}".`}
            actionLabel="Clear filters"
            onAction={() => { setActiveTab('All'); setSearch(''); }}
          />
        )}
      </Card>
    </PageWrapper>
  );
}
