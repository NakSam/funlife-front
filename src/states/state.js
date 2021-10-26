import { atom } from "recoil";

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