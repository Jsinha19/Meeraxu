import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { contactFormsAPI } from "../api/client";

const getProjectType = (form) => {
  if (form.project?.trim()) return form.project.trim();

  const subjectMatch = form.subject?.match(/^\[([^\]]+)\]/);
  return subjectMatch?.[1] || "Not specified";
};

const ContactForms = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedForm, setSelectedForm] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const isSuperAdmin = localStorage.getItem("adminRole") === "super-admin";

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchContactForms();
  }, [navigate]);

  const fetchContactForms = async () => {
    try {
      setLoading(true);
      const data = await contactFormsAPI.getAll();
      setForms(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch contact forms");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await contactFormsAPI.update(id, newStatus);
      if (selectedForm?._id === id) {
        setSelectedForm({ ...selectedForm, status: newStatus });
      }
      fetchContactForms();
    } catch (err) {
      setError(err.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?"))
      return;
    try {
      await contactFormsAPI.delete(id);
      if (selectedForm?._id === id) setSelectedForm(null);
      fetchContactForms();
    } catch (err) {
      setError(err.message || "Failed to delete form");
    }
  };

  const filteredForms =
    filterStatus === "all"
      ? forms
      : forms.filter((form) => form.status === filterStatus);

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="w-6 h-6 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="font-semibold text-lg m-0">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-5 min-h-screen bg-slate-50 font-sans max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight m-0 mb-1">
            Contact Submissions
          </h1>
          <p className="text-slate-500 text-xs m-0">
            Manage and reply to inbound messages
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium flex items-center gap-3 shadow-sm text-sm">
          <span className="text-lg">⚠️</span>
          {error}
        </div>
      )}

      <div className="mb-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.14em]">
          Filter by status
        </label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-w-[140px] shadow-sm cursor-pointer transition-colors"
        >
          <option value="all">All submissions</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 lg:items-start">
        <div className="w-full lg:w-1/3 xl:w-1/4 bg-slate-100 rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[420px]">
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 m-0">
              Inbox ({filteredForms.length})
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-100">
            {filteredForms.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <span className="text-4xl block mb-3 opacity-50">📭</span>
                <p className="font-medium text-sm m-0">No submissions found</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-slate-200">
                {filteredForms.map((form) => (
                  <button
                    type="button"
                    key={form._id}
                    className={`text-left p-2.5 sm:p-3 w-full cursor-pointer transition-all duration-200 hover:bg-slate-50 ${
                      selectedForm?._id === form._id
                        ? "bg-white border-l-4 border-l-blue-600 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.04)]"
                        : form.status === "new"
                          ? "bg-emerald-50/30 border-l-4 border-l-emerald-500"
                          : "border-l-4 border-l-transparent bg-slate-100"
                    }`}
                    onClick={() => setSelectedForm(form)}
                  >
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h3
                        className={`text-xs m-0 truncate ${
                          selectedForm?._id === form._id
                            ? "font-extrabold text-slate-900"
                            : "font-bold text-slate-700"
                        }`}
                      >
                        {form.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.08em] shrink-0 border ${
                          form.status === "new"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : form.status === "read"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-slate-200 text-slate-700 border-slate-300"
                        }`}
                      >
                        {form.status}
                      </span>
                    </div>
                    <p className="text-[11px] m-0 mb-1.5 truncate text-slate-500">
                      {form.subject || "No subject"}
                    </p>
                    <div className="flex justify-between items-center text-[11px] text-slate-500 gap-2">
                      <p className="m-0 truncate max-w-[120px]">{form.email}</p>
                      <p className="m-0 whitespace-nowrap">
                        {new Date(form.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-2/3 xl:w-3/4">
          {selectedForm ? (
            <div className="bg-slate-100 rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4 animate-[fadeIn_0.2s_ease-out]">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-3 pb-3 border-b border-slate-200">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 m-0">
                    Contact request
                  </p>
                  <h2 className="text-xl font-extrabold text-slate-900 m-0 leading-tight">
                    {selectedForm.subject || "No subject"}
                  </h2>
                </div>
                <div className="text-xs font-medium text-slate-600 whitespace-nowrap bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                  {new Date(selectedForm.createdAt).toLocaleString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 mb-1.5">
                    Name
                  </p>
                  <p className="text-sm font-semibold text-slate-800 m-0">
                    {selectedForm.name}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 mb-1.5">
                    Email
                  </p>
                  <a
                    href={`mailto:${selectedForm.email}`}
                    className="block text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline transition-colors break-all m-0"
                  >
                    {selectedForm.email}
                  </a>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 mb-1.5">
                    Project type
                  </p>
                  <p className="text-sm font-semibold text-slate-800 m-0">
                    {getProjectType(selectedForm)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 mb-2">
                  Message
                </p>
                <div className="text-sm leading-6 text-slate-700 whitespace-pre-wrap bg-slate-50 border border-slate-200 rounded-lg p-3 min-h-[150px]">
                  {selectedForm.message || "No message provided."}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 mt-3 border-t border-slate-200">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    Update status
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {["new", "read", "replied"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        className={`px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-[0.05em] transition-all ${
                          selectedForm.status === status
                            ? status === "new"
                              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                              : status === "read"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                : "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                        onClick={() =>
                          handleStatusChange(selectedForm._id, status)
                        }
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {isSuperAdmin && (
                  <button
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all flex items-center gap-2 shadow-sm"
                    onClick={() => handleDelete(selectedForm._id)}
                  >
                    <span className="text-sm">🗑️</span> Delete submission
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 rounded-2xl shadow-sm border border-slate-200 h-full min-h-[500px] flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4 opacity-25">✉️</div>
              <h3 className="text-xl font-bold text-slate-700 m-0 mb-2">
                Select a submission
              </h3>
              <p className="text-slate-500 text-sm m-0">
                Choose a contact form from the list to review the full message.
              </p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ContactForms;
