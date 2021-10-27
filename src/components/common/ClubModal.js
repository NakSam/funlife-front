import { useRecoilState } from "recoil";
import { modalStatus } from "../../states/state";
import { Modal, Col } from "react-bootstrap";
import { ModalWrapper, ModalHeader, ModalImg, ModalLocWrapper, ModalTitle, ModalLocIcon, ModalLoc, ModalCatBadge, ModalImgWrapper, ModalRow, ModalCol, ModalColLabel, ClubButton } from "./styled/ClubModal.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClubModal from "../../hooks/useClubModal";
import axiosUtils from "../../utils/axiosUtils";

export default function ClubModal(){
    const [ showModal, setShowModal ] = useRecoilState(modalStatus);
    const { data } = useClubModal(showModal);

    const handleClose = () => setShowModal({...showModal, show: !showModal.show});
    const handleClubApply = () => {
        axiosUtils.post('/club/join/'+data.id ).then((response) => {

          })
          .catch((error) => {
            
          })
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