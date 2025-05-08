import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CoursePage from "./pages/CoursePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/course" />} />
        <Route path="/course" element={<CoursePage />} />
      </Routes>
    </BrowserRouter>
  );
}
