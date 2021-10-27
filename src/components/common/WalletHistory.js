import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

export default function WalletHistory({data}) {
    return (
        <>
        {data &&
        <div style={{overflow:"scroll", height:"23rem"}}>
        <Table sx={{maxWidth:"100%"}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell sx={{width:"2.5rem", paddingLeft:"0", paddingRight:"0"}} size="small" >분류</TableCell>
                    <TableCell sx={{width:"9rem", paddingLeft:"0", paddingRight:"0"}} size="small" align="center">내용</TableCell>
                    <TableCell sx={{width:"5rem", paddingLeft:"0", paddingRight:"0"}} size="small" align="center">금액</TableCell>
                    <TableCell sx={{width:"5rem", paddingLeft:"0", paddingRight:"0"}} size="small" align="center">일시</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.entries(data).map((item) => (
                    <TableRow
                        key={item[1].id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell sx={{fontSize:"0.5rem", fontFamily: 'S-CoreDream-4Regular', width:"2.5rem", paddingLeft:"0", paddingRight:"0"}} size="small" component="th" scope="row">{item[1].type}</TableCell>
                        <TableCell sx={{fontSize:"0.5rem", fontFamily: 'S-CoreDream-4Regular', width:"9rem", paddingLeft:"0", paddingRight:"0"}} size="small" align="center">{item[1].targetName}</TableCell>
                        <TableCell sx={{fontSize:"0.5rem", fontFamily: 'S-CoreDream-4Regular', width:"5rem", paddingLeft:"0", paddingRight:"0"}} size="small" align="center">{item[1].amount.toLocaleString()}</TableCell>
                        <TableCell sx={{fontSize:"0.5rem", fontFamily: 'S-CoreDream-4Regular', width:"5rem", paddingLeft:"0", paddingRight:"0"}} size="small" align="center">{item[1].dateTime.substr(2,8)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
        }</>
    )
}