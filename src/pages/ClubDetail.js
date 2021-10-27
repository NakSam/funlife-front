import { TitleWrapper, DetailTitle, InviteButton } from "./styled/ClubDetail.styled";
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axiosUtils from "../utils/axiosUtils";
import TabBox from "../components/clubdetail/TabBox";
import ClubInfoBox from '../components/clubdetail/ClubInfoBox';
import InviteModal from '../components/clubdetail/InviteModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ClubDetail() {
    let query = new URLSearchParams(useLocation().search);

    const [club, setClub] = useState();
    const [clubWallet, setClubWallet] = useState();
    const [inviteModal, setInviteModal] = useState(false);

    useEffect(() => {
        axiosUtils.get('/wallet/club/' + query.get("clubId") + '/history')
            .then((res) => { setClubWallet(res.data.amount) })
        axiosUtils.get('/club/search/' + query.get("clubId"))
            .then((res) => { setClub(res.data) })
    }, [club])

    return (
        <>
            {club && clubWallet && <div>
                <TitleWrapper>
                    <DetailTitle>{club.name}</DetailTitle>
                    <InviteButton onClick={() => setInviteModal({ show: !inviteModal.show })}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> 초대</InviteButton>
                    <InviteModal name={club.name} inviteModal={inviteModal} setInviteModal={setInviteModal} />
                </TitleWrapper>
                <ClubInfoBox club={club} clubWallet={clubWallet} />
                <TabBox club={club} />
            </div>}
        </>
    );
}