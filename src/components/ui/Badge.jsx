const statusStyles = {
  // Job statuses
  'New': 'bg-blue-50 text-blue-700 border border-blue-200',
  'In Progress': 'bg-amber-50 text-amber-700 border border-amber-200',
  'Completed': 'bg-green-50 text-green-700 border border-green-200',
  'On Hold': 'bg-gray-100 text-gray-600 border border-gray-200',
  // Estimate statuses
  'Draft': 'bg-gray-100 text-gray-600 border border-gray-200',
  'Sent': 'bg-blue-50 text-blue-700 border border-blue-200',
  'Approved': 'bg-green-50 text-green-700 border border-green-200',
  'Declined': 'bg-red-50 text-red-700 border border-red-200',
  // Invoice statuses
  'Paid': 'bg-green-50 text-green-700 border border-green-200',
  'Overdue': 'bg-red-50 text-red-700 border border-red-200',
  'Not Sent': 'bg-gray-100 text-gray-600 border border-gray-200',
};

export default function Badge({ status }) {
  const style = statusStyles[status] || 'bg-gray-100 text-gray-600 border border-gray-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}
