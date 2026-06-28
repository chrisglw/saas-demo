import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { jobs } from '../../data/jobs';

export default function ContactDetail({ contact }) {
  const navigate = useNavigate();
  const contactJobs = jobs.filter(j => j.contactId === contact.id);

  return (
    <div className="space-y-5">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#3B5BDB] text-base font-semibold shrink-0">
            {contact.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#1A1D23]">{contact.name}</h3>
            {contact.company && <p className="text-sm text-[#6B7280] mt-0.5">{contact.company}</p>}
            <div className="flex flex-col gap-1.5 mt-3">
              <a href={`tel:${contact.phone}`} className="text-sm text-[#3B5BDB] flex items-center gap-1.5 hover:underline">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="text-sm text-[#3B5BDB] flex items-center gap-1.5 hover:underline">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {contact.email}
              </a>
            </div>
          </div>
        </div>
        {contact.notes && (
          <div className="mt-4 pt-4 border-t border-[#F3F4F6]">
            <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-1">Notes</p>
            <p className="text-sm text-[#6B7280]">{contact.notes}</p>
          </div>
        )}
      </Card>

      {/* Jobs */}
      <div>
        <h3 className="text-sm font-semibold text-[#1A1D23] mb-3">Jobs ({contactJobs.length})</h3>
        {contactJobs.length > 0 ? (
          <div className="space-y-2">
            {contactJobs.map(job => (
              <Card
                key={job.id}
                className="p-3.5 cursor-pointer hover:border-[#3B5BDB] transition-colors"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#1A1D23]">{job.name}</p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">{new Date(job.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge status={job.status} />
                    <span className="text-sm font-medium text-[#1A1D23]">${job.value.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#9CA3AF]">No jobs yet for this contact.</p>
        )}
      </div>
    </div>
  );
}
