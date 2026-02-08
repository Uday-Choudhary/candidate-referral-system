import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import ReferralForm from "./components/ReferralForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/40 to-slate-100 text-gray-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {activeTab === "dashboard" ? "Dashboard" : "Refer a candidate"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeTab === "dashboard"
              ? "Overview of your referrals and activity"
              : "Help someone get an opportunity"}
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm p-6 min-h-[70vh]">
          {activeTab === "dashboard" ? (
            <Dashboard />
          ) : (
            <ReferralForm onReferralSuccess={() => setActiveTab("dashboard")} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
