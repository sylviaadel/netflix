import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { readDocument } from "./scripts/fireStore/readDocument";
import { useUser } from "./state/UsersProvider";
import UnloggedRoutes from "./routes/UnloggedRoutes";
import ScrollToTop from "./components/shared/ScrollToTop";
import LoggedRoutes from "./routes/LoggedRoutes";
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
        ) : (
          <LoggedRoutes user={loggedInUser} />
        )}
        <ScrollToTop />
      </BrowserRouter>
    </div>
  );
}
