export interface LoginInterfacesRequest {
  username: string;
  password: string;
}

export interface LoginInterfacesResponse {
  status: boolean;
  username: string;
  dni?: string;
  role: string;
  token: string;
}
