import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout";
import EmployeeList from "./pages/Employee";
import AssignTaskPage from "./pages/AssignTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route exact path="/" element={<EmployeeList />} />
            <Route exact path="/employee" element={<EmployeeList />} />
            <Route exact path="/assign_task" element={<AssignTaskPage />} />
            {/* others router  */}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
