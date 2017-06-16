<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>多元化解矛盾系统当事人管理</title>
  <script src="<?=base_url()?>js/jquery-1.12.0.min.js"></script>
  <link rel="stylesheet" href="<?=base_url()?>js/pintuer/pintuer.css">
  <!--<link rel="stylesheet" href="<?=base_url()?>js/ztree/demo.css">-->
  <link rel="stylesheet" href="<?=base_url()?>css/indexStyle.css">
  <link rel="stylesheet" href="<?=base_url()?>js/ztree/zTreeStyle/zTreeStyle.css">
  <script src="<?=base_url()?>js/weburl.js"></script>
  <!--<script src="<?=base_url()?>js/pintuer/pintuer.js"></script>-->
  <script src="<?=base_url()?>js/layer/layer.js"></script>
  <script src="<?=base_url()?>js/laypage/laypage.js"></script>
  <script src="<?=base_url()?>js/laydate/laydate.js"></script>
  <!--<script src="<?=base_url()?>js/getDataGraph.js"></script>-->
  <script src="<?=base_url()?>js/ztree/jquery.ztree.core.min.js"></script>
  <script src="<?=base_url()?>js/apiv1.3.min.js"></script>
  <script src="<?=base_url()?>js/common/region.js"></script>
  <script src="<?=base_url()?>js/point_manage.js"></script>
  <!--<script src="http://blueimp.github.io/JavaScript-Load-Image/js/load-image.all.min.js"></script>
<script src="<?=base_url()?>js/jQuery-File-Upload/jquery.fileupload-image.js"></script>-->
</head>
<style>
  .person-num {
    margin: 20px 10px 10px 10px;
  }
  
  .person-num div {
    margin: 0 10px;
    display: inline-block;
  }
  #p_manage_dsr_panel table tr td:first-child{
    text-align:right;
  }
</style>

<body>
  <div class="header">

  </div>
  <div class="cz-container">
    <ul class="cz-nav">
      <a href="<?=base_url()?>">
        <li>首页</li>
      </a>
      <li> > </li>
      <li class="cur-nav">人员管理</li>
    </ul>
    <div class="data_list">
      <div class="ry-search-box">
        法院：
        <select class="input input-small" style="width:90px;display:inline-block" id="aj-fjm-select">
          <option value="all" selected="selected">全部</option>
          <option value="K60">崇左市中级人民法院</option>
          <option value="K67">江州区人民法院</option>
          <option value="K68">大新县人民法院</option>
          <option value="K69">天等县人民法院</option>
          <option value="K61">凭祥市人民法院</option>
          <option value="K6A">宁明县人民法院</option>
          <option value="K6B">龙州县人民法院</option>
          <option value="K6C">扶绥县人民法院</option>
        </select>
        <input type="text" class="input input-small" id="search-person-text" style="width:160px;display:inline-block;margin-right:10px;">
        <button class="button bg-sub button-small" id="search-person-btn">查询</button>
      </div>
      <!--人员信息查询-->
      <div class="person-list">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>序号</th>
              <th>案号</th>
              <th>立案状态</th>
              <th>立案日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="aj-list-data">
            <tr class="list-tr">
              <td>1</td>
              <td>案号</td>
              <td>正在执行</td>
              <td>2017-06-14</td>
              <td>
                <!--<button class="button bg-mix button-small ry-option-list-btn" onClick="browsePerson(this)">查看</button>-->
                <button class="button bg-sub button-small ry-option-list-btn" onClick="editorPerson(this)">查看 / 编辑</button>
                <button class="button bg-red button-small ry-option-list-btn" onClick="deletePerson()">删除</button>
                <input type="hidden" class="list-item-pid" value="1">
                <input type="hidden" class="list-item-photoId" value="3">
              </td>
            </tr>

          </tbody>
        </table>
        <div id="my_list_page" style="height:30px;width:100%;"></div>
      </div>
    </div>
  </div>
  <!--当事人坐标地址信息，网格员和法律顾问信息面板-->
  <div id="p_manage_dsr_panel" style="display:none;padding:20px;">
    <h4 style="margin:10px 0;text-align:center;" class="c_bd01">当事人坐标以及网格员、法律顾问管理</h4>
    <table class="table">
      <tr>
        <td>地址：</td>
        <td id="dsr_p_add">-</td>
      </tr>
      <tr>
        <td id="dsr_p_point_btn"></td>
        <td id="dsr_p_point_x_y"></td>
      </tr>
      <tr>
        <td>网格员：选择</td>
        <td id="dsr_p_wgy">-</td>
      </tr>
      <tr>
        <td>法律顾问：选择</td>
        <td id="dsr_p_flgw">-</td>
      </tr>
    </table>
    <input type="hidden" id="wgy_id_str">
    <input type="hidden" id="wgy_name_str">
    <input type="hidden" id="wgy_add_str">
    <input type="hidden" id="flgw_id_str">
    <input type="hidden" id="flgw_name_str">
    <input type="hidden" id="flgw_add_str">
  </div>
</body>

</html>