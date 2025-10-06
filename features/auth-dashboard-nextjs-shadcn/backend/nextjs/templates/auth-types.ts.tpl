export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  user: AuthUser;
  expires: Date;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface AuthError {
  message: string;
  code: string;
  field?: string;
}
