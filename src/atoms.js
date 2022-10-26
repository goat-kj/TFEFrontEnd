import { atom } from 'recoil'

export const isLoggedInState = atom({
    key: 'LoggedIn',
    default: false,
  })

export const reloaderState = atom({
    key: 'Reloader',
    default: 0,
})

export const messageReloaderState = atom({
  key: 'MsgReloader',
  default: 0,
})