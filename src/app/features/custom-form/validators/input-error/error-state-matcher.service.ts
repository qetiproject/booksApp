import { Injectable } from "@angular/core";
import { AbstractControl, FormGroupDirective, NgForm } from "@angular/forms";

export interface ErrorStateMatcher {
    isErrorVisible(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean
}

@Injectable({
    providedIn: 'root'
})
export class ErrorStateMatcher {
    isErrorVisible(control: AbstractControl | null, form: FormGroupDirective | NgForm | null ) {
        return Boolean(control && control.invalid && (control.disable || (form && form.submitted)))
    }
}

export class OnTouchedErrorStateMatcher {
    isErrorVisible(control: AbstractControl | null, form: FormGroupDirective | NgForm | null) {
        return Boolean(control && control.invalid && (control.disable || form && form.submitted))
    }
}