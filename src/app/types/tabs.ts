import { TemplateRef } from "@angular/core";

export enum TabKey {
  reviews = 'reviews',
  addReview = 'addReview'
}
export interface Tab {
  key: TabKey;
  label: string;
  template?: TemplateRef<unknown>;
}
