import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import EstimateDetailView from '../components/estimates/EstimateDetail';
import { estimates } from '../data/estimates';

export default function EstimateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const estimate = estimates.find(e => e.id === id);

  if (!estimate) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <p className="text-[#6B7280]">Estimate not found.</p>
          <button onClick={() => navigate('/estimates')} className="text-[#3B5BDB] text-sm mt-3 hover:underline">
            Back to Estimates
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <EstimateDetailView estimate={estimate} />
    </PageWrapper>
  );
}
