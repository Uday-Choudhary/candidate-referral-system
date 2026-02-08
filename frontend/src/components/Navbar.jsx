import React from "react";

const Navbar = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: "dashboard", label: "Dashboard" },
        { id: "referral", label: "New Referral" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-16 items-center justify-between">

                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white shadow-sm transition-transform group-hover:scale-105">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-sm font-bold tracking-tight text-gray-900">Worko</span>
                            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Referrals</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-gray-100/60 p-1 border border-gray-200/50">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ease-in-out
                                        ${isActive
                                            ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                                        }
                                    `}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="h-8 w-8 rounded-full bg-gradient-to-tr from-gray-900 to-gray-700 text-white text-xs font-medium flex items-center justify-center shadow-md hover:ring-2 hover:ring-gray-200 transition-all">
                            JD
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;