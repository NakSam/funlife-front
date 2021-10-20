import { atom } from "recoil";

export const modalStatus = atom({
    key : 'modal',
    default : {
        show: false,
        clubId: null
    }
})