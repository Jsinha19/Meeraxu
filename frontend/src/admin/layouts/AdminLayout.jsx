import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen min-w-0 overflow-x-hidden bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1 ml-0 lg:ml-64 min-h-screen pt-20 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
