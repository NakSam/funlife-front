import { useQuery } from "react-query";
import axiosUtils from "../utils/axiosUtils";

export default function useClubModal(showModal) {
    return useQuery(['modal', showModal.clubId], () => fetchGetClubDetail(showModal.clubId, showModal.show));
}

const fetchGetClubDetail = async (clubId, show) => {
    if (clubId && show) {
        const { data } = await axiosUtils.get("/club/search/" + clubId);
        return data;
    }
};