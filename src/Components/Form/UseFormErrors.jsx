import { useState } from "react";

export const useFormErrors = () => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [zipCodeError, setZipCodeError] = useState(false);
  const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

  const testFormValue = (property, errorType) => {
    switch (errorType) {
      case "firstName":
        setFirstNameError(!property);
        break;
      case "lastName":
        setLastNameError(!property);
        break;
      case "street":
        setStreetError(!property);
        break;
      case "city":
        setCityError(!property);
        break;
      case "zipCode":
        setZipCodeError(property && !zipCodeRegex.test(property));
        break;
      default:
        break;
    }
  };
  const validateAllFields = (newEmployee) => {
    testFormValue(newEmployee.firstName, "firstName");
    testFormValue(newEmployee.lastName, "lastName");
    testFormValue(newEmployee.street, "street");
    testFormValue(newEmployee.city, "city");
    testFormValue(newEmployee.zipCode, "zipCode");

    // Retourne si le formulaire est valide
    return (
      newEmployee.firstName &&
      newEmployee.lastName &&
      newEmployee.street &&
      newEmployee.city &&
      (!newEmployee.zipCode || zipCodeRegex.test(newEmployee.zipCode))
    );
  };
  return {
    firstNameError,
    lastNameError,
    streetError,
    cityError,
    zipCodeError,
    testFormValue,
    validateAllFields,
  };
};
