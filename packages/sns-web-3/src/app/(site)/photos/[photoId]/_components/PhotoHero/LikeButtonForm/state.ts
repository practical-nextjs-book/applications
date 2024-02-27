export type FormState = {
  updatedAt: string;
  liked: boolean;
  likedCount: number;
  error: { message: string; status: number } | null;
};

export const initialFormState = (
  initialState?: Partial<FormState>,
): FormState => ({
  updatedAt: Date.now().toString(),
  liked: false,
  likedCount: 0,
  error: null,
  ...initialState,
});

// ★ いいね済み状態へと更新して返す関数
export const handleSuccess = (prevState: FormState): FormState => ({
  ...prevState,
  updatedAt: Date.now().toString(),
  liked: true,
  likedCount: prevState.likedCount + 1, // ★ いいね数を増やす
  error: null,
});

// ★ エラー状態へと更新して返す関数
export const handleError = (
  prevState: FormState,
  error: {
    message: string;
    status: number;
  },
): FormState => ({
  ...prevState,
  updatedAt: Date.now().toString(),
  error,
});
export const errors = {
  400: { message: "Bad Request", status: 400 },
  401: { message: "Unauthorized", status: 401 },
  500: { message: "Internal Server Error", status: 500 },
};
