type Error = {
  message: string;
  status: number;
  fieldErrors?: Record<string, { message: string }>;
};

export type FormState = {
  updatedAt: string;
  photoId: string;
  userId: string;
  title: string;
  description: string;
  categoryId: string;
  imageUrl: string;
  error: Error | null;
};

export const initialFormState = (
  initialState?: Partial<FormState>,
): FormState => ({
  updatedAt: Date.now().toString(),
  photoId: "",
  userId: "",
  title: "",
  description: "",
  categoryId: "",
  imageUrl: "",
  error: null,
  ...initialState,
});

export const handleSuccess = (prevState: FormState): FormState => ({
  ...prevState,
  updatedAt: Date.now().toString(),
});

export const handleError = (prevState: FormState, error: Error): FormState => ({
  ...prevState,
  updatedAt: Date.now().toString(),
  error,
});

export const errors = {
  400: { message: "Bad Request", status: 400 },
  401: { message: "Unauthorized", status: 401 },
  500: { message: "Internal Server Error", status: 500 },
};
