export default function InventoryTable({ items }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[320px]">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Item</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide hidden sm:table-cell">SKU</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide hidden sm:table-cell">Category</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">On Hand</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide hidden sm:table-cell">Allocated</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Available</th>
            <th className="py-3 px-4 text-xs font-medium text-[#6B7280] uppercase tracking-wide w-16"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            const available = item.quantityOnHand - item.quantityAllocated;
            const isLow = item.quantityOnHand <= item.reorderPoint;
            const isCritical = available <= 0;
            return (
              <tr key={item.id} className={`border-b border-[#F3F4F6] ${isLow ? 'bg-amber-50/40' : ''}`}>
                <td className="py-3.5 px-4 font-medium text-[#1A1D23]">{item.name}</td>
                <td className="py-3.5 px-4 text-[#9CA3AF] font-mono text-xs hidden sm:table-cell">{item.sku}</td>
                <td className="py-3.5 px-4 text-[#6B7280] hidden sm:table-cell">{item.category}</td>
                <td className="py-3.5 px-4 text-right text-[#1A1D23]">{item.quantityOnHand} <span className="text-[#9CA3AF] hidden sm:inline">{item.unit}</span></td>
                <td className="py-3.5 px-4 text-right text-[#6B7280] hidden sm:table-cell">{item.quantityAllocated}</td>
                <td className={`py-3.5 px-4 text-right font-semibold ${isCritical ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-green-700'}`}>
                  {available}
                </td>
                <td className="py-3.5 px-4 text-right">
                  {isCritical ? (
                    <span className="inline-flex items-center text-xs text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded-full border border-red-200">Out</span>
                  ) : isLow ? (
                    <span className="inline-flex items-center text-xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Low</span>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
