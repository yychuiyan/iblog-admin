export interface LoginFormValues {
  username: string;
  password: string;
}

export interface ValidateName {
  _rule: Function;
  value: string;
  callback: (error?: string) => void;
}
