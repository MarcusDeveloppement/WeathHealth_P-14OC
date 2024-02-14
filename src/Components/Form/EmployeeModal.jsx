function EmployeeModal({ isOpen, onClose, employee }) {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2 className="modal-title">Employee created!</h2>
        <p className="modal-text">
          {employee.firstName} {employee.lastName} in {employee.department}
        </p>
        <p className="modal-text">{employee.street}</p>
        <p className="modal-text">
          {employee.city}, {employee.state.name} – {employee.zipCode}
        </p>
        <p className="modal-text">Born on {employee.birthday}</p>
        <p className="modal-text">Started on {employee.startDate}</p>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default EmployeeModal;
