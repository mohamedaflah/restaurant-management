import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { UserLayout } from "./layout/user.layout";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
