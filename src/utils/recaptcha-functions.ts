export type ValidateRecaptchaProps = {
  token: string;
  scoreThreshold: number;
  onRecaptchaSuccess: () => void;
  onRecaptchaError: (error: string) => void;
  email: string;
};

export const validateRecaptcha = async ({
  token,
  scoreThreshold,
  onRecaptchaSuccess,
  onRecaptchaError,
  email,
}: ValidateRecaptchaProps) => {

  try {
    const res = await fetch('/api/recaptcha', {
      method: 'POST',
      body: JSON.stringify({
        recaptchaToken: token,
        recaptchaScoreThreshold: scoreThreshold,
        email: email,
      }),
    });

    const data = await res.json();

    if (data.error) {
      throw data.error;
    } else {
      onRecaptchaSuccess();

      return data;
    }
  } catch (error) {
    onRecaptchaError(error as string);
    return error;
  }
};
