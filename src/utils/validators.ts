import { Validator } from "./validators.model";

const VALIDATOR_TYPE_REQUIRE: string = "REQUIRE";
const VALIDATOR_TYPE_OPTIONAL: string = "OPTIONAL";
const VALIDATOR_TYPE_MINLENGTH: string = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH: string = "MAXLENGTH";
const VALIDATOR_TYPE_MIN: string = "MIN";
const VALIDATOR_TYPE_MAX: string = "MAX";
const VALIDATOR_TYPE_EMAIL: string = "EMAIL";
const VALIDATOR_TYPE_FILE: string = "FILE";
const VALIDATOR_TYPE_PHONE_NUMBER: string = "PHONE_NUMBER";
const VALIDATOR_TYPE_CHECK_EQUALITY: string = "CHECK_EQUALITY";
const VALIDATOR_TYPE_STRONG_PASSWORD: string = "STRONG_PASSWORD";

export const VALIDATOR_REQUIRE = (): Validator => ({
  type: VALIDATOR_TYPE_REQUIRE,
});
export const VALIDATOR_OPTIONAL = (): Validator => ({
  type: VALIDATOR_TYPE_OPTIONAL,
});
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MIN,
  val: val,
});
export const VALIDATOR_MAX = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MAX,
  val: val,
});
export const VALIDATOR_EMAIL = (): Validator => ({
  type: VALIDATOR_TYPE_EMAIL,
});

export const VALIDATOR_PHONE_NUMBER = (): Validator => ({
  type: VALIDATOR_TYPE_PHONE_NUMBER,
});

export const VALIDATOR_CHECK_EQUALITY = (val: string): Validator => ({
  type: VALIDATOR_TYPE_CHECK_EQUALITY,
  val: val,
});

export const VALIDATOR_STRONG_PASSWORD = (val: string): Validator => ({
  type: VALIDATOR_TYPE_STRONG_PASSWORD,
  val: val,
});

export const validate = (
  value: string | number | boolean | Date,
  validators: Validator[]
): boolean => {
  let isValid: boolean = true;
  for (const validator of validators) {
    switch (validator.type) {
      case VALIDATOR_TYPE_REQUIRE:
        isValid = isValid && (value as string).trim().length > 0;
        break;
      case VALIDATOR_TYPE_OPTIONAL:
        continue;
      case VALIDATOR_TYPE_MINLENGTH:
        isValid = isValid && (value as string).trim().length >= validator.val!;
        break;
      case VALIDATOR_TYPE_MAXLENGTH:
        isValid = isValid && (value as string).trim().length <= validator.val!;
        break;

      case VALIDATOR_TYPE_MIN:
        isValid = isValid && (value as number) >= validator.val!;
        break;

      case VALIDATOR_TYPE_MAX:
        isValid = isValid && (value as number) <= validator.val!;
        break;

      case VALIDATOR_TYPE_EMAIL:
        isValid = isValid && /^\S+@\S+\.\S+$/.test(value as string);
        break;

      case VALIDATOR_TYPE_PHONE_NUMBER:
        isValid =
          isValid &&
          /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/gi.test(
            value as string
          );
        break;

      case VALIDATOR_TYPE_CHECK_EQUALITY:
        isValid = isValid && value === validator.val!;
        break;

      case VALIDATOR_TYPE_STRONG_PASSWORD:
        isValid =
          isValid &&
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi.test(
            value as string
          );
        break;

      default:
        return isValid;
    }
  }
  return isValid;
};
