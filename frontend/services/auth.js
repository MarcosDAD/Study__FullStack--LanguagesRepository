export const TOKEN_KEY = 'languagerepository-token';
export const USERID_KEY = 'languagerepository-userID';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserId = () => localStorage.getItem(USERID_KEY);
    
export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = (token) => {
    localStorage.removeItem(TOKEN_KEY);
};