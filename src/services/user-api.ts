import http from './httpConfig';

/**
 * 登录
 * @returns
 * @param email
 * @param password
 */
export const login = (email: string, password: string) => http.post({email, password}, '/user/login');

export const register = (data: object) => http.post(data, '/user/register');
