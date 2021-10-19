import { useQuery } from "react-query";
import axiosUtils from "../utils/axiosUtils";

export default function useSearchList(searchDic) {
    return useQuery([searchDic], () => fetchGetSearchResult(searchDic));
}

const fetchGetSearchResult = async (searchDic) => {
    console.log(searchDic);
    const { data } = await axiosUtils.get("/club", {
        params : {
            location : searchDic.location,
            category : searchDic.category,
            clubname : searchDic.clubname,
        },
    });
    return data;
};