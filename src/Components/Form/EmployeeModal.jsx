import styles from "./EmployeeModal.module.scss";
function EmployeeModal({ isOpen, onClose, employee }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h2>Employee created!</h2>
        <p>
          {employee.firstName} {employee.lastName} in {employee.department}
        </p>
        <p>{employee.street}</p>
        <p>
          {employee.city}, {employee.state.name} – {employee.zipCode}
        </p>
        <p>Born on {employee.birthday}</p>
        <p>Started on {employee.startDate}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default EmployeeModal;
