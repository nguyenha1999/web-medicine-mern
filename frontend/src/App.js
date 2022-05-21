import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Suspense from "./routes/Routers";

const Recipe = lazy(() => import("./pages/recipe"));
const Chemistry = lazy(() => import("./pages/chemistry"));
const Bill = lazy(() => import("./pages/bill"));
const Import = lazy(() => import("./pages/import"));
const Export = lazy(() => import("./pages/export"));
const Partner = lazy(() => import("./pages/partner"));
const Login = lazy(() => import("./pages/login"));
const Profile = lazy(() => import("./pages/profile"));
const Register = lazy(() => import("./pages/register"));
const User = lazy(() => import("./pages/user"));
const Home = lazy(() => import("./pages/home"));

function App() {
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
        <Route exact path="/register">
          <Suspense component={<Register />} />
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
