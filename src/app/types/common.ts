export interface SelectModel  {
  label: string;
  value: string | null;
}

export type MessageSeverity = "error" | "warning" | "info" | "success";

export interface Message {
  severity: MessageSeverity;
  text: string;
}

