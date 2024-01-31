export type FormState = {
  id: string;
  photoId: string;
  comment: string;
  error: {
    message: string;
  } | null;
};

export const initialFormState = (): FormState => ({
  id: Date.now().toString(),
  photoId: "",
  comment: "",
  error: null,
});
