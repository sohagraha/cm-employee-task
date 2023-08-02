import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout";
import EmployeeList from "./pages/Home";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route exact path="/" element={<EmployeeList />} />
            <Route exact path="/login" element={<TaskPage />} />
            {/* others router  */}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
