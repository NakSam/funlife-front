import { useState } from "react";
import UserWalletModal from "../user/UserWalletModal";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BoxWrapper, UserWalletInfoWrapper, LeftWalletInfo, RightWalletInfo, UserButton1, Button } from "./styled/ClubInfoBox.styled";

export default function ClubInfoBox({ club, clubWallet, setClubWallet }) {
    const [showModal, setShowModal] = useState({show: false, type:4});
    return(
        <BoxWrapper club={club}>
            <UserWalletInfoWrapper>
                <LeftWalletInfo>포인트</LeftWalletInfo>
                <RightWalletInfo>
                    {parseInt(clubWallet).toLocaleString()}
                    <UserButton1 onClick={() => setShowModal({show: !showModal.show, type:4})}>내역</UserButton1>
                    {showModal.show && <UserWalletModal showModal={showModal} setShowModal={setShowModal} clubWallet={clubWallet} setClubWallet={setClubWallet} club={club} />}
                </RightWalletInfo>
            </UserWalletInfoWrapper>
            <Row style={{margin:"1.3rem 0"}}>
                <Col style={{cursor:"pointer"}}
                 onClick={() => setShowModal({ show: !showModal.show, type: 5 })}>
                    <Button><FontAwesomeIcon size="lg" icon="fa-solid fa-coins" /></Button>
                    <Button>송금</Button>
                </Col>
                <Col style={{cursor:"pointer"}}
                 onClick={() => setShowModal({ show: !showModal.show, type: 6 })}>
                    <Button><FontAwesomeIcon icon="fa-solid fa-credit-card" /></Button>
                    <Button>결제</Button>
                </Col>
                <Col style={{cursor:"pointer"}}
                 onClick={() => setShowModal({ show: !showModal.show, type: 7 })}>
                    <Button><FontAwesomeIcon size="1x" icon="fa-solid fa-receipt" /></Button>
                    <Button>정산</Button>
                </Col>
            </Row>
        </BoxWrapper>
    )
};