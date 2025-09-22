
export interface SelectModel  {
  label: string;
  value: string | null;
}

export type MessageSeverity = "error" | "warning" | "info" | "success";
export type MessagePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface Message {
  severity: MessageSeverity;
  text: string;
  duration?: number;
  position?: MessagePosition;
}