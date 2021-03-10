import React, { useReducer, useEffect } from "react";
import { validate } from "../../utils/validators";
import { FormInputProps, CHANGE, TOUCH, InputReducer } from "./Input.model";

const inputReducer: InputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        // Input validation happens on every onChange call.
        // So, if an input is totally optional or have not any validation,
        // you can leave 'isValid' property 'undefined' in useForm first parameter.
        isValid: validate(action.val, action.validators!)
      };
    case "TOUCH":
      return { ...state, isTouched: true };
    default:
      return state;
  }
};
const Input: React.FC<FormInputProps> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput!(id, value, isValid);
  }, [id, onInput, isValid, value]);

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    dispatch({
      type: CHANGE,
      val:
        props.type === "checkbox"
          ? (event as React.ChangeEvent<HTMLInputElement>).target.checked
          : event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: TOUCH
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value as string}
        checked={props.checked}
        maxLength={props.maxLength}
        defaultValue={props.defaultValue}
        className={`${
          props.type !== "checkbox" &&
          "shadow appearance-none rounded py-2 px-3 text-grey-darker"
        } ${
          !inputState.isValid && inputState.isTouched && "border border-red-500"
        } ${props.className}`}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value as string}
        className={`shadow appearance-none border rounded py-2 px-3 text-grey-darker ${
          !inputState.isValid && inputState.isTouched && "border border-red-500"
        } ${props.className}`}
      />
    );

  return props.type === "checkbox" ? (
    <div>
      {/* IN CHECKBOX: Label comes after element itself. */}
      {element}
      <label htmlFor={props.id} className={props.labelStyles}>
        {props.label}
      </label>
      {!inputState.isValid && inputState.isTouched && (
        <p className={props.errorTextStyle}>{props.errorText}</p>
      )}
    </div>
  ) : (
    <div>
      <label htmlFor={props.id} className={props.labelStyles + " my-1"}>
        {props.label}
        <div className="w-full relative">
          {element}
          {props.icon && (
            <i
              onClick={props.iconOnClick}
              className={`left-0 absolute ${props.iconStyle}`}>
              {props.icon}
            </i>
          )}
        </div>
      </label>
      {!inputState.isValid && inputState.isTouched && (
        <p className={props.errorTextStyle}>{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
