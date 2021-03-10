export interface TooltipProps {
  color?: "info" | "warning" | "danger" | "success";
  title?: string;
  content: React.ReactNode;
  position:
    | "auto-start"
    | "auto"
    | "auto-end"
    | "top-start"
    | "top"
    | "top-end"
    | "right-start"
    | "right"
    | "right-end"
    | "bottom-end"
    | "bottom"
    | "bottom-start"
    | "left-end"
    | "left"
    | "left-start"
    | undefined;
  holder: React.ReactNode;
}
