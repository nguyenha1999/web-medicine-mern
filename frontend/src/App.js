import { lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";
import { UserInfoAtom } from "./recoils/Atoms";
import { getRoutes } from "./routes/route-setup";
import Suspense from "./routes/Routers";

const Recipe = lazy(() => import("./pages/recipe"));
const Login = lazy(() => import("./pages/login"));

function App() {
  const [user, setUser] = useRecoilState(UserInfoAtom);

  useEffect(() => {
    let userInfo = localStorage.getItem("vnd-medicine-info");
    if (typeof userInfo === "string") {
      userInfo = JSON.parse(userInfo);
      setUser(userInfo);
    }
  }, [setUser]);

  const routes = getRoutes(user?.role);

  return (
    <Router>
      <Switch>
        {routes?.map((e) => {
          return (
            <Route exact key={e.to} path={e.to}>
              <Suspense component={e.component} />
            </Route>
          );
        })}
        <Route exact path="/login">
          <Suspense component={<Login />} />
        </Route>
        <Route path="/recipe/:id">
          <Suspense component={<Recipe />} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
