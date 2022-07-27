import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface PayloadWithData {
  data: {};
}

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export const isErrorWithMessage = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  error.hasOwnProperty("data") &&
  (error as PayloadWithData).data.hasOwnProperty("message") &&
  typeof (error as any).data.message === "string";

export const getErrorMessage = (error: unknown) => {
  if (isErrorWithMessage(error)) {
    return (error as any).data.message;
  }
  return "";
};
