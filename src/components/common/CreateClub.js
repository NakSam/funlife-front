import React, { useState } from "react";
import AWS from "aws-sdk";
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Dialog, InputAdornment, Toolbar, IconButton, Slide } from "@mui/material";
import { DialogTitle, DialogWrapper, ImgWrapper, ImgUploadButton, LabelInputBox, InputBox, LabelSelectBox, SelectBox, DescriptionBox, CreateButton } from "./styled/CreateClub.styled";
import { CategoryList, LocationList } from "../../consts/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../static/icons/FontAwesome';
import { isEmptyList, moneyLimit } from '../../utils/ValidationCheck'

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
    const [inputData, setInputData] = useState({
        image: "",
        name: "",
        category: "",
        location: "",
        maxMemberNum: "2",
        amount: "",
        description: ""
    })

    const onChange = (e) => {
        const img = e.target.files[0];        
        // const formData = new FormData();
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

        //공백 검사
        var emptyCheck = isEmptyList(inputData);
        if(!emptyCheck == ''){
            alert(emptyCheck);
            return;
        }

        //금액제한
        var moneyCheck = moneyLimit(inputData.amount);
        if(!moneyCheck == ''){
            alert(moneyCheck);
            return;
        }

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
                    console.log(err);
                } else {
                    inputData.image="https://naksam.s3.ap-northeast-2.amazonaws.com/img/"+name;
                    inputData.amount=Number(inputData.amount);
                    //console.log(inputData.image);
                    // axios.post('https://naksam.169.56.174.130.nip.io/club/register',{
                    //     amount: inputData.amount,
                    //     category: inputData.category,
                    //     description: inputData.description,
                    //     image: inputData.image,
                    //     location: inputData.location,
                    //     maxMemberNum: inputData.maxMemberNum,
                    //     name: inputData.name
                    // })
                    axios({
                        method:"post",
                        url:"https://naksam.169.56.174.130.nip.io/club/register",
                        data:{
                            amount: inputData.amount,
                            category: inputData.category,
                            description: inputData.description,
                            image: inputData.image,
                            location: inputData.location,
                            maxMemberNum: inputData.maxMemberNum,
                            name: inputData.name
                        }
                    })
                    .then((res)=>{
                        //console.log(res);
                    })
                    .catch((err)=>{
                        //console.log(err);
                    })
                    
                }
            });            
        }
    }
    const handleChange = (e) => {
        setInputData({...inputData, [e.target.name]:e.target.value})
    }

    return(
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            style={{textAlign:"center"}}
        >
            <Toolbar style={{marginTop:"0.7rem"}}>
                <IconButton
                    edge="start"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <ArrowBackIosNewIcon/>
                </IconButton>
                <DialogTitle variant="h6">모임 만들기</DialogTitle>
            </Toolbar>
            <DialogWrapper>
                <ImgWrapper>
                    <img style={{objectFit:"cover", height:"100%"}} alt="club-img" src={select}/>
                <ImgUploadButton>
                    <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={onChange}/>
                        {!uploadImg && <div style={{color: "#a1a1a199", fontSize:"6rem"}}>
                            <FontAwesomeIcon aria-label="upload picture" icon="fa-solid fa-circle-plus" />
                        </div>}
                    </label>
                </ImgUploadButton>
                </ImgWrapper>
                <div>
                    <LabelInputBox htmlFor="clubname">모임명</LabelInputBox>
                    <InputBox name="name" id="clubname" type="text" maxLength="20" value={inputData.name} onChange={handleChange} />
                </div>
                <Row>
                    <Col>
                        <LabelSelectBox htmlFor="category">분류</LabelSelectBox>
                        <SelectBox aria-label="category" 
                            name="category"
                            onChange={handleChange}
                            value={inputData.category}
                        >
                            <option>선택</option>
                            {Object.entries(CategoryList).map(([key, value]) => {
                                if (key !== "전체") return <option value={value} key={key}>{value}</option>
                                else return null
                            })}
                        </SelectBox>
                    </Col>
                    <Col>
                        <LabelSelectBox htmlFor="location">지역</LabelSelectBox>
                        <SelectBox aria-label="location"
                            name="location"
                            onChange={handleChange}
                            value={inputData.location}
                        >
                            <option>선택</option>
                            {Object.entries(LocationList).map(([key, value]) => {
                                if (key !== "전체") return <option value={value} key={key}>{value}</option>
                                else return null
                            })}
                        </SelectBox>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LabelInputBox htmlFor="peoplecnt">정원</LabelInputBox>
                        <SelectBox aria-label="peoplecnt"
                            name="maxMemberNum"
                            onChange={handleChange}
                            value={inputData.maxMemberNum}
                        >
                        {[2, 3, 4, 5, 6, 7, 8, 9,10].map((cnt) => {
                            return <option key={cnt} value={cnt}>{cnt}인</option>
                        })}
                        </SelectBox>
                    </Col>
                    <Col>
                        <LabelSelectBox htmlFor="amount">회비</LabelSelectBox>
                        <InputBox 
                            InputProps={{
                                startAdornment: <InputAdornment position="start">P</InputAdornment>,
                            }}
                            maxLength="10"
                            name="amount" 
                            type="number"
                            id="amount" 
                            value={inputData.amount} 
                            onChange={handleChange} 
                        />
                    </Col>
                </Row>
                <div>
                    <LabelInputBox htmlFor="description">상세 정보</LabelInputBox>
                    <DescriptionBox name="description" id="description" value={inputData.description} onChange={handleChange} />
                </div>
                <CreateButton variant="outlined" onClick={handleCreate}>모임 개설</CreateButton>
            </DialogWrapper>
        </Dialog>
    );    
}

export default CreateClub;