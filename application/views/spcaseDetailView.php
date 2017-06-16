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
      <ul class="fl_l">
        <li><span></span>
          <p>基础信息</p>
          <div class="clear"></div><b></b></li>
        <li><span></span>
          <p>当事人信息</p>
          <div class="clear"></div><b></b></li>
        <!--       <li><span></span><p>销售网络快速扩张</p><div class="clear"></div><b></b></li>
<li><span></span><p>实时互动沟通转化率高</p><div class="clear"></div><b></b></li> -->

        <div class="li-mask">
          <p class="fl_lp">原审信息</p>
        </div>
      </ul>
    </div>
    <ul class="fl_r" casetype="<?=$casetype?>">
      <li class="jcxx">
        <blockquote class="quote border-anblue blue_bg">
          <strong>原审信息</strong>
                    <div class="two-line"> <p class="text-center text-big l">案号：<?=$ajjbxx['AH']?></p> </td><td> <p class="text-center text-big r">案件类型：<?=$ajjbxx['AJLX']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">案件来源：<?=$ajjbxx['ajlyxmc']?></p> </td><td> <p class="text-center text-big r">收到诉状日期：<?=$ajjbxx['SDSZRQ']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">案由：<?=$ajjbxx['ZZMMC']?></p> </td><td> <p class="text-center text-big r">立案部门：<?=$ajjbxx['LABM']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">收案登记人：<?=$ajjbxx['SADJRMC']?></p> </td><td> <p class="text-center text-big r">审批人：<?=$ajjbxx['SPRMC']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">立案审批日期：<?=$ajjbxx['LASPRQ']?></p> </td><td> <p class="text-center text-big r">立案日期：<?=$ajjbxx['LARQ']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">承办审判庭：<?=$ajjbxx['CBSPT']?></p> </td><td> <p class="text-center text-big r">承办人：<?=$ajjbxx['cbrmc']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">审限起始日期：<?=$ajjbxx['SXQSRQ']?></p> </td><td> <p class="text-center text-big r">审限届满日期：<?=$ajjbxx['SXJMRQ']?></p> </div>
                    <div class="two-line"> <p class="text-center text-big l">案件进展阶段：<?=$ajjbxx['AJJZJDMC']?></p> </td><td> <p class="text-center text-big r"></p> </div>
        </blockquote>
      </li>
      <li style="width:900px;margin-left:-100px;color:#fff;">
        <blockquote class="quote border-anblue blue_bg">
          <strong>当事人信息</strong>
          <table class="table">
            <thead>
              <tr>
                <th style="min-width:40px;">姓名</th>
                <th style="min-width:40px;">性别</th>
                <th style="min-width:40px;">民族</th>
                <th style="min-width:65px;">诉讼地位</th>
                <th style="min-width:65px;">身份证号</th>
                <th style="min-width:40px;">电话</th>
                <th style="min-width:76px;">当事人类型</th>
                <th style="min-width:65px;">法人名称</th>
                <th style="min-width:85px;">法人机构代码</th>
              </tr>
            </thead>
            <tbody id="record-list-data">
              <?php if(empty($dsr)) {
              ?> 
              <tr class="list-tr">
                <td class='list-item-name' colspan='9'>该案件没有当事人</td>
               </tr>
              <?php }else {
                      foreach ($dsr as $key => $value) 
                      {
              ?>  
              <tr class="list-tr">
                <td class='list-item-name'><?=$value['xingming']?></td>
                <td class='list-item-duty'><?=$value['xingbie']?></td>
                <td class='list-item-phone'><?=$value['minzu']?></td>
                <td class='list-item-date'><?=$value['susongdiwei']?></td>
                <td class='list-item-date'><?=$value['shenfengzheng']?></td>
                <td class='list-item-date'><?=$value['shouji']?></td>
                <td class='list-item-date'><?=$value['dangshirenleixing']?></td>
                <td class='list-item-date'><?=$value['farenmingcheng']?></td>
                <td class='list-item-date'><?=$value['farenjigou']?></td>
               </tr>
              <?php                     
                      }
                   
              }?>
            </tbody>
          </table>
        </blockquote>
      </li>
      <!--     <li><div>菜单3内容</div></li>
<li><div>菜单4内容</div></li> -->
    </ul>
    <div class="clear"></div>
  </div>
</body>

</html>