"use server";

import { cookies } from "next/headers";

// Token
export default async function setToken(token: string, role?: string) {
  (await cookies()).set("accessToken", token);
  if (role) {
    (await cookies()).set("isLoggedIn", role);
  }
}

export const getToken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return accessToken;
};

export const getRole = async () => {
  const role = (await cookies()).get("isLoggedIn")?.value;
  return role;
};

export async function removeToken() {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("isLoggedIn");
}
