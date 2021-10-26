import { atom } from "recoil";
import cookie from "react-cookies";

export const modalStatus = atom({
    key : 'modal',
    default : {
        show: false,
        clubId: null
    }
})


export const UserWalletModalStatus = atom({
    key : 'userWalletModal',
    default : {
        show: false,
        type: ''
    }
})

export const loginStatus = atom({
    key: 'login',
    default: cookie.load("naksam")
})