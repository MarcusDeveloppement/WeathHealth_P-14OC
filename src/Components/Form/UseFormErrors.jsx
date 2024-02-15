import { useState } from "react";

export const useFormErrors = () => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [zipCodeError, setZipCodeError] = useState(false);
  const zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

  const testFormValue = (property, errorType) => {
    let hasError = false;
    switch (errorType) {
      case "firstName":
      case "lastName":
      case "street":
      case "city":
        hasError = !property;
        break;
      case "zipCode":
        hasError = !property || !zipCodeRegex.test(property);
        break;
      default:
        break;
    }

    switch (errorType) {
      case "firstName":
        setFirstNameError(hasError);
        break;
      case "lastName":
        setLastNameError(hasError);
        break;
      case "street":
        setStreetError(hasError);
        break;
      case "city":
        setCityError(hasError);
        break;
      case "zipCode":
        setZipCodeError(hasError);
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

    return !(
      !newEmployee.firstName ||
      !newEmployee.lastName ||
      !newEmployee.street ||
      !newEmployee.city ||
      !newEmployee.zipCode ||
      !zipCodeRegex.test(newEmployee.zipCode)
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
