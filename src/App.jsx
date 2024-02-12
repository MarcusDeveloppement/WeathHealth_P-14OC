import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import "./App.css";
import EmployeeCreate from "./Pages/EmployeeCreate/EmployeeCreate";
import EmployeeList from "./Pages/EmployeeList/EmployeeList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeCreate />} />
          <Route path="/list" element={<EmployeeList />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
