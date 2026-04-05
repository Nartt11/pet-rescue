// components/auth/RequireRole.tsx
import { Navigate } from "react-router-dom";

type Props = {
  role: string;
  children: React.ReactNode;
};

export const RequireRole = ({ role, children }: Props) => {
  // const { user, isLoading } = useAuth();

  // if (isLoading) return <div>Loading...</div>;

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (!user.roles.includes(role)) {
  //   return <Navigate to="/403" replace />;
  // }

  return <>{children}</>;
};
