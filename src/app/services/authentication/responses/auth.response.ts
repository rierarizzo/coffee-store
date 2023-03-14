export interface AuthResponse {
    accessToken: string;
    userID: number;
    userEmail: string;
    userRole: 'USER'|'ADMIN';
}