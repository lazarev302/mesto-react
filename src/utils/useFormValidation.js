import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const inputName = evt.target.name;
    const inputValue = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((defaultValues) => {
      return { ...defaultValues, [inputName]: inputValue };
    });

    setErrors((defaultErrors) => {
      return { ...defaultErrors, [inputName]: validationMessage };
    });

    setIsInputValid((defaultIsInputValid) => {
      return { ...defaultIsInputValid, [inputName]: valid };
    });

    setIsValid(form.checkValidity());
  }

  function reset(data = {}) {
    setValues(data);
    setErrors({});
    setIsInputValid({});
    setIsValid(false);
  }

  const setValue = useCallback((inputName, inputValue) => {
    setValues((defaultValues) => {
      return { ...defaultValues, [inputName]: inputValue };
    });
  }, []);

  return {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    reset,
    setValue,
  };
}
