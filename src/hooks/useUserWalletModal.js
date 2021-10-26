import axiosUtils from "../utils/axiosUtils";

export default function useUserWalletModal(type, money) {
    return userWallet(type, money);
}

const userWallet = async (type, money) => {
    const { data } = axiosUtils.post("/wallet/my/"+type, {
        money: money
    });
    return data;
};