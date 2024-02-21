import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import Header from "./Components/Header/Header";
import EmployeeCreate from "./Pages/EmployeeCreate/EmployeeCreate";
import EmployeeList from "./Pages/EmployeeList/EmployeeList";
import Error from "./Components/Error/Error.jsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeCreate />} />
          <Route path="/view" element={<EmployeeList />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
