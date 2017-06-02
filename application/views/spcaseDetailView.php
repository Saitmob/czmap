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
    
  </div>
<div class="o-m">
  <div class="ul-o blue_bg">
    <!--<ul class="fl_l">
      <li><span></span><p>原审信息</p><div class="clear"></div><b></b></li>
      <li><span></span><p>基础信息</p><div class="clear"></div><b></b></li>

      <div class="li-mask"><p class="fl_lp">原审信息</p></div>
    </ul>-->
  </div>
  <ul class="fl_r" style="margin:0 auto;" casetype="<?=$casetype?>">
    <li class="jcxx">
        <div>
            <blockquote class="quote border-anblue blue_bg">
                <strong>基础信息</strong> 
                    <div class="two-line"> <p class="text-center text-big l">案号：<?=$ajjbxx['AH']?></p> </td><td> <p class="text-center text-big r">案件类型：<?=$ajjbxx['AJLX']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">案件来源：<?=$ajjbxx['ajlyxmc']?></p> </td><td> <p class="text-center text-big r">收到诉状日期：<?=$ajjbxx['SDSZRQ']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">案由：<?=$ajjbxx['ZZMMC']?></p> </td><td> <p class="text-center text-big r">立案部门：<?=$ajjbxx['LABM']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">收案登记人：<?=$ajjbxx['SADJRMC']?></p> </td><td> <p class="text-center text-big r">审批人：<?=$ajjbxx['SPRMC']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">立案审批日期：<?=$ajjbxx['LASPRQ']?></p> </td><td> <p class="text-center text-big r">立案日期：<?=$ajjbxx['LARQ']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">承办审判庭：<?=$ajjbxx['CBSPT']?></p> </td><td> <p class="text-center text-big r">承办人：<?=$ajjbxx['cbrmc']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">审限起始日期：<?=$ajjbxx['SXQSRQ']?></p> </td><td> <p class="text-center text-big r">审限届满日期：<?=$ajjbxx['SXJMRQ']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">案件进展阶段：<?=$ajjbxx['AJJZJDMC']?></p> </td><td> <p class="text-center text-big r"></p> </div>
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