import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { UserLayout } from "./layout/user.layout";
import { AdminLayout } from "./layout/admin.layout";
import { AdminDashboard } from "./pages/Dashboard";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
