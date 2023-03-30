import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import Navbar from "../components/shared/Navbar";

export default function LoggedRoutes({ user }) {
  return (
    <>
      <Navbar />
      {user ? <AdminRoutes /> : <UserRoutes />}
    </>
  );
}
