import { useNavigate } from 'react-router-dom';

const iconMap = {
  invoice: { bg: 'bg-blue-50', color: 'text-blue-500', svg: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
  job: { bg: 'bg-indigo-50', color: 'text-indigo-500', svg: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
  estimate: { bg: 'bg-violet-50', color: 'text-violet-500', svg: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
  payment: { bg: 'bg-green-50', color: 'text-green-500', svg: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  file: { bg: 'bg-slate-50', color: 'text-slate-500', svg: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg> },
  alert: { bg: 'bg-red-50', color: 'text-red-500', svg: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
};

function timeAgo(timestamp) {
  const now = new Date('2026-06-23');
  const then = new Date(timestamp);
  const days = Math.floor((now - then) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function ActivityFeed({ items }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-1">
      {items.map(item => {
        const icon = iconMap[item.icon] || iconMap.job;
        return (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F8F9FA] cursor-pointer transition-colors"
            onClick={() => item.jobId && navigate(`/jobs/${item.jobId}`)}
          >
            <div className={`w-8 h-8 rounded-lg ${icon.bg} ${icon.color} flex items-center justify-center shrink-0 mt-0.5`}>
              {icon.svg}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1A1D23] leading-snug">{item.message}</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">{item.detail}</p>
            </div>
            <span className="text-xs text-[#9CA3AF] shrink-0 mt-0.5">{timeAgo(item.timestamp)}</span>
          </div>
        );
      })}
    </div>
  );
}
