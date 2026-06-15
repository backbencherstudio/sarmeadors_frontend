
export const getSubDomain = () => {
  if (typeof window === "undefined") return "";

  const host = window.location.hostname.toLowerCase();

  if (host === "localhost" || host === "127.0.0.1") {
    return "localhost";
  }

  if (host.endsWith(".localhost")) {
    return host.replace(".localhost", "");
  }

  const parts = host.split(".");

  return parts.length > 1 ? parts[0] : host;
};