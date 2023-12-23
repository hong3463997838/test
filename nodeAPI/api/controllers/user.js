const dbconfig = require('../util/dbconfig')
const svgCaptcha = require('svg-captcha')

const jwt = require("jsonwebtoken");     //用于生成token
const expressJwt = require("express-jwt"); //用于鉴权配置
const secretKey = "it123324...source";            //用于生成密钥
const  jxjwt =require('jsonwebtoken') 
// 用户注册
register = function (req, res, next) {
  let uid = req.body.uid
  let upassword = req.body.upassword
  let uname=req.body.uname
  let uimgUrl='https://tse4-mm.cn.bing.net/th/id/OIP-C.1XFk7MlJW8aFDTBsRX1stgHaHa?pid=ImgDet&rs=1'
  let sql = 'insert into user (uid,uname,upassword,uimgUrl) values (?,?,?,?)'
  let sqlArr = [uid,uname,upassword,uimgUrl];
  const callback = (err, result) => {
    if (err) {
      console.log('数据库连接出错');
      console.log(err);
    }
    else {
      res.send({ mag: '插入成功', code: 200, data: result })
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callback)
};

// 生成token并插入数据库
updateToken = function (req, res, next) {
  let uid = req.body.uid
      // 生成token
      const  tokenStr=jwt.sign(
        {utoken:uid},//需要转存的信息对象，不要把敏感信息，如密码存入
        secretKey,//密钥
        {expiresIn:'24h'}//配置token的有效期
      )
   //  把生成的token插入数据库中
   let sql = 'update user set token=? where uid=? '
   let sqlArr = [tokenStr,uid];
   const callback = (err, result) => {
     if (err) {
       console.log('数据库连接出错');
       console.log(err);
     }
     else {
      res.status(200).send({ code: 200, msg: '插入token成功',data: result});

     }
   }
   dbconfig.sqlConnect(sql, sqlArr, callback)
 

}

// 用户登录
login = function (req, res, next) {
  let uid = req.body.uid
  let upassword = req.body.upassword
  let sql = 'select * from  user where uid=?'
  let sqlArr = [uid];
  const callback = (err, result) => {
    if (err) {
      console.log('数据库连接出错');
      console.log(err);
    }
    else {
      if (result.length > 0) {
        if (result[0].upassword == upassword) {
  res.status(200).send({ code: 200, msg: '登录成功',data: result});
        } else {
          res.status(-200).send({ code: -200, msg: '密码错误', });
        }
      } else {
        res.status(404).send({ code: -200, msg: '用户不存在', });
      }
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callback)
}

// 根据token查询用户数据
selectUser = function (req, res, next) {
  // 解析获取的token数据
  const token = jxjwt.decode(req.headers.token);
  if(token==''){
    return false
  }
  // console.log(token);
  let sql = 'select * from  user where uid=?'
  let sqlArr = [token.utoken];
  const callback = (err, result) => {
    if (err) {
      console.log('数据库连接出错');
      console.log(err);
    }
    else {
      if (result.length > 0) {
    res.status(200).send({ code: 200, msg: '查询成功',data: result});
      } else {
        res.status(404).send({ code: -200, msg: '用户不存在', });
      }
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callback)
}


// 个人信息页面中，保存或修改用户数据
updateUser = function (req, res, next) {
let {uid,uname,uimgUrl,sign,gender,birthday}=req.body
console.log(uname);
  let sql = 'update user set uname=?,gender=?,uimgUrl=?,sign=?,birthday=? where uid=? '
  let sqlArr = [uname,gender,uimgUrl,sign,birthday,uid];
  const callback = (err, result) => {
    if (err) {
      console.log('数据库连接出错');
      console.log(err);
    }
    else {
      res.send({ mag: '修改成功', code: 200, data: result })
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callback)
};


// 修改用户头像
updateUserImg = function (req, res, next) {
  let {uimgUrl,uid}=req.body
  // console.log(uimgUrl,uid);
    let sql = 'update user set uimgUrl=? where uid=? '
    let sqlArr = [uimgUrl,uid];
    const callback = (err, result) => {
      if (err) {
        console.log('数据库连接出错');
        console.log(err);
      }
      else {
        res.send({ mag: '修改头像成功', code: 200, data: result })
      }
    }
    dbconfig.sqlConnect(sql, sqlArr, callback)
  };

  // 用户修改密码
  updateUserPassword = function (req, res, next) {
    let {upassword,uid}=req.body
      let sql = 'update user set upassword=? where uid=? '
      let sqlArr = [upassword,uid];
      const callback = (err, result) => {
        if (err) {
          console.log('数据库连接出错');
          console.log(err);
        }
        else {
          res.send({ mag: '修改密码成功', code: 200, data: result })
        }
      }
      dbconfig.sqlConnect(sql, sqlArr, callback)
    };

    // 用户在帮助中心留言
    leaveMessage = function (req, res, next) {
      let uid = req.body.uid
      let umessage = req.body.umessage
      let sql = 'insert into leavemessage (uid,umessage) values (?,?)'
      let sqlArr = [uid,umessage];
      const callback = (err, result) => {
        if (err) {
          console.log('数据库连接出错');
          console.log(err);
        }
        else {
          res.send({ mag: '留言成功', code: 200, data: result })
        }
      }
      dbconfig.sqlConnect(sql, sqlArr, callback)
    };
    
// 生成验证码
getCode=function(req, res) {
  // 下面这行代码是随机生成验证码图片和文本并返回给客户端 
   const img = svgCaptcha.create({ 
     size: 4, // 验证码长度
     width: 100, // 宽
     height: 38, // 高
     ignoreChars: '0o1i', // 验证码字符中排除 0o1i
     color: true, // 验证码是否有彩色
     noise: 1, //干扰线
     background: '#666' // 背景颜色
   })
   console.log(img.text);
   res.send(img);
 }

module.exports = {
  register,
  login,
  selectUser,
  updateUser,
  updateUserImg ,
  updateToken,
  updateUserPassword,
  leaveMessage,
  getCode
}