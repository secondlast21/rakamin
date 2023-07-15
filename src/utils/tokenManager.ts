import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const setTokenToCookies = (token: string) => cookies.set('token', token, { path: '/' })

export const getTokenFromCookies = () => cookies.get('token')

export const removeTokenFromCookies = () => cookies.remove('token')
