export interface ErrorType {
  errorMsg: string;
}

export const isFailed = <T>(arg: T | ErrorType): arg is ErrorType => {
  return (arg as ErrorType).errorMsg !== undefined;
};
