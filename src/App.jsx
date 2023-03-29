import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { readDocument } from "./scripts/fireStore/readDocument";
import { useUser } from "./state/UsersProvider";
import UnloggedRoutes from "./routes/UnloggedRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import ScrollToTop from "./components/shared/ScrollToTop";
import "./styles/style.scss";

export default function App() {
  const { uid } = useUser();
  const [status, setStatus] = useState(0);
  const collection = "users";
  const [loggedInUser, setloggedInUser] = useState(null);

  useEffect(() => {
    loadData(collection);
  }, [uid]);

  async function loadData(collection) {
    const data = await readDocument(collection, uid).catch(onFail);
    onSuccess(data);
  }

  function onSuccess(data) {
    setloggedInUser(data);
  }

  function onFail() {
    setStatus(2);
  }

  return (
    <div className="App">
      <BrowserRouter>
        {uid === "" || uid === null ? (
          <UnloggedRoutes />
        ) : !loggedInUser?.isAdmin ? (
          <UserRoutes />
        ) : (
          <AdminRoutes />
        )}
        <ScrollToTop />
      </BrowserRouter>
    </div>
  );
}
