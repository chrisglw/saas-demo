import { useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import SearchInput from '../components/ui/SearchInput';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ContactList from '../components/contacts/ContactList';
import ContactDetail from '../components/contacts/ContactDetail';
import { contacts } from '../data/contacts';

export default function Contacts() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = contacts.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company?.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (contact) => setSelected(contact);
  const handleBack = () => setSelected(null);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-[#1A1D23]">Contacts</h2>
        <Button size="sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Contact
        </Button>
      </div>

      {/* Mobile: show list OR detail */}
      <div className="lg:hidden">
        {selected ? (
          <div>
            <button
              onClick={handleBack}
              className="text-xs text-[#6B7280] hover:text-[#3B5BDB] mb-4 flex items-center gap-1 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              All Contacts
            </button>
            <ContactDetail contact={selected} />
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <SearchInput value={search} onChange={setSearch} placeholder="Search contacts..." />
            </div>
            {filtered.length > 0 ? (
              <ContactList contacts={filtered} selectedId={selected?.id} onSelect={handleSelect} />
            ) : (
              <EmptyState
                icon="👥"
                title="No contacts found"
                description={`No contacts match "${search}".`}
                actionLabel="Clear search"
                onAction={() => setSearch('')}
              />
            )}
          </div>
        )}
      </div>

      {/* Desktop: side-by-side */}
      <div className="hidden lg:grid grid-cols-5 gap-5">
        <div className="col-span-2">
          <div className="mb-3">
            <SearchInput value={search} onChange={setSearch} placeholder="Search contacts..." />
          </div>
          {filtered.length > 0 ? (
            <ContactList
              contacts={filtered}
              selectedId={selected?.id}
              onSelect={handleSelect}
            />
          ) : (
            <EmptyState
              icon="👥"
              title="No contacts found"
              description={`No contacts match "${search}".`}
              actionLabel="Clear search"
              onAction={() => setSearch('')}
            />
          )}
        </div>
        <div className="col-span-3">
          {selected ? (
            <ContactDetail contact={selected} />
          ) : (
            <div className="flex items-center justify-center h-48 text-[#9CA3AF] text-sm">
              Select a contact to view details
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
