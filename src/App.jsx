import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';

import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Contacts from './pages/Contacts';
import Inventory from './pages/Inventory';
import Estimates from './pages/Estimates';
import EstimateDetail from './pages/EstimateDetail';
import Invoices from './pages/Invoices';
import InvoiceDetail from './pages/InvoiceDetail';
import Files from './pages/Files';

const pageTitles = {
  '/': 'Dashboard',
  '/jobs': 'Jobs',
  '/contacts': 'Contacts',
  '/inventory': 'Inventory',
  '/estimates': 'Estimates',
  '/invoices': 'Invoices',
  '/files': 'Files',
};

function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const base = '/' + location.pathname.split('/')[1];
  const title = pageTitles[base] || pageTitles[location.pathname] || 'StoneCraft';

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar title={title} onMenuClick={() => setMobileOpen(true)} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/estimates" element={<Estimates />} />
          <Route path="/estimates/:id" element={<EstimateDetail />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/:id" element={<InvoiceDetail />} />
          <Route path="/files" element={<Files />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/saas-demo">
      <AppShell />
    </BrowserRouter>
  );
}
