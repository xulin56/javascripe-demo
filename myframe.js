/**
 * 作者：何旭林
 * 开发日期：2016年10月20日
 * 描述：通用框架
 * 版权所有 违者必究
 */

//定义一个对象 - 名字是$
var $$ = function() {};
//第二种写法
$$.prototype = {
    $id:function(id){
        return document.getElementById(id)
    },
    $load:function(obj){
        if(typeof obj == "Function"){
            return window.onload = obj;
        }else{
            return ;
        }
    },
    //去除左边空格
    ltrim:function(){
        return str.replace(/(^\s*)/g,'');
    },
    //去除右边空格
    rtrim:function(){
        return str.replace(/(\s*$)/g,'');
    },
    //去除空格
    trim:function(){
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //ajax - 前面我们学习的
    myAjax:function(URL,fn){
        var xhr = createXHR();	//返回了一个对象，这个对象IE6兼容。
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    fn(xhr.responseText);
                }else{
                    alert("错误的文件！");
                }
            }
        };
        xhr.open("get",URL,true);
        xhr.send();

        //闭包形式，因为这个函数只服务于ajax函数，所以放在里面
        function createXHR() {
            //本函数来自于《JavaScript高级程序设计 第3版》第21章
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp"
                        ],
                        i, len;

                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (ex) {
                            //skip
                        }
                    }
                }

                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }
    },
    //tab
    tab:function(id) {
        //如何获取某个父元素下面的子元素
        var box = document.getElementById(id);
        var spans = box.getElementsByTagName('span');
        var lis = box.getElementsByTagName('li');


        //两步走
        //第一步: 先把上半部分实现
        //群体绑定事件  -- 对所有的span绑定事件
        //群体绑定事件
        for(var i=0;i<spans.length;i++) {
            //相亲法则  -- 给男一号一个代号  --  怎么给 -- 自定义属性
            spans[i].index=i;
            spans[i].onmouseover = function() {
                //排他思想 --  将所有的span置为默认状态  --- 然后再将当前鼠标移上的span置为class -- select
                for(var i=0;i<spans.length;i++) {
                    spans[i].className='';
                    lis[i].className='';
                }
                this.className='select';
                lis[this.index].className='select';
            }
        }

},
    //简单的数据绑定formateString
    formateString:function(str, data){
        return str.replace(/@\((\w+)\)/g, function(match, key){
        return typeof data[key] === "undefined" ? '' : data[key]});
    },
    //arttemplate语法
    //封装成一个函数
    BindTemplate:function (data, divid, Template) {
        //alert(divid);
        //alert(Template);
        var html = template(Template, data);
        document.getElementById(divid).innerHTML = html;
    },
    artTemplate:function (id,html,data){
        var render = template.compile(html);
        var str = render(data)
        document.getElementById(id).innerHTML = str;
    },
    //extend(json1,json2)的用处：将一个json对象所有属性拷贝给另外一个对象
    // json1:原始对象
    // json2:目标对象
    extend : function(target , source){
        for(var i in source){
            target[i] = source[i];
        }
        return target;
    },
    //同时拷贝多个
    extends : function(){
        var key ,
            i = 0 ,
            len = arguments.length ,
            target = null , 
            copy;
        if(len === 0){
            return ;
        }else if(len == 1){
                target = this;
        }else{
            i++;
            target = arguments[0];
        }
        for(;i<len;i++){
            for(key in arguments[i]){
                copy = arguments[i][key];
                target[key] = copy;
            }
        }
        return target;
    },
    //获取某个范围内的随记数
    getRandom : function(begin,end){
            return Math.floor(Math.random()*(end-begin))+begin;
        },
    //接受页面传参的参数值
    getParameter ： function(){
        var params= window.location.search;//params:?id,date
        //console.log(params);
        //console.log(params.substring(1))
        var arr = params.substring(1).split(",");
        var id = arr[0];
        //console.log(id)
    },
    querystring : function(){
        //获取URL查询字符串参数值的通用函数
        var str = window.location.search.substring(1);//获取查询字符串，即"id=1&name=location"的部分
        var arr = str.split("&");//以&符号为界把查询字符串分割成数组
        var json = {};//定义一个临时对象
        for(var i=0;i<arr.length;i++)//遍历数组
        {
            var c = arr[i].indexOf("=");//获取每个参数中的等号小标的位置
            if(c==-1) continue;//如果没有发现测跳到下一次循环继续操作
            var d = arr[i].substring(0,c);//截取等号前的参数名称，这里分别是id和name
            var e = arr[i].substring(c+1);//截取等号后的参数值
            json[d] = e;//以名/值对的形式存储在对象中
        }
        return json;//返回对象
    
    },
    //加法计算器
    add : function(){
        var num = 0;
        for(var i=0;i<arguments.length;i++){
            num += arguments[i];
        }
        return num;
    },
    //乘法计算器
    multiplication : function(){
        var num = 1;
        for(var i=0;i<arguments.length;i++){
            num *= arguments[i];
        }
        return num;
    },
    //获取数组中的最大值
    getMax : function(arr){
        return Math.max.apply(null,arr);
        //return Math.max.call(null,1,2,3,4,5,7)
    },
    //获取数组中最小值
    getMin : function(arr){
        return Math.min.apply(null,arr);
    },
    
    //用callee来实现从0一直加到n
    summation : function(n){
        if(n>0){
            return n + arguments.callee(n-1);
        }else{
            return 0;
        }
    }
    // summation : function(){
    //     if(n>0){
    //         return n + summation(n-1);
    //     }else{
    //         return 0;
    //     }
    // } 
}
//在框架中实例化，这样外面使用的使用就不用实例化了
$$ = new $$();

