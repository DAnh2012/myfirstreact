import React, {useState, useEffect} from 'react';
import './style.css';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import NavBar from '../NavBar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { Icon, CardActions } from '@material-ui/core';





const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true,
};

const Slideshow = (props) => {
    return (
        <div className="slide-container">
        <Zoom {...zoomOutProperties}>
            {props.imgs.map((each, index) => (
            <img key={index} style={{ width: "100%" }} src={each} />
            ))}
        </Zoom>
        </div>
    );
}; 

const print = (list) => {
    let str,a;
    str = list.substring(2, list.length - 1);
    str = str.replaceAll(/(["'])/g,' ');
    a = str[0].toUpperCase;
    return str;
}

function Abcd(props)  {
    const [data, setData] =  useState( JSON.parse(localStorage.getItem(props.location.params)));
    if (data) {
        localStorage.setItem('id', JSON.stringify(data));
    } else if (data === null) {
        setData(JSON.parse(localStorage.getItem('id')))
    }

    if (data === null) return <div />
    const a = String(data[9]);
    const b = data[18].split(",");
    console.log(b);
    const c = 'http://webdatienloi.com:8765'
    const imgs = [
       c+ b[0],
       c+ b[1],
       c+ b[2],
      ]; 
    const e = data[7];
    const d = {
        0: 'Phòng trọ',
        1: 'Chung cư',
        2: 'Nhà nguyên căn',
        3: 'Chung cư nguyên căn'
    }
    const f = {
        0: 'khép kín',
        1: 'chung'
    }
    const m = {
        0: 'không',
        1: 'có'
    }
    return(
        <div>
            <NavBar />
            <br /> <br /> <br/><br /> <br />
        <div className="description main" >
        <h1 className="tile-product"> {data[5]} </h1>
        <div className="short-detail">
        </div>

        <div className="divide">&nbsp;</div>

        <div className='slideshow'><Slideshow imgs = {imgs}/></div>
        <div className="short-detail-wrap">
            <ul className="short-detail-2 clearfix pad-16">
                <li><span className="sp1">Mức giá: { " "}</span><span className="sp2">
                {
                 a.length === 7 ? a[0]+ '.'+ a[1] + 'tr VND/tháng' : a[0] + a[1] + '.' + a[2] + 'tr VND/tháng'
                 }
                 </span>
                 </li>
                <li><span className="sp1">Diện tích:  </span><span className="sp2"> {' ' + data[19] + ' m2'}</span></li>
            </ul>
                
                    <div style={{display:"inline"}} >Lưu tin </div>
                    <div className='round-button'>
                    
                    <CardActions disableSpacing >
                        <IconButton className='round-button-circle'>
                            <FavoriteIcon />
                        </IconButton>
                        </CardActions>
                    </div>
            
        </div>

        <div className="divide">&nbsp;</div>
        <div className="detail-product">
            <div className="detail-1 pad-bot-16">
                <span className="title-detail">Thông tin mô tả</span>
                <div className="des-product" style={{overflow: "visible"}}>
                    - Liên hệ: {data[2]} - {data[3]} <br/><br/>
                    - Email: {data[4]}  <br/><br/>
                    - Khu vực lân cận: { print(data[6])}
                    <br/><br/>Loại thuê: {d[e] + '  - '} Số phòng: {data[8]} 
                    <br/><br/> Phòng tắm:  {f[data[11]] + '          -'} <span>&nbsp;</span> <span>&nbsp;</span>  
                    Bình nước nóng:   {m[data[12]] +'        -'} <span>&nbsp;</span><span>&nbsp;</span>
                     Bếp:   {m[data[13]] + '          -'}<span>&nbsp;</span><span>&nbsp;</span> Ban công:    {m[data[14]]}
                    <br/><br/>
                    Giá điện: {data[15]+ 'kW/h'} <span>&nbsp;</span><span>&nbsp;</span> Giá nước: {data[16] + '/khối'}
                </div>
            </div>
        </div>
        <div className="divide">&nbsp;</div>
        <div className="product-config pad-16">
            <ul className="short-detail-2 list2 clearfix">
                <li><span className="sp1">Mã tin:</span><span className="sp3">25349155</span></li>
            </ul>
           
        </div>
        <div className="divide">&nbsp;</div>
    </div>
    </div> 
    )
    
}



export default Abcd;