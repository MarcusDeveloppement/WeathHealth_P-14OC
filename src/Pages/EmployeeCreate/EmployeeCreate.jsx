import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee } from "../../Redux/Actions/employeeSlice";
import {
  setDepartments,
  setUSstates,
} from "../../Redux/Actions/selectedOptionSlice";
import EmployeeModal from "../../Components/Form/EmployeeModal";
import { useFormErrors } from "../../Components/Form/UseFormErrors";
import styles from "./EmployeeCreate.module.scss";
import Card from "../../Components/Form/Card";

const EmployeeModalLazy = React.lazy(() =>
  import("../../Components/Form/EmployeeModal")
);
export default function EmployeeCreate() {
  const dispatch = useDispatch();
  const today = new Date();
  const USstateList = useSelector((state) => state.selectOption.USstates);
  const departmentList = useSelector((state) => state.selectOption.departments);
  const {
    firstNameError,
    lastNameError,
    streetError,
    cityError,
    zipCodeError,
    testFormValue,
    validateAllFields,
  } = useFormErrors();

  const [employee, setEmployee] = useState({});
  const [USstate, setUSstate] = useState("");
  const [department, setDepartment] = useState("");
  const [birthday, setBirthday] = useState(
    new Date(today.getFullYear() - 16, today.getMonth(), today.getDate())
  );
  const [startDate, setStartDate] = useState(today.toISOString().split("T")[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    document.title = "Wealth Health– Add an employee";
  }, []);

  useEffect(() => {
    const fetchData = async (URL, action, setFirst) => {
      try {
        const response = await fetch(URL);
        const JSONData = await response.json();
        dispatch(action(JSONData));
        setFirst(JSONData[0].abbreviation);
      } catch (error) {
        console.log(error);
      }
    };

    if (USstateList.length === 0) {
      fetchData("./USstates.json", setUSstates, setUSstate);
    }
    if (departmentList.length === 0) {
      fetchData("./departments.json", setDepartments, setDepartment);
    }
  }, [USstateList, departmentList, dispatch]);

  useEffect(() => {
    if (USstateList.length > 0 && !USstate) {
      setUSstate(USstateList[0].abbreviation);
    }
    if (departmentList.length > 0 && !department) {
      setDepartment(departmentList[0]);
    }
  }, [USstateList, departmentList, USstate, department]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newEmployee = Object.fromEntries(formData.entries());

    newEmployee.state = { abbreviation: USstate };
    newEmployee.department = department;
    newEmployee.birthday = formatDateDDMMYYYY(birthday);
    newEmployee.startDate = formatDateDDMMYYYY(new Date(startDate));

    const isFormValid = validateAllFields(newEmployee);

    if (isFormValid) {
      console.log("Formulaire valide, envoi des données...");
      dispatch(addEmployee(newEmployee));
      setEmployee(newEmployee);
      setIsModalOpen(true);
    } else {
      console.log("Le formulaire contient des erreurs.");
    }
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  const formatDateDDMMYYYY = (date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className={styles.contentEmployee}>
      {isModalOpen && <div className={styles.overlay}></div>}
      <div className={styles.contentForm}>
        <h1>Create an employee</h1>
        <meta name="description" content="Create a new employee" />
        <form className={styles.inForm} onSubmit={handleSubmit}>
          <Card title="Personal information">
            <div>
              <div className={styles.formLabel}>
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`form-input ${firstNameError ? "error" : ""}`}
                  onBlur={(event) =>
                    testFormValue(event.target.value, "firstName")
                  }
                  onChange={(event) =>
                    testFormValue(event.target.value, "firstName")
                  }
                />

                {firstNameError && (
                  <p className={styles.errorInput}>
                    Please enter a first name.
                  </p>
                )}
              </div>
              <div className={styles.formLabel}>
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`form-input ${lastNameError ? "error" : ""}`}
                  onBlur={(event) =>
                    testFormValue(event.target.value, "lastName")
                  }
                  onChange={(event) =>
                    testFormValue(event.target.value, "lastName")
                  }
                />
                {lastNameError && (
                  <p className={styles.errorInput}>Please enter a last name.</p>
                )}
              </div>
              <div className={styles.formLabel}>
                <label htmlFor="birthday">Birthday</label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={formatDate(birthday)}
                  max={formatDate(
                    new Date(
                      today.getFullYear() - 16,
                      today.getMonth(),
                      today.getDate()
                    )
                  )}
                  onChange={(event) =>
                    setBirthday(new Date(event.target.value))
                  }
                />
              </div>
            </div>
          </Card>
          <Card title="Address">
            <div>
              <div className={styles.formLabel}>
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className={`form-input ${streetError ? "error" : ""}`}
                  onBlur={(event) =>
                    testFormValue(event.target.value, "street")
                  }
                  onChange={(event) =>
                    testFormValue(event.target.value, "street")
                  }
                />
                {streetError && (
                  <p className={styles.errorInput}>Please enter a street.</p>
                )}
              </div>
              <div className={styles.formLabel}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className={`form-input ${cityError ? "error" : ""}`}
                  onBlur={(event) => testFormValue(event.target.value, "city")}
                  onChange={(event) =>
                    testFormValue(event.target.value, "city")
                  }
                />
                {cityError && (
                  <p className={styles.errorInput}>Please enter a city.</p>
                )}
              </div>
            </div>
            <div>
              <div className={styles.formLabel}>
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  value={USstate}
                  onChange={(event) => setUSstate(event.target.value)}
                >
                  {USstateList.map((state, index) => (
                    <option value={state.abbreviation} key={index}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formLabel}>
                <label htmlFor="zipCode">Zip code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className={`form-input ${zipCodeError ? "error" : ""}`}
                  onBlur={(event) =>
                    testFormValue(event.target.value, "zipCode")
                  }
                  onChange={(event) =>
                    testFormValue(event.target.value, "zipCode")
                  }
                />
                {zipCodeError && (
                  <p className={styles.errorInput}>
                    Please enter a valid US zip code.
                  </p>
                )}
              </div>
            </div>
          </Card>

          <Card title="Company information">
            <div>
              <div className={styles.formLabel}>
                <label htmlFor="startDate">Start date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </div>
              <div className={styles.formLabel}>
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                >
                  {departmentList.map((dept, index) => (
                    <option value={dept} key={index}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
          <div className={styles.button}>
            <button type="submit">Create employee</button>
          </div>
        </form>
      </div>
      <EmployeeModalLazy
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        employee={employee}
      />
    </div>
  );
}
