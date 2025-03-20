interface NewsletterResponse {
  error?: string;
  success?: boolean;
  message: string;
  code: string;
}

type OnRecaptchaSuccessProps = {
  formData: FormData;
  onFormSuccess: (data: NewsletterResponse, email: FormDataEntryValue) => void;
  onFormError: (error: string) => void;
};

export const newsletterSubmission = async ({
  formData,
  onFormSuccess,
  onFormError,
}: OnRecaptchaSuccessProps) => {
  const formEmail: FormDataEntryValue = formData?.getAll('email')[0] || '';

  const object: Record<string, FormDataEntryValue> = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });
  const json = JSON.stringify(object);

  fetch(`${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/api/public/newsletter`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: json,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      } else {
        onFormSuccess(data, formEmail);
      }
    })
    .catch((error) => {
      onFormError(error);
    });
};
