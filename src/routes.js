import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
const Schedule = lazy(() => import("./pages/Schedule"));
const Invoice = lazy(() => import("./pages/Invoice/Invoice"));
const NewInvoice = lazy(() => import("./pages/Invoice/NewInvoice"));
const Job = lazy(() => import("./pages/Job/Job"));
const NewJob = lazy(() => import("./pages/Job/NewJob"));
const Login = lazy(() => import("./pages/Login"));
const Track = lazy(() => import("./pages/Track/Track"));
const Map = lazy(() => import("./pages/Map"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));

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
    <Route path="/schedule" element={<Schedule />} />
    <Route path="/jobs" element={<Job />} />
    <Route path="/jobs/new" element={<NewJob />} />
    <Route path="/invoice" element={<Invoice />} />
    <Route path="/invoice/newInvoice" element={<NewInvoice />} />
    <Route path="/reports" element={<Reports />} />
    <Route path="/login" element={<Login />} />
    <Route path="/track" element={<Track />} />
    <Route path="/map" element={<Map />} />
    <Route path="/settings" element={<Settings />} />

    <Route path="/" element={<Navigate to="/dashboard" replace={true} />} />

    {/* <PrivateRoute path="/" component={Dashboard} /> */}
  </Routes>
);

export default Router;
