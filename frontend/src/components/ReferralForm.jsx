import React, { useState } from "react";
import { createCandidate } from "../api";

const ReferralForm = ({ onReferralSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await createCandidate(data);
      setMessage({
        type: "success",
        text: "Referral sent successfully. We’ll take it from here.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        jobTitle: "",
        resume: null,
      });
      onReferralSuccess?.();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Refer someone you trust
      </h2>

      {message.text && (
        <div
          className={`mb-6 rounded-lg p-4 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Candidate name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Ankit Verma"
              className="w-full p-3 rounded-lg border border-gray-300 text-sm
                focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="ankit.verma@gmail.com"
              className="w-full p-3 rounded-lg border border-gray-300 text-sm
                focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Phone number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              placeholder="10-digit mobile number"
              className="w-full p-3 rounded-lg border border-gray-300 text-sm
                focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Role they’re being referred for
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              placeholder="Frontend Engineer"
              className="w-full p-3 rounded-lg border border-gray-300 text-sm
                focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Resume (PDF)
          </label>

          <label className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 py-6 cursor-pointer hover:border-slate-400 transition">
            <span className="text-sm text-gray-500">
              {formData.resume
                ? `Selected: ${formData.resume.name}`
                : "Click to upload or drag & drop"}
            </span>
            <span className="text-xs text-gray-400 mt-1">
              PDF only · max 10MB
            </span>
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full rounded-lg py-3 text-sm font-medium transition-colors
              ${
                loading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-slate-800 text-white hover:bg-slate-900"
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400
            `}
          >
            {loading ? "Sending referral…" : "Send referral"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReferralForm;
