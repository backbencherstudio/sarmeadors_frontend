// server base url
export const URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://127.0.0.1:4000";
// app config
export const AppConfig = () => ({
  app: {
    // server endpoint
    url: URL,
    name: "Sarmeadors",
    slogan: "Sarmeadors Maid ",
    meta: {
      description: "Sarmeadors Maid ",
      keywords: "Sarmeadors Maid ",
    },

    // api endpoint
    apiUrl: `${URL}/api`,
  },
});
