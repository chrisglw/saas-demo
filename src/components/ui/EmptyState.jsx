import Button from './Button';

export default function EmptyState({ title, description, actionLabel, onAction, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-4 text-2xl">
        {icon || '📋'}
      </div>
      <h3 className="text-[15px] font-semibold text-[#1A1D23] mb-1">{title}</h3>
      <p className="text-sm text-[#6B7280] mb-5 max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
