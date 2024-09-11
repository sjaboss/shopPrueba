import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { AuthStatus, type User } from '../interfaces'
import { loginAction } from '../actions';

export const useAuthStore = defineStore('auth', () => {

    //javi uno puede tener tres estados (Authenticated unAutenticated, Cheking)
    const authStatus = ref<AuthStatus>(AuthStatus.Cheking);
    const user = ref<User | undefined>();
    const token = ref('');

    const login = async (email: string, password: string) => {
        try {
            const loginResp = await loginAction(email, password);
            if (!loginResp.ok) {
                logout();
                return false;
            }

            user.value = loginResp.user;
            token.value = loginResp.token
            authStatus.value = AuthStatus.Authenticated;
            return true;
        } catch (error) {
            console.log(error);
            return logout();
        }

    }

    const logout = () => {
        authStatus.value = AuthStatus.UnAuthenticated;
        user.value = undefined;
        token.value = '';
        return false;
    }

    return {
        user,
        token,
        authStatus,
        //Getters
        isChecking: computed(() => authStatus.value == AuthStatus.Cheking),
        isAuthenticated: computed(() => authStatus.value == AuthStatus.Authenticated),
        // TODO: getter para saber si es un administrador o no
        username: computed(() => user.value?.fullName),
        //Acciones
        login,
    }
})
