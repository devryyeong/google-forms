export interface PayloadProps {
  [key: string]: string;
}

export interface ActionProps {
  type: string;
  payload: PayloadProps;
}