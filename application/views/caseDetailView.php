<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>审判案件详情</title>
  <link rel="stylesheet" href="<?=base_url()?>js/pintuer/pintuer.css">
  <link rel="stylesheet" href="<?=base_url()?>css/indexStyle.css">
  <link href="<?=base_url()?>css/index_tabs.css" rel="stylesheet" type="text/css">
  <link href="<?=base_url()?>css/casedetail.css" rel="stylesheet" type="text/css">
  <script src="<?=base_url()?>js/jquery-1.12.0.min.js"></script>
  <script src="<?=base_url()?>js/weburl.js"></script>
  <script src="<?=base_url()?>js/casedetail.js"></script>
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
        <!--<li class="header-nav"><a href="<?=base_url()?>index.php/pointManage/">坐标管理</a></li>-->
      </ul>
    </div>
  </div>
<div class="o-m">
  <div class="ul-o blue_bg">
    <ul class="fl_l">
      <li><span></span><p>原审信息</p><div class="clear"></div><b></b></li>
      <li><span></span><p>基础信息</p><div class="clear"></div><b></b></li>
<!--       <li><span></span><p>销售网络快速扩张</p><div class="clear"></div><b></b></li>
<li><span></span><p>实时互动沟通转化率高</p><div class="clear"></div><b></b></li> -->

      <div class="li-mask"><p class="fl_lp">原审信息</p></div>
    </ul>
  </div>
  <ul class="fl_r">
    <li class="ysxx">
        <blockquote class="quote border-anblue blue_bg">
            <strong>原审信息</strong> 
                <div class="one-line"> <p class="text-center text-big">案号：<?=$ysxx['AH']?></p> </div> 
                <div class="one-line"> <p class="text-center text-big">案由名称：<?=$ysxx['AYMC']?></p></div>
                <div class="one-line"> <p class="text-center text-big">基本法院名称：<?=$ysxx['JBFYMC']?></p></div> 
                <div class="one-line"> <p class="text-center text-big">案件类别名称：<?=$ysxx['AJLBMC']?></p></div>
        </blockquote>
    </li>
    <li class="jcxx">
        <div>
            <blockquote class="quote border-anblue blue_bg">
                <strong>基础信息</strong> 
                    <div class="two-line"> <p class="text-center text-big l">案号：<?=$ajjbxx['AH']?></p> </td><td> <p class="text-center text-big r">收案途径：<?=$ajjbxx['SATJMC']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">案件来源：<?=$ajjbxx['AJLYMC']?></p> </td><td> <p class="text-center text-big r">收到材料日期：<?=$ajjbxx['SDCLRQ']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">申请执行标的金额：<?=$ajjbxx['SQZXBDJE']?></p> </td><td> <p class="text-center text-big r">立案案由：<?=$ajjbxx['LAAYMC']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">立案部门：<?=$ajjbxx['LABM']?></p> </td><td> <p class="text-center text-big r">收案登记人：<?=$ajjbxx['SADJRMC']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">审查人：<?=$ajjbxx['SCRMC']?></p> </td><td> <p class="text-center text-big r">审查日期：<?=$ajjbxx['SCRQ']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">审批人：<?=$ajjbxx['SPRMC']?></p> </td><td> <p class="text-center text-big r">立案审批日期：<?=$ajjbxx['LASPRQ']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">审批意见：<?=$ajjbxx['SPYJMC']?></p> </td><td> <p class="text-center text-big r">立案日期：<?=$ajjbxx['LARQ']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">接收案件日期：<?=$ajjbxx['JSRQ']?></p> </td><td> <p class="text-center text-big r">承办审判庭：<?=$ajjbxx['CBSPT']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">承办人：<?=$ajjbxx['CBRMC']?></p> </td><td> <p class="text-center text-big r">管辖依据：<?=$ajjbxx['GXYJMC']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">案件进展阶段：<?=$ajjbxx['AJJZJDMC']?></p> </td><td> <p class="text-center text-big r">自动履行金额：<?=$ajjbxx['ZDLXJE']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">实际到位金额：<?=$ajjbxx['SJDWJE']?></p> </td><td> <p class="text-center text-big r">执行期限起始日期：<?=$ajjbxx['ZXQXQSRQ']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">执行期限届满日期：<?=$ajjbxx['ZXQXJMRQ']?></p> </td><td> <p class="text-center text-big r">法定执行期限：<?=$ajjbxx['FDZXQX']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">执行超期天数：<?=$ajjbxx['ZXCQTS']?></p> </td><td> <p class="text-center text-big r">法定执行期限：<?=$ajjbxx['AH']?></p> </div>
            </blockquote>
        </div>
    </li>
<!--     <li><div>菜单3内容</div></li>
<li><div>菜单4内容</div></li> -->
  </ul>
  <div class="clear"></div>
</div>
</body>

</html>