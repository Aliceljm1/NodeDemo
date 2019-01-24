/**
 * 提供最基础的接口功能，方便端开发者快速测试接口，需要使用npm install express --save来安装组件
 */

var express = require('express');
var app = express();
var fs = require("fs");

app.get('/', function (req, res) {
    res.send('Hello World');
});


//自动登陆，是以哦那个301重定向，
app.get("/autologin", function (req, res)  {

    res.writeHead(301, { 'Location': 'http://localhost:8081/login?username=ljm&pwd=111111' });
    console.log(res._header);
    res.end();

});

//访问url,http://localhost:8081/login?username=ljm&pwd=111111
app.get('/login', function (req, res) {
    var resjson = '';
    if (req.query.username == "ljm" && req.query.pwd == "111111") {
        resjson = '{"code":1,"uid":"4na7ah2jq75kwp5yyd9izg","username":"刘泾铭","account":"ljm","status":true,"errorNum":1,"siteurl":"http://www.yixuexiao.cn:85","schoolid":"y5hjacyjoilgmnbjfwaffa","userType":0,"stype":"1,3","bankname":"高中数学"}';
    }
    else {
        resjson = '{"code":-1,"msg":"用户名密码错误"}';
    }
	res.header("Content-Type", "application/json; charset=utf-8");
    res.end(resjson);
});


/**
 * 支持直接返回json文件作为响应结果
 * */
app.get('/doclist', function (req, res) {
    returnJson(req, res);
});

app.get('/userinfo', function (req, res) {
    returnJson(req, res);
});

var returnJson = function (req, res) {
    var filename = req.path.substr(1, req.path.length) + ".json";
    console.log("try to get filename:" + filename);
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.end("{code:-1,msg:'json不存在'}");
        }
        else {
            res.end(data);
        }
    });
};

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

//server.on("request", function (req, res) {//尝试在此处统一添加编码约定
//    //请求的end事件结束之后
//    req.on("end", function () {
//        	res.header("Content-Type", "application/json; charset=utf-8");
//    });
//});

