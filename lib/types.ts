export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone: string;
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

export interface Application {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  cdlLicense: string;
  state: string;
  drivingExperience: string;
  truckTypes: string[];
  longHaulTrips: 'yes' | 'no';
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  comments?: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface GetApplicationsResponse {
  data: Application[];
  pagination: PaginationInfo;
}

// Type for logout response
export interface LogoutResponse {
  message: string;
}
