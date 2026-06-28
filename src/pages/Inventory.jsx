import { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchInput from '../components/ui/SearchInput';
import InventoryTable from '../components/inventory/InventoryTable';
import { inventory } from '../data/inventory';

const categories = ['All', ...Array.from(new Set(inventory.map(i => i.category)))];

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = inventory.filter(item => {
    const matchCat = category === 'All' || item.category === category;
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const lowCount = inventory.filter(i => i.quantityOnHand <= i.reorderPoint).length;

  return (
    <PageWrapper>
      <div className="flex items-start justify-between mb-4 sm:mb-6 gap-3 flex-wrap">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#1A1D23]">Inventory</h2>
          {lowCount > 0 && (
            <p className="text-xs sm:text-sm text-amber-600 mt-0.5 flex items-center gap-1">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              {lowCount} item{lowCount !== 1 ? 's' : ''} at or below reorder point
            </p>
          )}
        </div>
        <Button size="sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Item
        </Button>
      </div>

      <Card>
        <div className="p-3 sm:p-4 border-b border-[#E5E7EB] space-y-2">
          <div className="flex gap-1 overflow-x-auto pb-0.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-2.5 py-1.5 text-xs sm:text-sm rounded-md font-medium whitespace-nowrap transition-colors shrink-0 ${
                  category === cat
                    ? 'bg-[#EEF2FF] text-[#3B5BDB]'
                    : 'text-[#6B7280] hover:bg-[#F8F9FA] hover:text-[#1A1D23]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <SearchInput value={search} onChange={setSearch} placeholder="Search items..." />
        </div>
        {filtered.length > 0 ? (
          <InventoryTable items={filtered} />
        ) : (
          <div className="py-12 text-center text-sm text-[#9CA3AF]">No items match your filters.</div>
        )}
      </Card>
    </PageWrapper>
  );
}
