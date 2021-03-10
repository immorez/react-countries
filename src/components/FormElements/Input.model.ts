import { Validator } from "../../utils/validators.model";

export const CHANGE = "CHANGE";
export const TOUCH = "TOUCH";
export const CHECK = "CHECK";

export interface InputState {
  value: string | number | boolean | Date;
  checked?: boolean;
  isValid: boolean;
  isTouched: boolean;
}
export type InputAction =
  | {
      type: "CHANGE";
      val: string | number | boolean | Date;
      validators?: Validator[];
      checked?: boolean;
    }
  | { type: "TOUCH" };

export interface FormInputProps {
  id: string;
  label?: string;
  element: string;
  type?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  dataIndex?: number;
  placeholder?: string;
  className?: string;
  labelStyles?: string;
  checked?: boolean;
  rows?: number;
  ref?: any;
  initialValid?: boolean;
  initialValue?: string | number | Date;
  initialChecked?: boolean;
  errorText?: string;
  errorTextStyle?: string;
  icon?: React.ReactNode;
  iconStyle?: string;
  validators?: Validator[];
  value?: string | number | boolean | Date;
  maxLength?: number;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  onInput?: (
    id: string,
    value: string | number | boolean | Date,
    isValid: boolean
  ) => void;
  onClick?: any;
  iconOnClick?: (e: React.MouseEvent) => void;
}

export type InputReducer = (
  state: InputState,
  action: InputAction
) => InputState;
