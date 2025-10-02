import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import useCheckPermission from "../../components/PermissionHook/useCheckPermission";
import { useEffect } from "react";

export default function AdminGuard() {
  const navigate = useNavigate();
  const { isAdmin, loading } = useCheckPermission("admin");

  useEffect(() => {
    if (!loading) {
      if (!isAdmin) {
        navigate("/not-found");
      }
    }
  }, [isAdmin, loading, navigate]);

  return <Outlet />;
}
