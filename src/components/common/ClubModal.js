import { useRecoilState, useRecoilValue } from "recoil";
import { modalStatus } from "../../states/state";
import { Modal, Col } from "react-bootstrap";
import { ModalWrapper, ModalHeader, ModalImg, ModalLocWrapper, ModalTitle, ModalLocIcon, ModalLoc, ModalCatBadge, ModalImgWrapper, ModalRow, ModalCol, ModalColLabel, ClubButton } from "./styled/ClubModal.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClubModal from "../../hooks/useClubModal";
import { loginStatus } from "../../states/state";
import { useSelector } from "react-redux";
import axiosUtils from "../../utils/axiosUtils";
import {useCookies} from 'react-cookie';

export default function ClubModal({sendToMessage}){
    const [ showModal, setShowModal ] = useRecoilState(modalStatus);
    const { data } = useClubModal(showModal);
    const userStatus = useRecoilValue(loginStatus);
    const [cookies] = useCookies();
    const handleClose = () => setShowModal({...showModal, show: !showModal.show});
    const handleClubApply = () => {        
        if(!userStatus){
            return alert("로그인 후 신청하세요.")
        }
        if(userStatus){
            axiosUtils.get("/user/detail",{headers:{Authorization:cookies['naksam']}})
            .then((res) => {
                const msg = {
                    clubId: data.id,
                    clubName: data.name,
                    email: res.data.email,
                }
                sendToMessage("naksam", data.clubMasterId, msg, 2);
                alert("신청완료! 모임장의 수락 후 참여가능합니다.");
            });            
        }
        
    };
    return(
        <>
        {data && 
        <ModalWrapper show={showModal.show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalLocWrapper>
                    <ModalLocIcon>
                        <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                    </ModalLocIcon>
                    <ModalLoc>{data.location}</ModalLoc>
                </ModalLocWrapper>
                <ModalTitle>{data.name}</ModalTitle>
            </ModalHeader>
            <Modal.Body>
                <ModalImgWrapper>
                    <ModalImg src={data.image} />
                    <ModalCatBadge cate={data.category}>{data.category}</ModalCatBadge>
                </ModalImgWrapper>
                <ModalRow>
                    <ModalCol xs={6} md={4}>
                        <h3>👩‍👦‍👦</h3>
                        <ModalColLabel>{data.memberNum} / {data.maxMemberNum}인</ModalColLabel>
                    </ModalCol>
                    <Col xs={6} md={4}>
                        <h3>💰</h3>
                        <ModalColLabel>{data.dues.toLocaleString()} P</ModalColLabel>
                    </Col>
                </ModalRow>
                <small>{data.description}</small>
            </Modal.Body>
            <Modal.Footer>
                <ClubButton variant="outline-warning" onClick={handleClubApply}>신청하기</ClubButton>
            </Modal.Footer>
        </ModalWrapper>}
        </>
    );
}