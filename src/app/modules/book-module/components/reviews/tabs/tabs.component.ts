import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TabActiveDirective } from "@features";
import { TabKey } from "@types";

@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [CommonModule, TabActiveDirective],
    templateUrl: './tabs.component.html'
})
export class TabsComponent {
    @Input({ required: true}) currentTab: TabKey = TabKey.reviews;
    @Output() tabChange = new EventEmitter<TabKey>();
    
    readonly TabKey = TabKey;

    selectTab(tabKey: TabKey) {
        this.tabChange.emit(tabKey)
    }
}