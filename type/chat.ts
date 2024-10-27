export enum Role {
  User = 0,
  Bot = 1,
}

export interface Messages {
  image?: string;
  sender: string;
  text?: string;
  isLoading?: boolean | false;
  retry?: () => void;
}
export interface Option {
  label: string;
  value: string;
}
export interface Chat {
  id: number;
  title: string;
}
