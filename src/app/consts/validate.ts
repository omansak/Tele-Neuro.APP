import { StatusType } from "./enums";
//https://validatejs.org/#validate-js
//https://github.com/ansman/validate.js/issues/2 -- Waiting this update

export const VALIDATE_TEXT = (value: any): { status: StatusType | undefined | null, message?: string | undefined | null } => {
    const options = {
        presence: {
            allowEmpty: false,
            message: "Bu alan boş olamaz"
        }
    }
    const result = validate({ value: value }, { value: options });
    return result ? { status: StatusType.Error, message: result } : { status: StatusType.Success };
}

export const VALIDATE_FILE = (value: any): { status: StatusType | undefined | null, message?: string | undefined | null } => {
    if (!value) {
        return { status: StatusType.Error, message: "Dosya alanı boş olamaz" }
    }
    if (!(value instanceof File)) {
        return { status: StatusType.Error, message: "Dosya formatı hatalı" };
    }
    return { status: StatusType.Success }
}