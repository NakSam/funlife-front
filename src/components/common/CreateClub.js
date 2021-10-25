import React, { useState } from "react";
import AWS from "aws-sdk";
import { styled } from '@mui/material/styles';
import { Dialog } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

//AWS S3 설정
const S3_BUCKET = 'naksam/img';
const REGION = 'ap-northeast-2';
const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
});

const myBucket = new AWS.S3({
    params:{Bucket:S3_BUCKET},
    region:REGION
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
    display: 'none',
});

const CreateClub = ({open, handleClose}) => {
    const [select, setSelect] = useState("https://naksam.s3.ap-northeast-2.amazonaws.com/img/default.png");
    const [uploadImg, setUploadImg] = useState(null);
    // const handleClose = () =>{
    //     setOpen(false);
    // }

    const onChange = (e) => {
        const img = e.target.files[0];        
        // const formData = new FormData();
        console.log(img);
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () =>{
            var result = reader.result;
            setSelect(result);            
        }
        setUploadImg(img);
        // setSelect(img);
        // formData.append('file', img);
        // console.log(formData);
    }

    const handleCreate = () => {
        if(uploadImg!==null){
            var today = new Date();

            var year = today.getFullYear();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            var day = ('0' + today.getDate()).slice(-2);
            var hours = ('0' + today.getHours()).slice(-2); 
            var minutes = ('0' + today.getMinutes()).slice(-2);
            var seconds = ('0' + today.getSeconds()).slice(-2); 

            var timeString = hours + minutes + seconds;

            var dateString = year + month  + day;
            
            const len = uploadImg.name.length;
            const lastDot = uploadImg.name.lastIndexOf('.');
            const filename = uploadImg.name.substring(0,lastDot);
            const fileExt = uploadImg.name.substring(lastDot,len);

            // console.log(filename);
            // console.log(fileExt);

            const name = filename+dateString+timeString+fileExt;
            //console.log(name); 
            const params = {
                ACL: 'public-read',
                Body: uploadImg,
                Bucket: S3_BUCKET,
                Key: name
            }
            myBucket.upload(params, (err) => {
                if(err){

                } else {
                    // axios.post('http://naksam.169.56.174.130.nip.io/club/register',{
                    //     amount: 0,
                    //     category: "string",
                    //     description: "string",
                    //     image: "string",
                    //     location: "string",
                    //     maxMemberNum: 0,
                    //     name: "string"
                    // })
                    console.log("create");
                }
            });
            // myBucket.putObject(params).on('httpUploadProgress', (evt) => {
                
            // })
        }
    }

    return(
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            style={{textAlign:"center"}}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <ArrowBackIosNewIcon/>
                </IconButton>
                <Typography>모임 만들기</Typography>
            </Toolbar>
            <div style={{margin:"20px 50px 20px 50px", borderRadius:"20px", border:"0.5px solid"}}>
                <img style={{borderRadius:"20px"}} alt="club-img" src={select}/>
            </div>
            <div>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onChange}/>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>
            </div>
            <div>
                <TextField style={{display:"flex", margin:"25px"}} id="outlined-basic" label="모임명" variant="outlined" />
            </div>
            <div>
                <FormControl fullWidth>
                    <InputLabel style={{margin:"25px"}}  id="demo-simple-select-label">분류</InputLabel>
                    <Select
                    style={{margin:"25px"}} 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    >
                    <MenuItem value={"스포츠"}>스포츠</MenuItem>
                    <MenuItem value={"스터디"}>스터디</MenuItem>
                    <MenuItem value={"맛집탐방"}>맛집탐방</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth>
                    <InputLabel style={{margin:"25px"}}  id="demo-simple-select-label">지역</InputLabel>
                    <Select
                    style={{margin:"25px"}} 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    >
                    <MenuItem value={"강남구"}>강남구</MenuItem>
                    <MenuItem value={"강동구"}>강동구</MenuItem>
                    <MenuItem value={"강서구"}>강서구</MenuItem>
                    <MenuItem value={"강북구"}>강북구</MenuItem>
                    <MenuItem value={"중구"}>중구</MenuItem>
                    </Select>
                </FormControl>
            </div>            
            <div>
                <FormControl fullWidth>
                    <InputLabel style={{margin:"25px"}}  id="demo-simple-select-label">정원</InputLabel>
                    <Select
                    style={{margin:"25px"}} 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <TextField style={{display:"flex", margin:"25px"}} id="outlined-basic" label="회비(원)" variant="outlined" />
            </div>
            <div style={{textAlign:"center"}}>
                <Button variant="outlined" style={{width:"50%", height:"50px"}} onClick={handleCreate}>
                    만들기
                </Button>
            </div>
        </Dialog>
    );    
}

export default CreateClub;