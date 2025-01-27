import { Navigate } from "react-router-dom";
import useUserStore from "@/store/user";
import DefaultLayout from "@/layout/default";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { getActiveProfile } = useUserStore();
  const activeProfile = getActiveProfile();

  if (!activeProfile) {
    // Redirect to profile selection if no active profile
    return <Navigate to="/select-profile" replace />;
  }
  // return <>{children}</>;

  return <DefaultLayout>{children}</DefaultLayout>;
};

export default ProtectedRoute;
