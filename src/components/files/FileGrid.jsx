import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';

const typeIcons = {
  pdf: {
    bg: 'bg-red-50',
    color: 'text-red-500',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    label: 'PDF',
  },
  image: {
    bg: 'bg-blue-50',
    color: 'text-blue-500',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Image',
  },
};

export default function FileGrid({ files }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {files.map(file => {
        const icon = typeIcons[file.type] || typeIcons.pdf;
        return (
          <Card
            key={file.id}
            className="p-4 cursor-pointer hover:border-[#3B5BDB] transition-colors"
            onClick={() => navigate(`/jobs/${file.jobId}`)}
          >
            <div className={`w-10 h-10 rounded-lg ${icon.bg} ${icon.color} flex items-center justify-center mb-3`}>
              {icon.icon}
            </div>
            <p className="text-sm font-medium text-[#1A1D23] leading-snug break-all line-clamp-2">{file.name}</p>
            <div className="mt-2 space-y-0.5">
              <p className="text-xs text-[#9CA3AF]">{file.jobName}</p>
              <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                <span className={`font-medium ${icon.color}`}>{icon.label}</span>
                <span>·</span>
                <span>{file.size}</span>
                <span>·</span>
                <span>{new Date(file.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
