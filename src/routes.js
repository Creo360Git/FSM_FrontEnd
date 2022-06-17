import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
// import { PrivateRoute } from "./auth/PrivateRoute";
// import { Callback } from "./auth/Callback";
// import { Logout } from "./auth/Logout";
// import { LogoutCallback } from "./auth/LogoutCallback";
// import { SilentRenew } from "./auth/SilentRenew";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Client = lazy(() => import("./pages/Clients"));
const Quote = lazy(() => import("./pages/Quote/Quote"));
const NewQuote = lazy(() => import("./pages/Quote/NewQuote"));
const Request = lazy(() => import("./pages/Request/Request"));
const NewRequest = lazy(() => import("./pages/Request/NewRequest"));

const Router = () => (
  <Routes>
    {/* <Route exact={true} path="/signin-oidc" component={Callback} />
      <Route exact={true} path="/logout" component={Logout} />
      <Route exact={true} path="/logout/callback" component={LogoutCallback} />
      <Route exact={true} path="/silentrenew" component={SilentRenew} /> */}

    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/clients" element={<Client />} />
    <Route path="/quotes" element={<Quote />} />
    <Route path="/quotes/newQuotes" element={<NewQuote />} />
    <Route path="/request" element={<Request />} />
    <Route path="/request/new" element={<NewRequest />} />

    <Route path="/" element={<Dashboard />} />

    {/* <PrivateRoute path="/" component={Dashboard} /> */}
  </Routes>
);

export default Router;
