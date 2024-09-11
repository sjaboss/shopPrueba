import type { User } from "./user.interfaces";

export interface AuthResponse {
    user: User;
    token: string;
}
