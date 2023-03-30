import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

export default function LoggedRoutes({ user }) {
  return <>{user ? <AdminRoutes /> : <UserRoutes />}</>;
}
