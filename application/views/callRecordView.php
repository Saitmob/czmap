<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv=X-UA-Compatible content=IE=EmulateIE10>
  <meta http-equiv=X-UA-Compatible content=IE=10>
  <title>多元化解矛盾系统人员管理</title>
  <script src="<?=base_url()?>js/jquery-1.12.0.min.js"></script>
  <link rel="stylesheet" href="<?=base_url()?>js/pintuer/pintuer.css">
  <!--<link rel="stylesheet" href="<?=base_url()?>js/ztree/demo.css">-->
  <link rel="stylesheet" href="<?=base_url()?>css/indexStyle.css">
  <script src="<?=base_url()?>js/weburl.js"></script>
  <script src="<?=base_url()?>js/layer/layer.js"></script>
  <script src="<?=base_url()?>js/laypage/laypage.js"></script>
  <script src="<?=base_url()?>js/laydate/laydate.js"></script>
  <script src="<?=base_url()?>js/jquery.base64.js"></script>
  <script src="<?=base_url()?>js/jQuery-File-Upload/vendor/jquery.ui.widget.js"></script>
  <script src="<?=base_url()?>js/jQuery-File-Upload/jquery.iframe-transport.js"></script>
  <script src="<?=base_url()?>js/jQuery-File-Upload/jquery.fileupload.js"></script>
  <script src="<?=base_url()?>js/common/uploadfile.js"></script>
  <script src="<?=base_url()?>js/call_phone/photo.js"></script>
  <script src="<?=base_url()?>js/call_phone/mycall.js"></script>
  <script src="<?=base_url()?>js/call_record.js"></script>
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
  
  .map-person-info-no-border ul li {
    padding: 4px 0;
  }
  /*通话面板*/
.delete_file_btn{
	display: inline-block;
	padding: 3px 6px;
	font-size: 12px;
	color: #fff;
	background-color: #F24646;
	border-radius: 4px;
	font-style: normal;
	margin:0 3px;
	cursor: pointer;
}
</style>

<body id="text">
  <div class="header">
  </div>
  <div class="cz-container">
    <ul class="cz-nav">
      <a href="<?=base_url()?>">
        <li>首页</li>
      </a>
      <li> > </li>
      <li class="cur-nav">通话记录</li>
    </ul>
    <div class="data_list">
      <div class="ry-search-box">
        <input type="text" class="input input-small" id="search-person-text" style="width:160px;display:inline-block;margin-right:10px;">
        <button class="button bg-sub button-small" id="search-person-btn">查询</button>
      </div>
      <!--展示类型选择-->
      <div style="margin:10px">
        <!--<select class="input input-small" style="width:90px;display:inline-block" id="person-region-select">
<option value="all" selected="selected">全部</option>
<option value="cz_jz">江州区</option>
<option value="cz_td">天等县</option>
</select>-->
        <!--人员数展示-->
        <!--<div class="person-num" style="display:inline-block">
<div>
法律顾问 <span class="badge bg-sub" id="flgw-num">0</span>
</div>
<div>
网格员 <span class="badge bg-sub" id="wgy-num">0</span>
</div>
</div>-->
      </div>


      <!--通话信息查询-->
      <div class="person-list">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>序号</th>
              <th>联系人姓名</th>
              <th>人员类型</th>
              <th>联系号码</th>
              <th>是否接听</th>
              <th>联系时间</th>
            </tr>
          </thead>
          <tbody id="record-list-data">
            <tr class="list-tr">
              <td class='list-item-name'>张三</td>
              <td class='list-item-duty'>陪审员</td>
              <td class='list-item-phone'>10086</td>
              <td class='list-item-date'>10086</td>
              <td>
                <!--<button class="button bg-mix button-small ry-option-list-btn" onClick="browsePerson(this)">查看</button>-->
                <button class="button bg-sub button-small ry-option-list-btn" onClick="editorRecord(this)">查看 / 编辑</button>
                <button class="button bg-red button-small ry-option-list-btn" onClick="deleteRecord()">删除</button>
                <input type="hidden" class="list-item-recordId" value="">
              </td>
            </tr>

          </tbody>
        </table>
        <div id="my_list_page" style="height:30px;width:100%;"></div>
      </div>
      <!--通话信息录入及修改-->

    </div>
    <!--cz-container end-->
  </div>
</body>

</html>