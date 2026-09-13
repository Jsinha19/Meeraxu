import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { servicesAPI, projectsAPI, contactFormsAPI } from "../api/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    services: 0,
    projects: 0,
    leads: 0,
    newLeads: 0,
    readLeads: 0,
    repliedLeads: 0,
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchCounts = async () => {
      try {
        setLoading(true);
        const [services, projects, leads] = await Promise.all([
          servicesAPI.getAll(),
          projectsAPI.getAll(),
          contactFormsAPI.getAll(),
        ]);

        const statusSummary = {
          new: 0,
          read: 0,
          replied: 0,
        };

        leads.forEach((lead) => {
          if (statusSummary[lead.status] !== undefined) {
            statusSummary[lead.status] += 1;
          }
        });

        setCounts({
          services: services.length,
          projects: projects.length,
          leads: leads.length,
          newLeads: statusSummary.new,
          readLeads: statusSummary.read,
          repliedLeads: statusSummary.replied,
        });
        setRecentLeads(leads.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="w-6 h-6 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="font-semibold text-lg m-0">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Services",
      value: counts.services.toString(),
      icon: "🔧",
      tone: "bg-blue-50 text-blue-600 border-blue-200",
      path: "/admin/services",
    },
    {
      label: "Total Projects",
      value: counts.projects.toString(),
      icon: "📁",
      tone: "bg-violet-50 text-violet-600 border-violet-200",
      path: "/admin/projects",
    },
    {
      label: "Contact Leads",
      value: counts.leads.toString(),
      icon: "✉️",
      tone: "bg-pink-50 text-pink-600 border-pink-200",
      path: "/admin/contact-forms",
    },
    {
      label: "New Leads",
      value: counts.newLeads.toString(),
      icon: "📬",
      tone: "bg-emerald-50 text-emerald-600 border-emerald-200",
      path: "/admin/contact-forms",
    },
  ];

  const conversionRate = counts.leads
    ? Math.round((counts.repliedLeads / counts.leads) * 100)
    : 0;

  const pipeline = [
    { label: "New", value: counts.newLeads, color: "bg-emerald-500" },
    { label: "Read", value: counts.readLeads, color: "bg-blue-500" },
    { label: "Replied", value: counts.repliedLeads, color: "bg-violet-500" },
  ];

  return (
    <div className="p-3 sm:p-4 lg:p-5 bg-slate-50 min-h-screen font-sans max-w-[1500px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-5 gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 m-0 mb-1 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 text-xs m-0">
            Welcome back to your admin panel
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300"
            onClick={() => navigate(stat.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(stat.path);
              }
            }}
          >
            <div
              className={`w-11 h-11 rounded-lg border flex items-center justify-center text-xl ${stat.tone}`}
            >
              {stat.icon}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500 mb-1 font-bold">
                {stat.label}
              </p>
              <h3 className="text-2xl font-extrabold text-slate-900 m-0 leading-none">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-3">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500 font-bold mb-1">
                Website Overview
              </p>
              <h2 className="text-lg font-bold text-slate-900 m-0">
                Lead funnel
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
              {conversionRate}% replied
            </span>
          </div>

          <div className="space-y-3">
            {pipeline.map((item) => {
              const maxValue = Math.max(
                ...pipeline.map((entry) => entry.value),
                1,
              );
              const width = Math.max(
                (item.value / maxValue) * 100,
                item.value > 0 ? 14 : 0,
              );

              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1 text-xs text-slate-600">
                    <span className="font-semibold">{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="mb-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500 font-bold mb-1">
              Recent Leads
            </p>
            <h2 className="text-lg font-bold text-slate-900 m-0">
              Latest enquiries
            </h2>
          </div>

          <div className="space-y-2.5">
            {recentLeads.length === 0 ? (
              <div className="text-sm text-slate-500 py-3">
                No recent enquiries.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <button
                  key={lead._id}
                  type="button"
                  className="w-full text-left rounded-lg border border-slate-200 p-2.5 hover:bg-slate-50 transition-colors"
                  onClick={() => navigate("/admin/contact-forms")}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-800 truncate">
                      {lead.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.08em] font-bold border bg-slate-100 text-slate-700 border-slate-200">
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {lead.project || lead.subject}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
