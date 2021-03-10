import { useCallback, useReducer } from 'react';
import {
  SetFormData,
  InputHandler,
  IUseForm,
  IFormReducer,
} from './Form.model';

const formReducer: IFormReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      // Check whether the input exists in our state or not.
      for (const inputId in state.inputs) {
        // it will pass if our input id not matches with any input id in our current state.
        if (!state.inputs[inputId]) {
          continue;
        }
        // Check form validity after adding our new input to state.
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          // Check form validity if current input exists in current state.
          formIsValid = (formIsValid && state.inputs[inputId]!.isValid) || true;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };

    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

/**
 * A hook that manages forms states dynamically.
 *
 * `useForm` is usually usable when you want handle a form which has several important inputs that need validations.
 * `formState` set a state for each form. Maybe each form has an initial value and initial validity.
 * `inputHandler` dispatch an action which controls each input value & validation individually.
 * `setFormData` will dispatch an action which add new inputs to the form.
 *
 *
 **/

export const useForm: IUseForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler: InputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData: SetFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);
  return [formState, inputHandler, setFormData];
};
