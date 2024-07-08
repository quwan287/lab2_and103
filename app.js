// import thư viện
const express = require('express');
const mongoose = require('mongoose');
const sinhvien = require('./sinhvienModel');
// tạo đối tượng express
const app = express ();
app.set('view engine', 'ejs');
// kết nối với csdl
mongoose.connect('mongodb://localhost:27017/AND103',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Đã kết nối thành công với MongoDB");
}).catch((err)=>{
    console.log(err);// in ra lỗi
});
// khi người dùng gọi localhost:3000/sinhvien => đọc dữ liệu từ CSDL
app.get('/sinhvien',async (req,res)=>{
    try{
        const sinhviens = await sinhvien.find();// đọc dữ liệu từ csdl
        //res.json(sinhviens);// chuyển dữ liệu sang json
        res.render('students',{sinhviens:sinhviens});
        console.log(sinhviens);// in kết quả ra log
    }
    catch(err){
        console.error(err);// in ra lỗi
        res.status(500).json({error:'Internet Server Error'});// trả về looxicho người dùng
    }
});
// tạo cổng dịch vụ
const PORT = process.env.PORT || 3000;
// server lắng nghe
app.listen(PORT,()=>{
    console.log('server đang chạy ở cổng 3000');
});