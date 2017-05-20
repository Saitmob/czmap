<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>czmap</title>
  <!--<link rel="stylesheet" href="<?=base_url()?>css/jquery-jvectormap-2.0.3.css">-->
  <link rel="stylesheet" href="<?=base_url()?>js/pintuer/pintuer.css">
  <link rel="stylesheet" href="<?=base_url()?>css/Button/css/buttons.css">
  <link rel="stylesheet" href="<?=base_url()?>css/indexStyle.css">
  <link rel="stylesheet" href="<?=base_url()?>css/index.css">
  <link rel="stylesheet" href="<?=base_url()?>css/bmap.css">
  <link rel="stylesheet" href="<?=base_url()?>css/index_tabs.css">
  <!--<link rel="stylesheet" href="<?=base_url()?>css/baidu_map_v2.css">-->
  <script src="<?=base_url()?>js/jquery-1.12.0.min.js"></script>
  <script src="<?=base_url()?>js/jquery.base64.js"></script>
  <script src="<?=base_url()?>js/layer/layer.js"></script>
  <script src="<?=base_url()?>js/laypage/laypage.js"></script>
  <!-- <script src="js/jquery-jvectormap-2.0.3.min.js"></script>
<script src="js/jquery-jvectormap-gx-cz.js"></script> -->
  <script src="<?=base_url()?>js/raphael.js"></script>
  <script src="<?=base_url()?>js/weburl.js"></script>
  <script src="<?=base_url()?>js/getDataGraph.js"></script>
  <script src="<?=base_url()?>js/czmapPath.js"></script>
  <script src="<?=base_url()?>js/apiv1.3.min.js"></script>
  <!--<script src="<?=base_url()?>js/baidumapv2/baidumap_offline_v2_load.js"></script>-->
  <!--<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=FUX2busrEP5BeSgTmMPnkXPtLhfsLftM"></script>-->
  <script src="<?=base_url()?>js/subMapdata.js"></script>
  <script src="<?=base_url()?>js/common/tabs.js"></script>
  <script src="<?=base_url()?>js/index.js"></script>
  <!-- <script src="js/json2.js"></script> -->

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
  <div class="main">
    <!--崇左区域数据-->
    <div class="cz_or_unthis" data-toolbar="transport-options" data-toolbar-animation="standard">
      <h3 class="active-aj-num">崇左地区法院数：<span class="aj-num">8</span> </h3>
      <h3>法官人数：<span class="aj-num" >201</span> </h3>
      <h3>正在审理案件：<span class="aj-num"><?=$AJ_NUM?></span> </h3>
      <h3>地点数：<span class="aj-num"><?=$AJ_P_NUM?></span> </h3>

      <div style="position:absolute;width: 380px;height: 40px;background-color: rgba(0,0,0,0.4);line-height:40px;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;left: 50%;margin-left: -410px;"><span style="font-size:13px;margin-right:10px;"></span> 区/县：<span class="yj-num">7</span>&nbsp;&nbsp;乡/镇：<span class="yj-num">79</span>&nbsp;&nbsp;村/社区：<span class="yj-num">829</span> </div>
      <div style="position:absolute;width: 380px;height: 40px;background-color: rgba(0,0,0,0.4);line-height:40px;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;left: 50%;margin-left: 30px;"><span style="font-size:13px;margin-right:10px;"></span> 陪审员：<span class="yj-num">642</span>&nbsp;&nbsp;网格员：<span class="yj-num">1034</span>&nbsp;&nbsp;调解员：<span class="yj-num">780</span> </div>
    </div>
    <!--左右展示-->
    <div style="margin-top:80px;">


      <div class="left">
        <!-- 缩略地图容器 -->
        <div id="city_map" style="width: 520px;height: 620px;marin-top:-30px;">
          <!--鼠标提示-->
          <div id="map_tips">
            诉讼案件：<span id="ss-num-tips"></span>
            <br> 执行案件：
            <span id="zx-num-tips"></span>
          </div>
        </div>
        <input type="hidden" id="current_region" value="cz_jz">
        <input type="hidden" id="current_fjm" value="K60">
        <input type="hidden" id="map1_is_show" value="0">
        <input type="hidden" id="map2_is_show" value="0">
      </div>

      <!--<div class="sub_map" style="display: none;vertical-align: top;margin-top:59px; margin-left: 2%;width: 57%;backgroud:red;position:relative;">
