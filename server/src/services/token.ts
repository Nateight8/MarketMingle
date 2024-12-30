import axios from "axios";

export const generateTokens = async (code: string) => {
  const insta_form = new FormData();
  insta_form.append("client_id", process.env.INSTAGRAM_CLIENT_ID as string);

  insta_form.append(
    "client_secret",
    process.env.INSTAGRAM_CLIENT_SECRET as string
  );
  insta_form.append("grant_type", "authorization_code");
  insta_form.append(
    "redirect_uri",
    `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
  );
  insta_form.append("code", code);

  const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
    method: "POST",
    body: insta_form,
  });

  const token = await shortTokenRes.json();
  if (token.permissions.length > 0) {
    console.log(token, "got permissions");
    const long_token = await axios.get(
      `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
    );

    return long_token.data;
  }
};
