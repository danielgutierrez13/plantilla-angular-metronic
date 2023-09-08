export interface LoginModelRequest {
  username: string;
  password: string;
}

export interface LoginModelResponse {
  status: boolean;
  username: string;
  dni?: string;
  role: string;
  token: string;
}
