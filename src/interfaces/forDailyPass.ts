export interface ITimer {
    seconds: number;
    minutes: number;
    isSessionExpired: boolean;
}
  
export type PassformInputs = {
    passValue: string
    idNumber: number | null
}