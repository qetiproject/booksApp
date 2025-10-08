
export interface SelectModel  {
  label: string;
  value: string | null;
}

export enum MessageSeverity {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success'
}

export enum MessagePosition {
  TopRight = 'top-right',
  TopLeft = 'top-left',
  BottomRight = 'bottom-right',
  BottomLeft = 'bottom-left'
}

export interface Message {
  severity: MessageSeverity;
  text: string;
  duration?: number;
  position?: MessagePosition;
}

export type ThemeColor = "primary" | "accent" | "warn";