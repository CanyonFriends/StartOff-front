export interface ErrorType {
  error_msg: string;
}

export const isFailed = <T>(arg: T | ErrorType): arg is ErrorType => {
  return (arg as ErrorType).error_msg !== undefined;
};
