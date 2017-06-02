<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>案件信息录入</title>
  <link rel="stylesheet" href="<?=base_url()?>js/pintuer/pintuer.css">
  <link rel="stylesheet" href="<?=base_url()?>css/indexStyle.css">
  <link rel="stylesheet" href="<?=base_url()?>js/layer/skin/layer.css">
  <link rel="stylesheet" href="<?=base_url()?>js/ztree/zTreeStyle/zTreeStyle.css">
  <link rel="stylesheet" href="<?=base_url()?>css/bmap.css">
  <script src="<?=base_url()?>js/jquery-1.12.0.min.js"></script>
  <script src="<?=base_url()?>js/jquery.base64.js"></script>
  <script src="<?=base_url()?>js/weburl.js"></script>
  <script src="<?=base_url()?>js/pintuer/pintuer.js"></script>
  <script src="<?=base_url()?>js/apiv1.3.min.js"></script>
  <script src="<?=base_url()?>js/layer/layer.js"></script>
  <script src="<?=base_url()?>js/laypage/laypage.js"></script>
  <script src="<?=base_url()?>js/laydate.js"></script>
  <script src="<?=base_url()?>js/ztree/jquery.ztree.core.min.js"></script>
  <script src="<?=base_url()?>js/common/region.js"></script>
  <script src="<?=base_url()?>js/add_or_update_data.js"></script>
  <style>
    .cz-container ul input {
      float: right;
    }
  </style>
</head>

<body>
  <div class="header">
    
  </div>
  <div class="cz-container add-del-main">
    <ul class="cz-nav">
      <a href="<?=base_url()?>">
        <li>首页</li>
      </a>
      <li> > </li>
      <li class="cur-nav">案件信息管理</li>
    </ul>
    <button class="button bg-sub button-small" style="margin:10px" onClick="show_case_list()">预览</button>
    <button class="button bg-sub button-small" onClick="show_editor_panel()" >添加</button>
    <div class="search-box">
      <input type="text" class="input input-small wide-input" style="padding-left: 5px;" placeholder="输入案号搜索">
      <input type="button" id="search-btn" value="搜索">
    </div>
    <!--编辑面板-->
    <div id="editor-panel" style="display:none;">

      <div class="top">
        <!--<input type="button" value="百度地图坐标拾取入口" id="map-point-get" onclick="window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html','','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-70)+ 'top=0;left=0;resizable=no')">-->
        <input type="button" class="button bg-sub button-small" style="float:left;" value="案件地址坐标拾取" id="map-point-get">


      </div>

      <div style="float:left">

        <ul>

          <!--<li>选择区域：
<select style="float: right;width:50%;" id="region" name="region" class="input input-small">
<option value="cz_td" selected="selected">天等县</option>
<option value="cz_dx">大新县</option>
<option value="cz_lz">龙州县</option>
<option value="cz_jz">江州区</option>
<option value="cz_fs">扶绥县</option>
<option value="cz_px">凭祥市</option>
<option value="cz_nm">宁明县</option>
</select><b>*</b>
</li>-->
          <li style="width:420px;">所属地区：
            <button class="button bg-sub button-small" style="margin:0 4px;" id="select-region">选择</button>
            <div id="editor-region-selected-list" class="list-link" style="min-height:40px;width:68%;float:right;display:inline-block;"></div><b>*</b>
          </li>
          <li style="clear:left;">详细地址：
            <input type="text" class="input input-small wide-input must" id="address" name="address"><b>*</b>
          </li>

          <li>
            X坐标：
            <input type="text" class="input input-small wide-input must" id="point_x" name="point_x"><b>*</b>
          </li>
          <li>
            Y坐标：
            <input type="text" class="input input-small wide-input must" id="point_y" name="point_y"><b>*</b>
          </li>
          <li>
            案件类型：
            <select name="this_area" id="case_type" class="input input-small" style="float: right;width: 82px; padding-left: 15px;">
              <option value="1">审判案件</option>
              <option value="2">执行案件</option>
            </select><b>*</b>
          </li>
        </ul>
        <ul>
          <li>
            法院名称：
            <input type="text" class="input input-small wide-input must" id="court_name" name="court_name"><b>*</b>
          </li>
          <li>
            案号：
            <input type="text" class="input input-small wide-input must" id="an_hao" name="an_hao"><b>*</b>
          </li>
          <li>
            立案时间：
            <input onClick="laydate()" class="input input-small wide-input must" id="li_an_date" name="li_an_date"><b>*</b>
          </li>
          <!--<li>
    案由：
    <input type="text" class="input input-small wide-input must" id="an_you" name="an_you"><b>*</b>
    </li>-->
        </ul>
        <ul>
          <li>
            被执行人：
            <input type="text" class="input input-small wide-input must" id="bzxr" name="bzxr"><b>*</b>
          </li>
          <li>
            标的（万元）：
            <input type="text" class="input input-small wide-input must" id="bd" name="bd" style="width: 140px;"><b>*</b>
          </li>
          <li>
            是否属于崇左地区：
            <select name="this_area" id="this_area" class="input input-small" style="float: right;width: 60px; padding-left: 15px;">
              <option value="1">是</option>
              <option value="0">否</option>
            </select><b>*</b>
          </li>
          <li>
            备注：
            <input type="text" class="input input-small wide-input" id="note" name="note">
          </li>
        </ul>
      </div>
      <!-- 清除浮动撑开父元素 -->
      <div style="clear: both;"></div>
      <div class="submit">
        <button type="button" id="submit" class="submit_btn">保存</button>
        <button type="button" id="delete" class="submit_btn">删除</button>
      </div>
    </div>
    <!--预览面板-->
    <div id="show-panel" style="margin-top:10px;">
      <div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>案号</th>
              <th>案由</th>
              <th>法院名称</th>
              <th>区域</th>
              <th>被执行人</th>
              <th>立案日期</th>
              <th>详细地址</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="case-list-data">
            <tr>
              <td class='list-item-ah'>张三</td>
              <td class='list-item-ay'>男</td>
              <td class='list-item-court-name'>100</td>
              <td class='list-item-retion'>陪审员</td>
              <td class='list-item-bzxr'>大新县</td>
              <td class='list-item-date'>10086</td>
              <td class='list-item-address'>10086</td>
              <td>
                <!--<button class="button bg-mix button-small ry-option-list-btn" onClick="browsePerson(this)">查看</button>-->
                <button class="button bg-sub button-small ry-option-list-btn case-editor" >查看 / 编辑</button>
                <button class="button bg-red button-small ry-option-list-btn case-delete" >删除</button>
                <input type="hidden" class="list-item-caseid" value="1">
              </td>
            </tr>

          </tbody>
        </table>
        <div id="case_list_page" style="height:30px;text-align:center;"></div>
      </div>
    </div>
  </div>

</body>

</html>