<div style="margin-bottom: 10px;font-size: 1.3em;color:#fff;background:url()">
<div class="sub_map_head"></div><span id="address" style="padding-left:25px;"></span>&nbsp;&nbsp;&nbsp;<span style="font-size: 0.6em;">（注：单击地图红色标记，即可查看相关案件信息）</span>
<span style="font-size:14px; margin:0 10px;">乡/镇数：<span id="sub-map-title-xz" class="yj-num" style="margin-right:15px;"></span><span></span>村/社区数：
<span id="sub-map-title-cs" class="yj-num" style="margin-right:15px;"></span>
</span>
</div>
<div style="width:100%;height:520px;border:#ccc solid 1px;box-shadow:rgba(169, 167, 167,0.8) 0px 0px 15px;" id="dituContent"></div>
</div>-->
      <div class="right">
        <!--新选项卡-->
        <div class="aj_n_map">
          <ul>
            <li id="aj_tab" class="aj_map_tab" onclick="show_aj_box()">案 件</li>
            <li id="map_tab" class="aj_map_tab" onclick="show_map_box()">地 图</li>
            <li class="slider"></li>
          </ul>
        </div>
        <!--内容面板-->
        <div id="aj_or_map_panel" class="blue_bg">

          <!--案件列表-->
          <div id="aj_box">
            <div id="aj_box_wraper">
              <div id="aj_box_list" style="float:left;">
                <div class="nav_head">
                  <span class="nav_head_first">案件</span> > <span class="nav_head_last"><span id="aj-box-r-name"></span>案件</span>
                  <ul class="ajs-num" style="display:inline-block;margin-left:20px;">
                    <li>
                      诉讼案件 <span class="badge bg-sub" id="aj-box-ssaj-num">0</span>
                    </li>
                    <li>
                      执行案件 <span class="badge bg-sub" id="aj-box-zxaj-num">0</span>
                    </li>
                  </ul>
                  <select class="input input-small aj-box-court-name-select" style="display:inline-block;width:140px;">
                    <option value="K60">崇左市中级人民法院</option>
                    <option value="K67">江州区人民法院</option>
                  </select>
                </div>
                <h2 class="text_center"><span id='aj-box-court-name'></span>未结案件</h2>
                <table class="cz_table cz_table_hover" style="width:100%;margin-top:10px;">
                  <thead>
                    <tr>
                      <th>
                        序号
                      </th>
                      <th>
                        案号
                      </th>
                      <th>
                        案由
                      </th>
                      <th>
                        标的
                      </th>
                      <th>
                        立案状态
                      </th>
                      <th>
                        立案日期
                      </th>
                      <th style="width:14%;">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody id="index-case-list">

                  </tbody>
                </table>
                <!--分页-->
                <div id="aj_list_page" style="height:30px;width:100%;text-align:center;margin-top:20px;"></div>
              </div>
              <!--地图-->
              <div id="aj_box_map" style="float:left;margin-left:20px;position:relative;">
                <div id="dituContent2" style="width:100%;height:77%;"></div>
                <button class="button button--tamaya button--border-thick" data-text="返回" onclick="show_ajList()" class="button button-small bg-sub" style="position:absolute;left:18px;top:38px;"><span>返回</span></button>
                <!--图标说明-->
                <div style="zoom: 0.6;position:absolute;top:0;background: burlywood;;width: 100%;">
                  <ul class="inline-list map-bottom-list">
                    <li>
                      <img src="images/yg_bz_b.png" alt="">原告 <span class="badge bg-sub" id="aj-box-yg-num">0</span>
                    </li>
                    <li>
                      <img src="images/bg_bz_b.png" alt="">被告 <span class="badge bg-sub" id="aj-box-bg-num">0</span>
                    </li>
                    <li>
                      <img src="images/cc_bz_n.png" alt="">财产 <span class="badge bg-sub" id="aj-box-cc-num">0</span>
                    </li>
                    <li>
                      <img src="images/ssr_bz_b.png" alt="">诉讼人 <span class="badge bg-sub" id="aj-box-ssr-num">0</span>
                    </li>
                    <li>
                      <img src="images/bssr_bz_b.png" alt="">被诉讼人 <span class="badge bg-sub" id="aj-box-bssr-num">0</span>
                    </li>
                    <li>
                      <img src="images/dsr_bz_b.png" alt="">第三人 <span class="badge bg-sub" id="aj-box-dsr-num">0</span>
                    </li>
                    <li>
                      <img src="images/sqzxr_bz_b.png" alt="">申请执行人 <span class="badge bg-sub" id="aj-box-sqzxr-num">0</span>
                    </li>
                    <li>
                      <img src="images/bzxr_bz_b.png" alt="">被执行人 <span class="badge bg-sub" id="aj-box-bzxr-num">0</span>
                    </li>
                  </ul>
                </div>
                <!--底部数据展示及说明-->
                <div class="map-bottom">
                  <ul style="display:inline-block;width:48%;vertical-align:top;">
                    <li>
                      原告：
                      <ul class="inline-list map-bottom-list add-name" id="one-aj-yg-list">
                      </ul>
                    </li>
                    <li>
                      被告：
                      <ul class="inline-list map-bottom-list add-name" id="one-aj-bg-list">
                      </ul>
                    </li>
                    <li>
                      财产地址：
                      <ul class="inline-list map-bottom-list add-name" id="one-aj-cc-list">
                      </ul>
                    </li>
                    <li>
                      第三人：
                      <ul class="inline-list map-bottom-list add-name" id="one-aj-dsr-list">
                      </ul>
                    </li>
                  </ul>
                  <ul style="display:inline-block;width:48%;vertical-align:top;">
                    <li>
                      上诉人：
                      <ul class="inline-list map-bottom-list add-name" id="one-aj-ssr-list">
                      </ul>
                    </li>
                    <li>
                      被上诉人：
                      <ul class="inline-list map-bottom-list add-name" id="one-aj-bssr-list">
                      </ul>
                    </li>
                    <li>
                      申请执行人：
                      <ul class="inline-list map-bottom-list add-name" id="one-aj-sqzxr-list">
                      </ul>
                    </li>
                    <li>
                      被执行人：
                      <ul class="inline-list map-bottom-list add-name" id="one-aj-bzxr-list">
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--wraper end-->
          </div>
          <!--aj_box end-->
          <!--列表单个案件详情弹出层-->
          <div id="case_detail_panel" class="blue_bg">
            <ul>
              <li>地点数：&nbsp;&nbsp;&nbsp;&nbsp;当事人<span id="case_panel_dsr_num"></span>财产<span id="case_panel_cc_num"></span>总数<span id="case_panel_add_num"></span> </li>
              <li>案号：<span id="case_panel_ah"></span> </li>
              <li>案由：<span id="case_panel_ay"></span> </li>
              <li>法院名称：<span id="case_panel_court"></span> </li>
              <li>立案日期：<span id="case_panel_larq"></span> </li>
              <li>标的：<span id="case_panel_bdje"></span> </li>
              <li>合议庭成员：<span id="case_panel_hytcy"></span> </li>
            </ul>
          </div>
          <!--map_box-->
          <div id="map_box" style="display:none;height:100%;position:relative;">
            <!--百度地图容器-->
            <div style="width:100%;height:77%;border:#ccc solid 1px;" id="dituContent1"></div>
            <!--图标说明-->
            <div style="zoom: 0.6;position:absolute;top:0;background: burlywood;;width: 100%;">

              <ul class="inline-list map-bottom-list">
                <li>
                  <img src="images/yg_bz_b.png" alt="">原告 <span class="badge bg-sub" id="map-box-yg-num">0</span>
                </li>
                <li>
                  <img src="images/bg_bz_b.png" alt="">被告 <span class="badge bg-sub" id="map-box-bg-num">0</span>
                </li>
                <li>
                  <img src="images/cc_bz_n.png" alt="">财产 <span class="badge bg-sub" id="map-box-cc-num">0</span>
                </li>
                <li>
                  <img src="images/ssr_bz_b.png" alt="">诉讼人 <span class="badge bg-sub" id="map-box-ssr-num">0</span>
                </li>
                <li>
                  <img src="images/bssr_bz_b.png" alt="">被诉讼人 <span class="badge bg-sub" id="map-box-bssr-num">0</span>
                </li>
                <li>
                  <img src="images/dsr_bz_b.png" alt="">第三人 <span class="badge bg-sub" id="map-box-dsr-num">0</span>
                </li>
                <li>
                  <img src="images/sqzxr_bz_b.png" alt="">申请执行人 <span class="badge bg-sub" id="map-box-sqzxr-num">0</span>
                </li>
                <li>
                  <img src="images/bzxr_bz_b.png" alt="">被执行人 <span class="badge bg-sub" id="map-box-bzxr-num">0</span>
                </li>
              </ul>
            </div>
            <!--底部数据展示及说明-->
            <div class="map-bottom">

              <span id="map-box-court-name">江州区</span>：
              <select class="input input-small aj-box-court-name-select" style="display:inline-block;width:140px;">
                <option value="K60">崇左市中级人民法院</option>
                <option value="K67">江州区人民法院</option>
                <!--<option value="K69">天等县人民法院</option>
<option value="K68">大新县人民法院</option>
<option value="K6B">龙州县人民法院</option>
<option value="K61">凭祥市人民法院</option>
<option value="K6C">扶绥县人民法院</option>
<option value="K6A">宁明县人民法院</option>-->
              </select>
              <ul class="ajs-num" style="display:inline-block;padding-left:0;">
                <li>
                  诉讼案件 <span class="badge bg-sub" id="mapbox-spaj-num">0</span>
                </li>
                <li>
                  执行案件 <span class="badge bg-sub" id="mapbox-zxaj-num">0</span>
                </li>
                <li>
                  诉讼案件地点数 <span class="badge bg-sub" id="mapbox-sppoint-num">0</span>
                </li>
                <li>
                  执行案件地点数 <span class="badge bg-sub" id="mapbox-zxpoint-num">0</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--aj_or_map end-->
      </div>

    </div>
  </div>
</body>

</html>