import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { projectsAPI } from "../api/client";

const DEFAULT_PHASES = [
  { n: "01", title: "", sub: "", body: "", bullets: [] },
  { n: "02", title: "", sub: "", body: "", bullets: [] },
  { n: "03", title: "", sub: "", body: "", bullets: [] },
  { n: "04", title: "", sub: "", body: "", bullets: [] },
];

const DEFAULT_GALLERY = [
  { mediaType: "image", url: "", content: "" },
  { mediaType: "image", url: "", content: "" },
  { mediaType: "image", url: "", content: "" },
];

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  technologies: "",
  stats: "",
  phases: DEFAULT_PHASES,
  gallery: DEFAULT_GALLERY,
};

const Projects = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const isSuperAdmin = localStorage.getItem("adminRole") === "super-admin";

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchProjects();
  }, [navigate]);

  const showError = (message) => {
    setError(message);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAll();
      setProjects(data || []);
      setError("");
    } catch (err) {
      showError(err.message || "Error fetching projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhaseChange = (index, field, value) => {
    const newPhases = [...formData.phases];
    newPhases[index] = {
      ...newPhases[index],
      [field]:
        field === "bullets"
          ? value
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item)
          : value,
    };
    setFormData((prev) => ({ ...prev, phases: newPhases }));
  };

  const handleGalleryChange = (index, field, value) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = { ...newGallery[index], [field]: value };
    setFormData((prev) => ({ ...prev, gallery: newGallery }));
  };

  const handleGalleryFile = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      const newGallery = [...formData.gallery];
      newGallery[index] = { ...newGallery[index], url: result };
      setFormData((prev) => ({ ...prev, gallery: newGallery }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      setImagePreview(result);
      setFormData((prev) => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setImageFileName("");
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setImagePreview("");
    setImageFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || "",
      description: project.description || "",
      category: project.category || "",
      imageUrl: project.imageUrl || "",
      technologies: (project.technologies || []).join(", "),
      stats: project.stats || "",
      phases:
        project.phases && project.phases.length > 0
          ? project.phases
          : DEFAULT_PHASES,
      gallery:
        project.gallery && project.gallery.length > 0
          ? project.gallery
          : DEFAULT_GALLERY,
    });
    setImagePreview(project.imageUrl || "");
    setImageFileName(project.imageUrl ? "Uploaded image" : "");
    setEditingId(project._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const technologies = formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);

      const projectData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        imageUrl: formData.imageUrl,
        technologies,
        stats: formData.stats,
        phases: formData.phases,
        gallery: formData.gallery,
      };

      if (editingId) {
        await projectsAPI.update(editingId, projectData);
      } else {
        await projectsAPI.create(projectData);
      }

      resetForm();
      fetchProjects();
      setError("");
    } catch (err) {
      showError(err.message || "Failed to save project");
    }
  };

  const handleDelete = async (id) => {
    try {
      await projectsAPI.delete(id);
      setDeleteConfirm(null);
      fetchProjects();
    } catch (err) {
      showError(err.message || "Failed to delete project");
    }
  };

  const renderProjectImage = (project, size = 40) => {
    if (project.imageUrl) {
      return (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="object-cover rounded-md"
          style={{ width: size, height: size }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      );
    }

    return (
      <div
        className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center font-bold text-white font-mono"
        style={{ width: size, height: size, fontSize: size * 0.3 }}
      >
        {project.category?.[0] || project.title?.[0] || "P"}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="w-6 h-6 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="font-semibold text-lg m-0">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50 font-sans max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight m-0 mb-1">
            Projects Management
          </h1>
          <p className="text-slate-500 text-sm m-0">
            Add, edit, or remove your portfolio projects
          </p>
        </div>
        {!showForm && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-200 shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:-translate-y-0.5"
            onClick={() => setShowForm(true)}
          >
            + Add New Project
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium flex items-center gap-3 shadow-sm">
          <span className="text-xl">⚠️</span>
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-8 animate-[slideIn_0.3s_ease-out] text-slate-900">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xl">
              {editingId ? "✏️" : "✨"}
            </div>
            <h2 className="text-xl font-bold text-slate-900 m-0">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium bg-slate-50 text-slate-900 focus:bg-white"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Automation, AI, Dashboard"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium bg-slate-50 text-slate-900 focus:bg-white placeholder:font-normal placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium bg-slate-50 text-slate-900 focus:bg-white resize-y"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Project Image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageFile}
              />

              {imagePreview ? (
                <div className="relative w-full rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white text-slate-800 font-bold text-xs py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      Change Image
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-red-500 text-white font-bold text-xs py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  {imageFileName && (
                    <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 font-medium truncate">
                      {imageFileName}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/50 rounded-xl py-8 flex flex-col items-center gap-2 transition-all duration-200 group cursor-pointer"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    🖼️
                  </span>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
                    Upload Image
                  </span>
                  <span className="text-xs text-slate-400">
                    Click to browse · PNG, JPG, WebP
                  </span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Technologies
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  placeholder="React, Node, MongoDB"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium bg-slate-50 text-slate-900 focus:bg-white"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Stats
                </label>
                <input
                  type="text"
                  name="stats"
                  value={formData.stats}
                  onChange={handleInputChange}
                  placeholder="e.g., 120% growth"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium bg-slate-50 text-slate-900 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <label className="text-sm font-bold text-slate-900 uppercase tracking-widest block mb-6">
                Project Phases (Cards)
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {formData.phases.map((phase, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-md uppercase">
                        Phase {phase.n}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Title
                        </label>
                        <input
                          type="text"
                          value={phase.title}
                          onChange={(e) =>
                            handlePhaseChange(idx, "title", e.target.value)
                          }
                          placeholder="e.g., Discovery"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-all text-xs font-medium"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={phase.sub}
                          onChange={(e) =>
                            handlePhaseChange(idx, "sub", e.target.value)
                          }
                          placeholder="e.g., Understanding landscape"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-all text-xs font-medium"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Description (Body)
                      </label>
                      <textarea
                        value={phase.body}
                        onChange={(e) =>
                          handlePhaseChange(idx, "body", e.target.value)
                        }
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-all text-xs font-medium resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Bullets (comma separated)
                      </label>
                      <input
                        type="text"
                        value={phase.bullets.join(", ")}
                        onChange={(e) =>
                          handlePhaseChange(idx, "bullets", e.target.value)
                        }
                        placeholder="e.g., Audit, Mapping, Analysis"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-all text-xs font-medium"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <label className="text-sm font-bold text-slate-900 uppercase tracking-widest block mb-6">
                Project Gallery (3 Modern Cards)
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {formData.gallery.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-md uppercase">
                        Card {idx + 1}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Media Type
                      </label>
                      <select
                        value={item.mediaType}
                        onChange={(e) =>
                          handleGalleryChange(idx, "mediaType", e.target.value)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-all text-xs font-medium bg-white text-slate-900"
                      >
                        <option value="image">Image</option>
                        <option value="video">Video URL</option>
                        <option value="code">Code Snippet</option>
                      </select>
                    </div>
                    {item.mediaType === "image" && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Image File
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleGalleryFile(idx, e)}
                          className="w-full text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {item.url && (
                          <img
                            src={item.url}
                            alt="Preview"
                            className="w-full h-20 object-cover rounded-lg border border-slate-200 mt-1"
                          />
                        )}
                      </div>
                    )}
                    {item.mediaType === "video" && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Video URL (YouTube/Direct)
                        </label>
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) =>
                            handleGalleryChange(idx, "url", e.target.value)
                          }
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-all text-xs font-medium"
                        />
                      </div>
                    )}
                    {item.mediaType === "code" && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Code Snippet
                        </label>
                        <textarea
                          value={item.content}
                          onChange={(e) =>
                            handleGalleryChange(idx, "content", e.target.value)
                          }
                          rows={4}
                          placeholder="const example = () => ..."
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none transition-all text-xs font-mono bg-white text-slate-900 resize-none"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-100">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-xl transition-all shadow-[0_4px_12px_rgba(37,99,235,0.2)]"
              >
                {editingId ? "Update Project" : "Create Project"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-2.5 px-6 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 m-0">
            📋 Projects
          </h2>
          <button
            onClick={fetchProjects}
            className="bg-transparent border-none cursor-pointer text-blue-600 text-xs sm:text-sm font-bold hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            ↻ Refresh
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="text-5xl mb-3">📁</div>
            <p className="text-slate-700 font-bold m-0 mb-1">No projects yet</p>
            <p className="text-slate-500 text-sm m-0 mb-4">
              Add your first project to display it on the website
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl transition-all shadow-sm flex items-center gap-2"
              onClick={() => setShowForm(true)}
            >
              + Add First Project
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <th className="p-4 pl-6 font-bold">Image</th>
                  <th className="p-4 font-bold">Title</th>
                  <th className="p-4 font-bold hidden md:table-cell">
                    Description
                  </th>
                  <th className="p-4 pr-6 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <tr
                    key={project._id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="p-4 pl-6 w-[80px]">
                      {renderProjectImage(project, 40)}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-sm text-slate-900">
                        {project.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {project.category}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-500 hidden md:table-cell max-w-[250px] lg:max-w-[350px] truncate">
                      {project.description}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center transition-colors border-none cursor-pointer"
                          onClick={() => handleEdit(project)}
                          title="Edit project"
                        >
                          ✏️
                        </button>
                        {isSuperAdmin &&
                          (deleteConfirm === project._id ? (
                            <div className="flex items-center gap-1.5 animate-[slideIn_0.2s_ease-out]">
                              <button
                                onClick={() => handleDelete(project._id)}
                                className="bg-red-600 hover:bg-red-700 text-white border-none rounded-md px-2.5 py-1.5 text-[11px] font-bold cursor-pointer transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-md px-2.5 py-1.5 text-[11px] font-bold cursor-pointer transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 flex items-center justify-center transition-colors border-none cursor-pointer"
                              onClick={() => setDeleteConfirm(project._id)}
                              title="Delete project"
                            >
                              🗑️
                            </button>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Projects;
