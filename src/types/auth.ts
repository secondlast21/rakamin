export interface LoginTypes {
  email: string
  password: string
}

export interface RegisterTypes extends LoginTypes {
  name: string
  password_confirmation: string
}
