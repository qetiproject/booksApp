import { InjectionToken } from "@angular/core"

export const ERROR_MESSAGE: { [key: string]: (args?: any, field?: string) => string} = {
    required: () => `This field is required`,
    requiredTrue: () => `This field is required`,
    minlength: ({ requiredLength }) => `The length should be at least ${requiredLength} characters`,
    pattern: () => `Wrong format`,
    email: () => `Email should have a valid email format`,
    uniqueEmail: () => `Email Already Present`
}

export const VALIDATION_ERROR_MESSAGES = new InjectionToken('Validation Messages', {
    providedIn: 'root',
    factory: () => ERROR_MESSAGE
})