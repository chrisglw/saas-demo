import Card from '../ui/Card';

export default function ContactList({ contacts, selectedId, onSelect }) {
  return (
    <div className="space-y-2">
      {contacts.map(contact => (
        <Card
          key={contact.id}
          className={`p-4 cursor-pointer transition-all ${selectedId === contact.id ? 'border-[#3B5BDB] bg-[#EEF2FF]' : 'hover:border-gray-300'}`}
          onClick={() => onSelect(contact)}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#3B5BDB] text-sm font-semibold shrink-0">
              {contact.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#1A1D23] truncate">{contact.name}</p>
              <p className="text-xs text-[#9CA3AF] truncate">{contact.company || contact.email}</p>
            </div>
            <span className="ml-auto text-xs text-[#9CA3AF] shrink-0">{contact.jobCount} job{contact.jobCount !== 1 ? 's' : ''}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
