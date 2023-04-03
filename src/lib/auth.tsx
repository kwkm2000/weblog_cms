// import { Spinner } from "@/components/Elements";
import {
  loginWithUsernameAndPassword,
  getUser,
  registerWithUsernameAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
} from "@/features/auth";
import storage from "@/utils/storage";

import { configureAuth } from "react-query-auth";

async function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data;
  storage.setToken(jwt);

  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithUsernameAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithUsernameAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn: loadUser,
  loginFn: loginFn,
  registerFn: registerFn,
  logoutFn: logoutFn,
});
