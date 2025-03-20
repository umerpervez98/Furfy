class Recaptcha {
  private constructor() {}

  static async getToken(
    actionType?: string
  ): Promise<{ rToken: string; success: boolean }> {
    const grecaptcha = (window as any).grecaptcha;

    try {
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
        { action: actionType?.replace(' ', '') || '' }
      );

      return {
        rToken: token,
        success: true,
      };
    } catch (error) {}

    return {
      rToken: '',
      success: false,
    };
  }
}

export default Recaptcha;
