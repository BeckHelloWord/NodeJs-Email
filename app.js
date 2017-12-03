'use strict'
// 参考资料 https://mp.weixin.qq.com/s?__biz=MzU0OTE3MjE1Mw==&amp;mid=2247483763&amp;idx=1&amp;sn=0166a93351c092aeb2c4efb8c0e0a4b3&amp;chksm=fbb2a7a5ccc52eb3b241f32601a23be8a431e671ff493327ff61becc4f4ceb1da319ec6c8ea8#rd
const nodemailer=require('nodemailer'),
      fs=require('fs'),
      path=require('path'),
      ejs=require('ejs');

//创建一个发件服务
let transporter=nodemailer.createTransport({
    service:'qq',
    port:465,
    secureConnection:true,
    auth:{
        user:'444870506@qq.com',
        pass:'ilidhcposfidbjhi' //注意此处为发件方的stmp授权码
    }
});

//读取邮件模板，使用参数替换模板中的占位符
const template=ejs.compile(fs.readFileSync(path.resolve(__dirname,'email.ejs'),'utf8')),
      html=template({
        themeTxt:'这是一份来自NodeJs的邮件',
        themeTitle:'这是测试标题',
        themeCon:'这是测试内容'
      });

//邮件信息
let mailOptions={
    from:'444870506@qq.com',    //发件人
    to:'yuwei_shiny@163.com',   //收件人
    subject:'胖胖',    //标题
    html:html, //正文
    //添加附件
    attachments:[
        {
            filename:'mm',
            path:path.resolve(__dirname,'touxiang.jpg'),
            cid:'01'
        },
        {
            filename:'txt',
            path:path.resolve(__dirname,'txt.txt'),
            cid:'02'
        }
    ]
}

//发送邮件
transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        return console.log(error);
    }
    console.log('Message sent: %s',info.messageId);
})