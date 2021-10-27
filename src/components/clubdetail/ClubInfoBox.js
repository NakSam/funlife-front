import { useState } from "react";
import UserWalletModal from "../user/UserWalletModal";
import DevideModal from "../clubdetail/DevideModal";
import ClubPayModal from "../clubdetail/ClubPayModal";
import ClubDepositModal from "../clubdetail/ClubDepositModal";
import { BoxWrapper, UserWalletInfoWrapper, LeftWalletInfo, RightWalletInfo, UserButton1 } from "./styled/ClubInfoBox.styled";

export default function ClubInfoBox({ club, clubWallet }) {
    const [showModal, setShowModal] = useState({show: false, type:4});
    console.log(club)
    return(
        <BoxWrapper club={club}>
            <UserWalletInfoWrapper>
                <LeftWalletInfo>포인트</LeftWalletInfo>
                <RightWalletInfo>
                    {clubWallet.toLocaleString()} P
                    <UserButton1 onClick={() => setShowModal({show: !showModal.show, type:4})}>내역</UserButton1>
                    {showModal.show && <UserWalletModal showModal={showModal} setShowModal={setShowModal} />}
                </RightWalletInfo>
            </UserWalletInfoWrapper>
            <div>
                <ClubDepositModal clubId={club.id} dues={club.dues} />
                <ClubPayModal clubId={club.id} />
                <DevideModal clubId={club.id} />
            </div>
        </BoxWrapper>
    )
};