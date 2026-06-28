import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import InvoiceDetailView from '../components/invoices/InvoiceDetail';
import { invoices } from '../data/invoices';

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoice = invoices.find(i => i.id === id);

  if (!invoice) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <p className="text-[#6B7280]">Invoice not found.</p>
          <button onClick={() => navigate('/invoices')} className="text-[#3B5BDB] text-sm mt-3 hover:underline">
            Back to Invoices
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <InvoiceDetailView invoice={invoice} />
    </PageWrapper>
  );
}
