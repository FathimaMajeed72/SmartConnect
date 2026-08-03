import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (data?.message) {
      return data.message;
    }

    if (data?.errors) {
      const firstError = Object.values(data.errors)[0];

      if (Array.isArray(firstError)) {
        return firstError[0];
      }
    }

    return "Something went wrong.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}