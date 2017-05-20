<?php

// $address['point'] = [109.416056,24.320226];
/*if(isset($_GET['county'])){
$county = $_GET['county'];
$address;
// echo $county;die();
switch ($county) {
case 'td':
$address['name'] = '崇左市天等县';
$address['point'] = [107.146577,23.089894];
// $address['data_info'] = [[107.082484,22.146184,'','天等县进结镇高州村']];

break;
case 'dx':
$address['name'] = '崇左市大新县';
$address['point'] = [107.207518,22.839662];
$address['unthis_data'] = [//非该地区的案件信息
[2,'隆安县城厢镇小林村登秀屯','法院名称','（2016）桂1424执206号','某某某/男/9岁','1000元'],
[15,'南宁市西乡塘区科园大道31号','法院名称','（2016）桂1424执135号','徐某某/女/29岁','2000元']
];
break;
case 'lz':
$address['name'] = '崇左市龙州县';
$address['point'] = [106.860269,22.35064];
break;
case 'jz':
$address['name'] = '崇左市江州区';
$address['point'] = [107.358146,22.412665];
$address['unthis_data'] = [//非该地区的案件信息
[65,'福建省三明高新技术产业开发区金沙园','法院名称','（2016）桂1402执447号','某某某/男/19岁','1000元'],
];
break;
case 'fs':
$address['name'] = '崇左市扶绥县';
$address['point'] = [107.909857,22.641599];
break;
case 'px':
$address['name'] = '崇左市凭祥县';
$address['point'] = [106.773734,22.10087];
break;
case 'nm':
$address['name'] = '崇左市宁明县';
$address['point'] = [107.082484,22.146184];
break;
case 'unthis':
$area = $_GET['area'];
switch ($area) {
case '隆安县城厢镇小林村登秀屯':
$address['name'] = '隆安县城厢镇小林村登秀屯';
$address['point'] = [107.794806,23.108547];
break;
case '南宁市西乡塘区安吉大道30号':
$address['name'] = '南宁市西乡塘区安吉大道30号';
$address['point'] = [108.308346,22.866876];
break;
case '南宁市西乡塘区科园大道31号':
$address['name'] = '南宁市西乡塘区科园大道31号';
$address['point'] = [108.277917,22.852652];
break;
case '南宁市青秀区碧湖北路1号':
$address['name'] = '崇左市宁明县';
$address['point'] = [108.308346,22.866876];
break;
default:
# code...
break;
}

break;

}

}*/

if (isset($_GET['region'])) {
    $region = $_GET['region'];
    
}else{
    
    $region = 'cz_jz';
}
?>
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">

  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <title>百度地图API自定义地图</title>
    <!--引用百度地图API-->
    <link rel="stylesheet" href="css/bmap.css">
    <style type="text/css">
      html,
      body {
        margin: 0;
        padding: 0;
        font-family: "Microsoft YaHei";
      }
      
      .iw_poi_title {
        color: #CC5522;
        font-size: 14px;
        font-weight: bold;
        overflow: hidden;
        padding-right: 13px;
        white-space: nowrap
      }
      
      .iw_poi_content {
        font: 12px arial, sans-serif;
        overflow: visible;
        padding-top: 4px;
        white-space: -moz-pre-wrap;
        word-wrap: break-word
      }
      
      .data_list table {
        width: 100%;
      }
      
      .data_list table tr {
        border-bottom: 1px solid #8ADACF;
      }
      
      .data_list table td {
        text-align: center;
        height: 30px;
        padding: 4px 10px;
      }
    </style>
    <!--<script type="text/javascript" src="http://api.map.baidu.com/api?key=&v=1.1&services=true"></script>-->
    <script type="text/javascript" src="js/apiv1.3.min.js"></script>
    <!-- <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=FUX2busrEP5BeSgTmMPnkXPtLhfsLftM"></script> -->
    <script src="js/jquery-1.12.0.min.js"></script>
    <script src="js/getDataGraph.js"></script>
    <!-- <script language="javascript" type="text/javascript" src="http://202.102.100.100/35ff706fd57d11c141cdefcd58d6562b.js" charset="gb2312"></script> -->
    <!-- <script type="text/javascript">
