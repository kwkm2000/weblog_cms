import {
  loginWithUsernameAndPassword,
  registerWithUsernameAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
} from "@/features/auth";
import storage from "@/utils/storage";

function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data;
  storage.setToken(jwt);

  return user;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithUsernameAndPassword(data);
  const user = handleUserResponse(response);
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

// export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
//   userFn: loadUser,
//   loginFn: loginFn,
//   registerFn: registerFn,
//   logoutFn: logoutFn,
// });

function useAuth() {
  return {
    login: loginFn,
    register: registerFn,
    logout: logoutFn,
  };
}

export default useAuth;
