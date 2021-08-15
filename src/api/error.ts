export interface ErrorType {
  error: string;
}

export const isFailed = <T>(arg: T | ErrorType): arg is ErrorType => {
  return (arg as ErrorType).error !== undefined;
};
