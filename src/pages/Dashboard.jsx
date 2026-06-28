import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import StatCard from '../components/dashboard/StatCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { jobs } from '../data/jobs';
import { estimates } from '../data/estimates';
import { invoices } from '../data/invoices';
import { inventory } from '../data/inventory';
import { activity } from '../data/activity';

export default function Dashboard() {
  const navigate = useNavigate();

  const activeJobs = jobs.filter(j => ['New', 'In Progress'].includes(j.status)).length;
  const openEstimates = estimates.filter(e => ['Draft', 'Sent'].includes(e.status));
  const openEstimatesValue = openEstimates.reduce((s, e) => s + e.total, 0);
  const unpaidInvoices = invoices.filter(i => ['Sent', 'Overdue'].includes(i.status));
  const unpaidValue = unpaidInvoices.reduce((s, i) => s + i.total, 0);
  const lowInventory = inventory.filter(i => i.quantityOnHand <= i.reorderPoint).length;

  return (
    <PageWrapper>
      {/* Page header */}
      <div className="mb-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#1A1D23]">Good morning</h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">Here's what's happening at StoneCraft today.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="secondary" size="sm" onClick={() => navigate('/estimates')}>New Estimate</Button>
            <Button size="sm" onClick={() => navigate('/jobs')}>New Job</Button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-5">
        <div onClick={() => navigate('/jobs')} className="cursor-pointer">
          <StatCard
            label="Active Jobs"
            value={activeJobs}
            sub="in progress or new"
            icon={<svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
          />
        </div>
        <div onClick={() => navigate('/estimates')} className="cursor-pointer">
          <StatCard
            label="Open Estimates"
            value={openEstimates.length}
            sub={`$${openEstimatesValue.toLocaleString()}`}
            icon={<svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
          />
        </div>
        <div onClick={() => navigate('/invoices')} className="cursor-pointer">
          <StatCard
            label="Unpaid Invoices"
            value={unpaidInvoices.length}
            sub={`$${unpaidValue.toLocaleString()}`}
            accent={unpaidInvoices.some(i => i.status === 'Overdue')}
            icon={<svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          />
        </div>
        <div onClick={() => navigate('/inventory')} className="cursor-pointer">
          <StatCard
            label="Low Inventory"
            value={lowInventory}
            sub="below reorder"
            accent={lowInventory > 0}
            icon={<svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Activity feed */}
        <div className="lg:col-span-2">
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-[#1A1D23] mb-3">Recent Activity</h3>
            <ActivityFeed items={activity} />
          </Card>
        </div>

        {/* Quick actions + alerts */}
        <div className="space-y-3 sm:space-y-4">
          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-[#1A1D23] mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'New Job', path: '/jobs' },
                { label: 'New Estimate', path: '/estimates' },
                { label: 'New Invoice', path: '/invoices' },
                { label: 'Add Contact', path: '/contacts' },
              ].map(({ label, path }) => (
                <Button key={label} variant="secondary" className="w-full justify-start" onClick={() => navigate(path)}>
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  {label}
                </Button>
              ))}
            </div>
          </Card>

          {invoices.some(i => i.status === 'Overdue') && (
            <Card className="p-4 bg-red-50 border-red-200">
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <div>
                  <p className="text-sm font-semibold text-[#1A1D23]">Overdue Invoice</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">Chen Architecture Office — $6,400 past due</p>
                  <button onClick={() => navigate('/invoices/inv-j8')} className="text-xs text-red-600 font-medium mt-2 hover:underline">
                    View Invoice →
                  </button>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-[#1A1D23] mb-3">Jobs by Status</h3>
            {['New', 'In Progress', 'On Hold', 'Completed'].map(status => {
              const count = jobs.filter(j => j.status === status).length;
              const pct = Math.round((count / jobs.length) * 100);
              const barColor = { 'New': 'bg-blue-400', 'In Progress': 'bg-amber-400', 'On Hold': 'bg-gray-400', 'Completed': 'bg-green-400' }[status];
              return (
                <div key={status} className="mb-2.5 last:mb-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#6B7280]">{status}</span>
                    <span className="font-medium text-[#1A1D23]">{count}</span>
                  </div>
                  <div className="h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div className={`h-full ${barColor} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
