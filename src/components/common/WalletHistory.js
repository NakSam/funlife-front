import React from "react";
import '../../static/icons/FontAwesome';

const WalletHistory = ({data}) => {
    return (
        data && Object.entries(data).map((item) => {
            return (
                <div key={item[1].id} value={item[1].id}>
                    <span>{item[1].type}</span>
                    <span>{item[1].targetName}</span>
                    <span>{item[1].amount}</span>
                    <span>{item[1].dateTime}</span>
                </div>
            )
        })
    )
}

export default WalletHistory;