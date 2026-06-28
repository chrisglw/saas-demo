import { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import EmptyState from '../components/ui/EmptyState';
import FileGrid from '../components/files/FileGrid';
import { files } from '../data/files';

const categories = ['All', ...Array.from(new Set(files.map(f => f.category)))];

export default function Files() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = files.filter(f => {
    const matchCat = category === 'All' || f.category === category;
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.jobName.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#1A1D23]">Files</h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">{files.length} files across all jobs</p>
        </div>
        <Button size="sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          Upload
        </Button>
      </div>

      <div className="space-y-3 mb-4 sm:mb-5">
        <div className="flex gap-1 overflow-x-auto pb-0.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-2.5 py-1.5 text-xs sm:text-sm rounded-md font-medium whitespace-nowrap transition-colors shrink-0 border ${
                category === cat
                  ? 'bg-[#EEF2FF] text-[#3B5BDB] border-[#EEF2FF]'
                  : 'text-[#6B7280] bg-white border-[#E5E7EB] hover:bg-[#F8F9FA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search files..." />
      </div>

      {filtered.length > 0 ? (
        <FileGrid files={filtered} />
      ) : (
        <EmptyState
          icon="📁"
          title="No files found"
          description={search ? `No files match "${search}".` : `No files in category "${category}".`}
          actionLabel="Clear filters"
          onAction={() => { setSearch(''); setCategory('All'); }}
        />
      )}
    </PageWrapper>
  );
}
