import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  res.json({
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      AMAZON_COM_COOKIE: process.env.AMAZON_COM_COOKIE,
      AMAZON_AE_COOKIE: process.env.AMAZON_AE_COOKIE,
      AMAZON_AE_DOLLAR_COOKIE: process.env.AMAZON_AE_DOLLAR_COOKIE,
      USER_AGENT: process.env.USER_AGENT,
      PROXY_URL: process.env.PROXY_URL,
    },
  });
};

export default handler;
