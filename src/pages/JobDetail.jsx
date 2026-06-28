import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import JobDetailView from '../components/jobs/JobDetail';
import { jobs } from '../data/jobs';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <p className="text-[#6B7280]">Job not found.</p>
          <button onClick={() => navigate('/jobs')} className="text-[#3B5BDB] text-sm mt-3 hover:underline">
            Back to Jobs
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <JobDetailView job={job} />
    </PageWrapper>
  );
}
