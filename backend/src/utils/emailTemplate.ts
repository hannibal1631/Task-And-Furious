export const welcomeEmailTemplate = (name: string) => {};

export const resetPasswordTemplate = (
  name: string,
  hashedToken: string,
): string => {
  return `<div
    style="
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <div
      style="font-family: Arial; padding: 10px; color: #212121; width: 500px"
    >
      <h4>Logo</h4>
      <p>Hi ${name},</p>
      <p style="font-size: 15px; margin-bottom: 40px">
        We've received a request to reset your password. <br /><br />If you
        didn't make the request, just ignore this message. Otherwise, you can
        reset your password.
      </p>
      <a
        href="/"
        style="
          width: fit-content;
          text-decoration: none;
          background-color: #212121;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          outline: none;
          border: none;
        "
        >Reset your password</a
      >
      <p style="margin-top: 30px; font-size: 20px">
        Thanks,
        <span style="display: block; font-size: 15px; margin-top: 10px"
          >The Logo team</span
        >
      </p>
      <p>${hashedToken}</p>
    </div>
  </div>
`;
};

export const planUpgradeTemplate = (name: string, plan: string) => {};
