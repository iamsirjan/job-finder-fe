export const extractErrorMessage = (error: any): string => {
  console.log(error);
  if (
    Array.isArray(error) &&
    error.length > 0 &&
    error[0] &&
    typeof error[0] === 'object'
  ) {
    const firstErrorObject = error[0];
    const errorMessage = Object.values(firstErrorObject)[0];
    if (typeof errorMessage === 'string') {
      return errorMessage;
    }
  }
  return 'An unknown error occurred';
};
