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

export interface Admin {
  email: string;
  _id: string;
  fullName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  admin: Admin;
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

export type AppStatus = 'pending' | 'reviewing' | 'rejected' | 'accepted';

export interface Application {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  cdlLicense: string;
  state: string;
  drivingExperience: string;
  truckTypes: string[];
  longHaulTrips: boolean;
  createdAt: string;
  updatedAt: string;
  comments?: string;
  status: AppStatus;
  // server may include the original filename of the uploaded resume
  resumeFilename?: string;
  // virtual url for downloading the resume, provided by backend
  resumeUrl?: string | null;
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

// ===== DRIVER TYPES =====

export interface Driver {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  knowledgeTestPassed?: boolean;
}

export interface DriverRegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

export interface DriverLoginRequest {
  email: string;
  password: string;
}

export interface DriverLoginResponse {
  accessToken: string;
  driver: Driver;
}

export interface DriverApplication extends Application {
  driverId: string;
}

export interface DriverProfile {
  driver: Driver;
}

export interface DriverError extends GlobalError {
  data: {
    error: string;
  };
}

export interface KnowledgeTestQuestion {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export interface KnowledgeTestSubmitRequest {
  answers: Record<number, string>;
}

export interface KnowledgeTestResult {
  totalQuestions: number;
  correctCount: number;
  passed: boolean;
  results: {
    questionId: number;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}
