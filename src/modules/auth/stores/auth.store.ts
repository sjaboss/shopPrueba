import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { AuthStatus, type User } from '../interfaces'
import { checkAuthAction, loginAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';
import { registerAction } from '../actions/register.action';

export const useAuthStore = defineStore('auth', () => {

    //javi uno puede tener tres estados (Authenticated unAutenticated, Cheking)
    const authStatus = ref<AuthStatus>(AuthStatus.Cheking);
    const user = ref<User | undefined>();
    const token = ref(useLocalStorage('token', ''));

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

    const register = async (fullName: string, email: string, password: string) => {
        try {
            const registerResp = await registerAction(fullName, email, password);
            if (!registerResp.ok) {
                logout();
                return { ok: false, message: registerResp.message }
            }

            user.value = registerResp.user;
            token.value = registerResp.token
            authStatus.value = AuthStatus.Authenticated;
            return { ok: true, message: 'Se croe de manera axitosa el usuario' }
        } catch (error) {
            console.log(error);
            return { ok: false, message: 'Error al intentar registrar el usuario' }
        }
    }





    const logout = () => {
        localStorage.removeItem('token')
        authStatus.value = AuthStatus.UnAuthenticated;
        user.value = undefined;
        token.value = '';
        console.log('Usuario cerrado')
        return false;
    }


    const checkAuthStatus = async (): Promise<boolean> => {
        try {
            const statusResp = await checkAuthAction();
            if (!statusResp.ok) {
                logout();
                return false;
            }
            //si todo sale bien
            authStatus.value = AuthStatus.Authenticated
            user.value = statusResp.user;
            token.value = statusResp.token;
            return true;
        } catch (error) {
            logout();
            return false
        }
    }
    return {
        user,
        token,
        authStatus,
        //Getters
        isChecking: computed(() => authStatus.value == AuthStatus.Cheking),
        isAuthenticated: computed(() => authStatus.value == AuthStatus.Authenticated),
        // TODO: getter para saber si es un administrador o no
        isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),
        username: computed(() => user.value?.fullName),
        //Acciones
        login,
        logout,
        register,
        checkAuthStatus,

    }
})
