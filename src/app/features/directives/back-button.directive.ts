import { Directive, HostBinding } from "@angular/core";

@Directive({
    selector: '[appBackBtnClass]',
    standalone: true
})
export class BackButtonDirective {
    private readonly colorMap = {
        primary: 'focus:ring-blue-300',
    } as const;

    @HostBinding('class')
    get buttonClasses(): string {
        return [
        'w-12 h-12 flex items-center justify-center rounded-full',
        'bg-white text-gray-700 shadow-md hover:shadow-lg',
        'hover:bg-gray-100 focus:outline-none',
        'transition-transform transform hover:-translate-y-1 active:scale-95',
        this.colorMap
        ].join(' ');
    }
}