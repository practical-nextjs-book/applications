import type { Comment } from "@/services/type";

export type FormState = {
  updatedAt: string;
  comment: Comment | null;
  error: { message: string; status: number } | null;
};

export const initialFormState = (
  initialState?: Partial<FormState>,
): FormState => ({
  updatedAt: Date.now().toString(),
  comment: null,
  error: null,
  ...initialState,
});

export const handleSuccess = (comment: Comment): FormState => ({
  ...initialFormState(),
  comment,
});

export const handleError = (error: {
  message: string;
  status: number;
}): FormState => ({
  ...initialFormState(),
  error,
});

export const errors = {
  400: { message: "Bad Request", status: 400 },
  401: { message: "Unauthorized", status: 401 },
  500: { message: "Internal Server Error", status: 500 },
};
