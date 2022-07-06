import { lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import API from "./api/api";
import "./App.css";
import { UserInfoAtom } from "./recoils/Atoms";
import Suspense from "./routes/Routers";

const Recipe = lazy(() => import("./pages/recipe"));
const Chemistry = lazy(() => import("./pages/chemistry"));
const Bill = lazy(() => import("./pages/bill"));
const Import = lazy(() => import("./pages/import"));
const Export = lazy(() => import("./pages/export"));
const Partner = lazy(() => import("./pages/partner"));
const Login = lazy(() => import("./pages/login"));
const Profile = lazy(() => import("./pages/profile"));
const User = lazy(() => import("./pages/user"));
const Home = lazy(() => import("./pages/home"));

function App() {
  const setUser = useSetRecoilState(UserInfoAtom);
  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (typeof token === "string") {
      token = JSON.parse(token);
      API.setAccessToken = token;
    }
  });

  useEffect(() => {
    let userInfo = localStorage.getItem("vnd-medicine-info");
    if (typeof userInfo === "string") {
      userInfo = JSON.parse(userInfo);
      setUser(userInfo);
    }
  }, [setUser]);

  return (
    <Router>
      <Switch>
        <Route exact path="/recipe/:productId/create-recipe">
          <Suspense component={<Recipe />} />
        </Route>
        <Route path="/recipe/:productId/:id">
          <Suspense component={<Recipe />} />
        </Route>
        <Route exact path="/">
          <Suspense component={<Home />} />
        </Route>
        <Route exact path="/chemistries">
          <Suspense component={<Chemistry />} />
        </Route>
        <Route exact path="/profile">
          <Suspense component={<Profile />} />
        </Route>
        <Route exact path="/login">
          <Suspense component={<Login />} />
        </Route>
        <Route exact path="/user">
          <Suspense component={<User />} />
        </Route>
        <Route path="/bill">
          <Suspense component={<Bill />} />
        </Route>
        <Route path="/import">
          <Suspense component={<Import />} />
        </Route>
        <Route path="/export">
          <Suspense component={<Export />} />
        </Route>
        <Route path="/partner">
          <Suspense component={<Partner />} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
