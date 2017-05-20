<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>审判案件详情</title>
  <script src="<?=base_url()?>js/jquery-1.12.0.min.js"></script>
  <link rel="stylesheet" href="<?=base_url()?>js/pintuer/pintuer.css">
  <link rel="stylesheet" href="<?=base_url()?>css/indexStyle.css">
  <script src="<?=base_url()?>js/jquery.base64.js"></script>
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
</head>

<body>
  <div class="header">
    <span class="title"></span>
    <!--用户登录-->
    <div class="user-box" style="display:inline-block;">
      <div>欢迎：<span class="user-name">...</span></div>
      <div class="logout"><a href="<?=base_url()?>index.php/welcome/logout">退出</a></div>
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
      <li class="cur-nav">审判案件详情</li>
    </ul>
    <div class="data_list">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <td style="background-color:#3BAAF0;text-align: center; color: #fff;" colspan="8">案件详情</td>
          </tr>
        </thead>
        <tbody id="case_detail">
          <tr>
            <td> 案号 </td>
            <td> 案件主题 </td>
            <td> 案由 </td>
            <td> 书记员</td>
            <td> 承办人 </td>
            <td> 合议庭成员 </td>
            <td>人员类型/名称</td>
            <!--<td> 备注 </td>-->
          </tr>
          <?=$result?>
        </tbody>
      </table>
    </div>
  </div>
<div class="footer">
    <!-- <p>颜色越深，则案件总数越多</p>  -->
    <p>电话：0771-2478292</p>
    <!--<p>单击红色标注，即可查看该区域案件信息</p>-->
  </div>
</body>

</html>