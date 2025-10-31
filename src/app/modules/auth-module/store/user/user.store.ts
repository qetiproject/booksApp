import { Users } from "@auth-module";

export interface UserState {
    loading: boolean;
    error: string | null;
    response: Users;
}