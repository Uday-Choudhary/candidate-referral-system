import React, { useEffect, useState } from 'react';
import { fetchCandidates, updateCandidateStatus } from '../api';

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const data = await fetchCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    const originalCandidates = [...candidates];
    setCandidates(candidates.map(c => c._id === id ? { ...c, status: newStatus } : c));

    try {
      await updateCandidateStatus(id, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      setCandidates(originalCandidates);
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(filter.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: candidates.length,
    hired: candidates.filter(c => c.status === 'Hired').length,
    pending: candidates.filter(c => c.status === 'Pending').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hired': return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'Reviewed': return 'bg-blue-50 text-blue-700 ring-blue-700/10';
      default: return 'bg-yellow-50 text-yellow-800 ring-yellow-600/20';
    }
  };

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Referrals" value={stats.total} icon="users" />
        <StatCard label="Pending Review" value={stats.pending} icon="clock" />
        <StatCard label="Successfully Hired" value={stats.hired} icon="check" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/50 p-2 rounded-2xl border border-gray-100 backdrop-blur-sm">
        <div className="relative w-full sm:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search candidates or roles..."
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <select
            className="w-full appearance-none cursor-pointer py-2.5 pl-4 pr-10 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Hired">Hired</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading candidates...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <div key={candidate._id} className="group relative flex flex-col bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 leading-tight">{candidate.name}</h3>
                    <p className="text-sm text-gray-500">{candidate.jobTitle}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(candidate.status)}`}>
                  {candidate.status}
                </span>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span className="truncate">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span>{candidate.phone}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between gap-3">
                {candidate.resumeUrl ? (
                  <a
                    href={`${import.meta.env.VITE_API_BASE_URL}/${candidate.resumeUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-blue-50"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    Resume
                  </a>
                ) : (
                  <span className="text-xs text-gray-400 italic px-2">No Resume</span>
                )}

                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium py-1.5 pl-3 pr-8 rounded-lg cursor-pointer transition-colors border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={candidate.status}
                    onChange={(e) => handleStatusUpdate(candidate._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Hired">Hired</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredCandidates.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-2xl border border-dashed border-gray-300">
          <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <h3 className="text-gray-900 font-medium">No candidates found</h3>
          <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters</p>
          <button onClick={() => { setFilter(''); setStatusFilter('All'); }} className="mt-4 text-sm text-blue-600 font-medium hover:underline">Clear all filters</button>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon }) => {
  const icons = {
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icons[icon]}
        </svg>
      </div>
    </div>
  );
};

export default Dashboard;