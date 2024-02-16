import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import TableList from "../../Components/TableList.jsx/TableList";
import styles from "./EmployeeList.module.scss";

export default function EmployeeList() {
  const employees = useSelector((state) => state.employees);

  useEffect(() => {
    document.title = "WealthHealth – Current employees";
  }, []);

  return (
    <div>
      <div>
        <h1 className={styles.title}>Current Employees</h1>
        <TableList content={employees} objectKey={{ state: "abbreviation" }} />
      </div>
    </div>
  );
}
