import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';
import Dashboard from "../sections/dashboard";

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> RBAC | Welcome to our site </title>
      </Helmet>
      <Dashboard />
    </>
  );
}
