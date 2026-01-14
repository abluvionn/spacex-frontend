export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  email: string;
  _id: string;
  fullName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface GlobalError {
  data: unknown;
  status: number;
}

export interface LoginError extends GlobalError {
  data: {
    error: string;
  };
}
