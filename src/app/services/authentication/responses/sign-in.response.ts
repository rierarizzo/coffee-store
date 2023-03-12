export interface SignInResponse {
    statusCode: number;
    accessToken: string;
    userID: number;
    userEmail: string;
    userRole: string;
}