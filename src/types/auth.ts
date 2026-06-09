/** Payload sent to the authentication endpoint. */
export interface LoginCredentials {
  username: string;
  password: string;
}

/** Successful response from `POST /auth/login`. */
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

/** Shape of validation errors surfaced by the login form. */
export interface LoginFormErrors {
  username?: string;
  password?: string;
}
