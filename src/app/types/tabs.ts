import { TemplateRef } from "@angular/core";

export type TabKey = 'reviews' | 'addReview';

export interface Tab {
  key: TabKey;
  label: string;
  template?: TemplateRef<unknown>;
}
