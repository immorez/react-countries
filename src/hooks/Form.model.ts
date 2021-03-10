import { ReactText } from "react";

export type IsValid = boolean;

export type InputData = {
  [inputId: string]:
    | { value: ReactText | boolean | Date; isValid?: IsValid }
    | undefined;
};

export type InputHandler = (
  id: string,
  value: ReactText | boolean | Date,
  isValid: IsValid
) => void;

export type SetFormData = (inputData: InputData, formValidity: IsValid) => void;

export interface FormState {
  inputs: InputData;
  isValid: IsValid;
}

export type FormAction =
  | {
      type: "INPUT_CHANGE";
      inputId: string;
      value: ReactText | boolean | Date;
      isValid: IsValid;
    }
  | { type: "SET_DATA"; inputs: InputData; formIsValid: IsValid };

export type IUseForm = (
  initialInputs: InputData,
  initialFormValidity: IsValid
) => [FormState, InputHandler, SetFormData];

export type IFormReducer = (state: FormState, action: FormAction) => FormState;
