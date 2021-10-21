import { useRecoilState } from "recoil";
import { modalStatus } from "../../states/state";
import { Modal, Col, Button } from "react-bootstrap";
import { ModalHeader, ModalImg, ModalLocWrapper, ModalTitle, ModalLocIcon, ModalLoc, ModalCatBadge, ModalImgWrapper, ModalRow, ModalCol, ModalColLabel } from "./styled/LIstModal.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ClubModal(){
    const [ showModal, setShowModal ] = useRecoilState(modalStatus);
    
    const handleClose = () => setShowModal({...showModal, show: !showModal.show});
    const handleClubApply = () => setShowModal({...showModal, show: !showModal.show});
    console.log("김형준바보");
    return(
        <Modal show={showModal.show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalLocWrapper>
                    <ModalLocIcon>
                        <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                    </ModalLocIcon>
                    <ModalLoc>{dummy.location}</ModalLoc>
                </ModalLocWrapper>
                <ModalTitle>{dummy.clubName}</ModalTitle>
            </ModalHeader>
            <Modal.Body>
                <ModalImgWrapper>
                    <ModalImg src={dummy.thumbnail} />
                    <ModalCatBadge>{dummy.category}</ModalCatBadge>
                </ModalImgWrapper>
                <ModalRow>
                    <ModalCol xs={6} md={4}>
                        <FontAwesomeIcon icon="fa-solid fa-users" />
                        <ModalColLabel>{dummy.currentPerson} / {dummy.maxPerson}인</ModalColLabel>
                    </ModalCol>
                    <Col xs={6} md={4}>
                        <FontAwesomeIcon icon="fa-solid fa-wallet" />
                        <ModalColLabel>{dummy.dues}원</ModalColLabel>
                    </Col>
                </ModalRow>
                <small>{dummy.description}</small>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleClubApply}>
                    신청하기
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const dummy = {
    "clubName": "역삼 스터디",
    "location": "강남구",
    "currentPerson": 2,
    "maxPerson": 8,
    "dues": 50000,
    "category": "스터디",
    "description": "역삼 스터디는 주 2회 (월, 목) 스터디를 진행합니다.",
    "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/books_1920.jpg"
}