import { useRecoilState } from "recoil";
import { modalStatus } from "../../states/state";
import { Modal, Col, Button } from "react-bootstrap";
import { ModalHeader, ModalImg, ModalLocWrapper, ModalTitle, ModalLocIcon, ModalLoc, ModalCatBadge, ModalImgWrapper, ModalRow, ModalCol, ModalColLabel } from "./styled/ClubModal.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClubModal from "../../hooks/useClubModal";

export default function ClubModal(){
    const [ showModal, setShowModal ] = useRecoilState(modalStatus);
    const { data } = useClubModal(showModal);

    const handleClose = () => setShowModal({...showModal, show: !showModal.show});
    const handleClubApply = () => setShowModal({...showModal, show: !showModal.show});
    return(
        <>
        {data && 
        <Modal show={showModal.show} onHide={handleClose}>
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
                    <ModalCatBadge>{data.category}</ModalCatBadge>
                </ModalImgWrapper>
                <ModalRow>
                    <ModalCol xs={6} md={4}>
                        <h3>👩‍👦‍👦</h3>
                        {/* <FontAwesomeIcon icon="fa-solid fa-user" /> */}
                        <ModalColLabel>{data.memberNum} / {data.maxMemberNum}인</ModalColLabel>
                    </ModalCol>
                    <Col xs={6} md={4}>
                        <h3>💰</h3>
                        {/* <FontAwesomeIcon icon="fa-solid fa-wallet" /> */}
                        <ModalColLabel>{data.dues.toLocaleString()} P</ModalColLabel>
                    </Col>
                </ModalRow>
                <small>{data.description}</small>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleClubApply}>신청</Button>
            </Modal.Footer>
        </Modal>}
        </>
    );
}