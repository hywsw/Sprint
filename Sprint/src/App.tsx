import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Sprints from "./pages/Sprints";
import SprintDetail from "./pages/SprintDetail";
import CompanyCreate from "./pages/CompanyCreate";
import CompanyDashboard from "./pages/CompanyDashboard";
import Apply from "./pages/Apply";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Community from "./pages/Community";
import ResumeScreener from "./pages/ResumeScreener";
import MyPage from "./pages/MyPage";
import RequireRole from "./components/RequireRole";
import RequireAuth from "./components/RequireAuth";
import TopNav from "./components/TopNav";

function MainLayout() {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <TopNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Intro />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/sprints" element={<Sprints />} />
          <Route path="/sprints/:id" element={<SprintDetail />} />
          <Route
            path="/company/create"
            element={
              <RequireRole role="company">
                <CompanyCreate />
              </RequireRole>
            }
          />
          <Route
            path="/company"
            element={
              <RequireRole role="company">
                <CompanyDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/apply"
            element={
              <RequireAuth>
                <Apply />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/community" element={<Community />} />
          <Route
            path="/resume-screener"
            element={
              <RequireAuth>
                <ResumeScreener />
              </RequireAuth>
            }
          />
          <Route
            path="/mypage"
            element={
              <RequireAuth>
                <MyPage />
              </RequireAuth>
            }
          />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
