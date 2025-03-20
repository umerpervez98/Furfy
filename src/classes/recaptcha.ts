interface ReCaptcha {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

class Recaptcha {
  private constructor() { }

  static async getToken(
    actionType?: string
  ): Promise<{ rToken: string; success: boolean }> {
    const grecaptcha = ((window as unknown) as { grecaptcha: ReCaptcha }).grecaptcha;
    const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
    if (!recaptchaKey) throw new Error("Missing RECAPTCHA_KEY");

    try {
      const token = await grecaptcha.execute(
        recaptchaKey,
        { action: actionType?.replace(' ', '') || 'default' }
      );

      return {
        rToken: token,
        success: true,
      };
    } catch { }

    return {
      rToken: '',
      success: false,
    };
  }
}

export default Recaptcha;
