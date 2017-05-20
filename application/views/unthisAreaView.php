<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>非崇左地区未结案件信息</title>
  <script src="<?=base_url()?>js/jquery-1.12.0.min.js"></script>
  <link rel="stylesheet" href="<?=base_url()?>js/pintuer/pintuer.css">
  <link rel="stylesheet" href="<?=base_url()?>css/indexStyle.css">
  <script src="<?=base_url()?>js/weburl.js"></script>
  <script src="<?=base_url()?>js/pintuer/pintuer.js"></script>
  <script src="<?=base_url()?>js/getDataGraph.js"></script>
  <style>
    .cz-nav {
      margin-top: 10px;
      padding: 0;
    }
    
    .cz-nav li {
      display: inline-block;
    }
    
    .data_list table {
      width: 100%;
      margin-top: 14px;
    }
  </style>
  <script>
    getunthis_area_data();
  </script>
</head>

<body>
  <div class="header">
    <span class="title"></span>
    <!--用户登录-->
    <div class="user-box" style="display:inline-block;">
      <div>欢迎：<span class="user-name">...</span></div>
      <div class="logout">退出</div>
    </div>
    <!--导航-->
    <div class="manager-entrance">
      <ul>
        <li class="header-nav"><a href="<?=base_url()?>index.php/welcome/personManage">人员管理</a> </li>
        <li class="nav-fgx"></li>
        <li class="header-nav"><a href="<?=base_url()?>index.php/welcome/addNDelData">案件数据管理</a></li>
      </ul>
    </div>
  </div>
  <div class="cz-container" style="margin-top:20px;background: rgba(255, 255, 255, 0.7);
border-radius: 5px;">
    <ul class="cz-nav">
      <a href="<?=base_url()?>">
        <li>首页</li>
      </a>
      <li> > </li>
      <li class="cur-nav">非崇左市地区未结案件数据</li>
    </ul>
    <div class="data_list">
      <table class="table table-hover">
        <thead>
          <tr>
            <td style="background-color:#3BAAF0;text-align: center; color: #fff;" colspan="7">非崇左市地区未结案件数据</td>
          </tr>
        </thead>
        <tbody id="unthis_area_data">
          <tr>
            <td>序号</td>
            <td>地点</td>
            <td>法院名称</td>
            <td>执行案号</td>
            <td>被执行人</td>
            <td>标的</td>
            <td>备注</td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>

  <script>
    $(function() {
      var datalist = $('#unthis_area_data');
      for (var i = 0; i < unthis_area_data.length; i++) {
        datalist.append("<tr><td>" +
          (i + 1) + "</td><td>" +
          unthis_area_data[i].ADDRESS + "</td><td>" +
          unthis_area_data[i].COURT_NAME + "</td><td>" +
          unthis_area_data[i].DO_AH + "</td><td>" +
          unthis_area_data[i].BZXR_NAME + "</td><td>" +
          unthis_area_data[i].BD + "万元" + "</td><td>" +
          unthis_area_data[i].NOTE + "</td></tr>");
      }
      // console.log()
    });
  </script>
</body>

</html>