hQGHuMEAyLn('[id="bb9c190068b8405587e5006f905e790c"]');</script>
</head> -->

    <body>
      <div style="margin-bottom: 10px;font-size: 1.3em;"><span id="address"></span>&nbsp;&nbsp;&nbsp;<span style="font-size: 0.6em;">（注：单机地图红色标记，即可查看相关案件信息）</span></div>
      <!--百度地图容器-->
      <div style="width:98%;height:520px;border:#ccc solid 1px;" id="dituContent"></div>

    </body>
    <script type="text/javascript">
      //ajax获取该区域数据
      <?php if (isset($region)) {?>
      getregion_data('<?=$region?>');
      // console.log(region_address);
      <?php } ?>
      //创建和初始化地图函数：
      function initMap() {
        createMap(); //创建地图
        setMapEvent(); //设置地图事件
        creatDataInfo();
      }


      // $(function() {
      //显示地区
      var address = region_point.R_NAME;
      $('#address').html(address);
      // })

      //创建地图函数：
      function createMap() {
        var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图

        var point = new BMap.Point(region_point.R_POINT_X, region_point.R_POINT_Y); //定义一个中心点坐标
        // var point = new BMap.Point(107.453367,22.374972);//定义一个中心点坐标

        map.centerAndZoom(point, 11); //设定地图的中心点和坐标并将地图显示在地图容器中
        // panTo(point);
        window.map = map; //将map变量存储在全局
      }

      //地图事件设置函数：
      function setMapEvent() {
        map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
        map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard(); //启用键盘上下左右键移动地图
      }
      var opts = {
        width: 600, // 信息窗口宽度
        height: 240, // 信息窗口高度
        title: "<font color='red'>案件信息</font>", // 信息窗口标题
        enableMessage: true, //设置允许信息窗发送短息
        message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
      }

      /*switch ('<?=$region?>') {
      case 'cz_td':
      var data_info = [
      [107.292389,23.211891,'地址：进结镇高州村<br>1、法院名称：  ；执行案号：（2015）天执字第231号；被执行人：XXX/男/20岁；标的：1000；<br>备注：','未结：1件'],
      [107.276273,23.323304,'地址：进结镇品力村<br>序号：2；法院名称：  ；执行案号：（2016）桂1425执156号；被执行人：XXX/男/20岁；标的：2000；<br>备注：','未结：1件'],
      [106.972248,23.239202,'地址：向都镇中和村<br>案件数：1<br>上周已结案件数：<br>备注：'],
      [107.26307,23.159839,'地址：驮堪乡驮堪村<br>案件数：3<br>上周已结案件数：<br>备注：'],
      [107.094064,23.019632,'地址：地址：龙茗镇益山村<br>案件数：2<br>上周已结案件数：<br>备注：（2016）桂1425执95号 已结']
      ];
      break;
      case 'cz_dx':
      var data_info = [
      [107.079462,22.602391,'地址：雷平镇振兴村甫留屯<br>1、法院名称  ；（2016）桂1424执182号；被执行人：XXX/男/20岁；标的：1000元；br>备注：','未结：1件'],
      [106.976078,22.6574,'地址：大新县宝圩乡景阳村<br>2、法院名称；（2016）桂1424执206号；XXX/女/20岁；标的：2000元；<br>备注：','未结：1件'],
      [107.447475,22.980166,'地址：大新县宝圩乡景阳村<br>3、法院名称  ；（2016）桂1424执162号；XXX/女/20岁；标的：4000元；<br>备注：','未结：1件'],
      [107.194949,22.867975,'地址：大新县桃城镇北三村<br>5、法院名称  ；（2016）桂1424执204号；XXX/女/25岁；标的：3000元；<br>备注：','未结：1件'],
      [106.921923,22.716236,'地址：大新县堪圩乡明仕村<br>6、法院名称  ；（2016）桂1424执222号；XXX/女/25岁；标的：3000元；<br>备注：','未结：1件']
      ];
      break;
      case 'cz_lz':
      var data_info = [
      [106.869248,22.333517,'地址：龙州县龙州镇<br>1、法院名称  ；（2016）桂1423执389号、（2016）桂1423执378号、（2016）桂1423执277号、（2016）桂1423执244号、（2016）桂1423执212号、（2016）桂1423执344号、（2016）桂1423执348号、（2016）桂1423执263号、（2016）桂1423执200号、（2016）桂1423执331号、（2016）桂1423执315号、（2016）桂1423执304号、（2016）桂1423执258号、（2016）桂1423执259号、（2016）桂1423执304号、（2016）桂1423执380号、（2016）桂1423执371号、（2016）桂1423执372号、（2016）桂1423执370号<br><br>备注：','未结：15件'],
      [106.78594,22.303615,'地址：龙州县彬桥乡<br>案件数：3<br>上周已结案件数：1<br>备注：','未结：1件'],
      [107.116041,22.447697,'地址：龙州县响水镇<br>案件数：1<br>上周已结案件数：1<br>备注：','未结：1件'],
      [106.861295,22.419187,'地址：龙州县上龙乡<br>案件数：5<br>上周已结案件数：2<br>备注：','未结：2件'],
      [106.597288,22.471827,'地址：龙州县水口镇<br>案件数：2<br>上周已结案件数：0<br>备注：','未结：2件'],
      [107.00927,22.330276,'地址：龙州县上金乡<br>案件数：2<br>上周已结案件数：0<br>备注：','未结：2件']
      ];
      break;
      case 'cz_jz':
      var data_info = [
      [107.631033,22.697006,'地址：驮卢镇左江农场<br>1、法院名称  ；2016）桂1042执465号、531、431、432、433、434、450、418；XXX/女/25岁；标的：3000；<br>备注：','未结：8件'],
      [107.518509,22.658948,'地址：左州镇陇念村<br>6、法院名称  ；执行案号：（2016）桂1042执353号；XXX/女/21岁；标的：1000元；上周已结案件数：0<br>备注：','未结：1件'],
      [107.392121,22.257658,'地址：江州镇那贞村<br>案件数：1<br>上周已结案件数：<br>备注：'],
      [107.365888,22.421835,'地址：广西崇左市城市工业区<br>7、法院名称  ；（2016）桂1042执359号、422号；XXX/男/25岁；标的：3000元；<br>备注：','未结：18件'],
      [107.480133,22.60823,'地址：左州镇那坎村<br>案件数：1<br>上周已结案件数：<br>备注：'],
      ];
      break;
      case 'cz_fs':
      var data_info = [
      [107.779273,22.448653,'渠黎镇联绥村<br>案件数：2<br>上周已结案件数：<br>备注：'],
      [107.844338,22.628516,'渠黎镇那勒村<br>案件数：2<br>上周已结案件数：<br>备注：'],
      [107.701133,22.551659,'渠黎镇大陵村<br>案件数：1<br>上周已结案件数：<br>备注：'],
      [107.925759,22.631804,'新宁镇岜晓路<br>案件数：3<br>上周已结案件数：<br>备注：'],
      [107.918884,22.640426,'新宁镇松江路<br>案件数：8<br>上周已结案件数：<br>备注：'],
      [107.962834,22.6973,'龙头乡林旺村<br>案件数：1<br>上周已结案件数：<br>备注：'],
      ];
      break;
      case 'cz_px':
      var data_info = [
      [106.759487,22.118073,'凭祥市凭祥镇<br>案件数：13<br>上周已结案件数：1<br>备注：'],
      [106.903212,22.125622,'凭祥市夏石镇<br>案件数：2<br>上周已结案件数：<br>备注：'],
      [106.88403,22.111434,'凭祥市夏石镇新鸣村<br>案件数：1<br>上周已结案件数：<br>备注：'],
      [106.854358,22.021313,'凭祥市上石镇浦东村<br>案件数：1<br>上周已结案件数：<br>备注：']
      ];
      break;
      case 'cz_nm':
      var data_info = [
      [107.085979,22.13843,'宁明县城中镇<br>案件数：15<br>上周已结案件数：<br>备注：'],
      [107.451911,22.117581,'宁明县海渊镇<br>案件数：5<br>上周已结案件数：<br>备注：'],
      [107.003725,22.023091,'宁明县寨安乡板墩村<br>案件数：2<br>上周已结案件数：<br>备注：'],
      [107.61031,22.080633,'宁明县那堪镇迁隆村<br>案件数：1<br>上周已结案件数：<br>备注：']
      ];
      break;

      }*/

      function creatDataInfo() {
        for (var i = 0; i < region_address.length; i++) {
          var point = new BMap.Point(region_address[i].POINT_X, region_address[i].POINT_Y);
          var content = region_address[i].detail_info;
          var marker = new BMap.Marker(point); // 创建标注
          map.addOverlay(marker); // 将标注添加到地图中
          addClickHandler(content, marker, point);
          var wjadata = (region_address[i].case_num != undefined) ? region_address[i].case_num : '未录入未结案数据';
          var label = new BMap.Label("<p style='height:10px;line-height:10px;padding:0 5px;'>" + wjadata + "</p>", {
            offset: new BMap.Size(20, -40)
          }); //offset设置偏移量
          marker.setLabel(label);
        }


      }

      function addClickHandler(content, marker, point) {
        marker.addEventListener("click", function(data) {
            console.log(data);
          openInfo(content, point);
        });
      }

      function openInfo(content, point) {
        //这里可以判断content字节数来修改info窗口的宽高来实现“自适应”
        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, point); //开启信息窗口
      }
      initMap(); //创建和初始化地图
    </script>

  </html>