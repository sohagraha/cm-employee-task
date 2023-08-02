import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout";
import EmployeeList from "./pages/Employee";
import TaskPage from "./pages/TaskPage";
import AssignTaskPage from "./pages/AssignTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route exact path="/employee" element={<EmployeeList />} />
            <Route exact path="/task" element={<TaskPage />} />
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
