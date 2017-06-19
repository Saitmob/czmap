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
	<link rel="stylesheet" href="<?=base_url()?>js/ztree/zTreeStyle/zTreeStyle.css">
	<script src="<?=base_url()?>js/weburl.js"></script>
	<!--<script src="<?=base_url()?>js/pintuer/pintuer.js"></script>-->
	<script src="<?=base_url()?>js/layer/layer.js"></script>
	<script src="<?=base_url()?>js/laypage/laypage.js"></script>
	<script src="<?=base_url()?>js/laydate/laydate.js"></script>
	<!--<script src="<?=base_url()?>js/getDataGraph.js"></script>-->
	<script src="<?=base_url()?>js/ztree/jquery.ztree.core.min.js"></script>
	<script src="<?=base_url()?>js/jQuery-File-Upload/vendor/jquery.ui.widget.js"></script>
	<script src="<?=base_url()?>js/jQuery-File-Upload/jquery.iframe-transport.js"></script>
	<script src="<?=base_url()?>js/jQuery-File-Upload/jquery.fileupload.js"></script>
	<script src="<?=base_url()?>js/common/uploadfile.js"></script>
	<script src="<?=base_url()?>js/common/region.js"></script>
	<script src="<?=base_url()?>js/personManage.js"></script>
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

</style>

<body id="text">
	<div class="header">
	</div>
	<div class="cz-container" >
		<ul class="cz-nav">
			<a href="<?=base_url()?>">
				<li>首页</li>
			</a>
			<li> > </li>
			<li class="cur-nav">人员管理</li>
		</ul>
		<div class="data_list">
			<div class="ry-search-box">
				<input type="text" class="input input-small" id="search-person-text" style="width:160px;display:inline-block;margin-right:10px;">
				<button class="button bg-sub button-small" id="search-person-btn">查询</button>
				<button class="button bg-sub button-small" id="add-person-btn">添加人员</button>

				<form action="" style="display:inline-block;">
					<span class="button bg-sub button-small" style="position: relative;cursor:pointer;"><span>导入人员表</span>
					<input id="excelFile" type="file" name="file" multiple=""  class="file-upload-btn">
					</span>
				</form>
				<a href="<?=base_url()?>ces.xlsx"><span class="button bg-sub button-small" style="position: relative;cursor:pointer;"><span>模板下载</span>
<input type="button" name="file" multiple="" class="file-upload-btn">
</span>
</a>
			</div>
			<!--展示类型选择-->
			<div style="margin:10px">
				<!--<span class='ry-option'>所属区域：</span>
				<span class='ry-option-data' style="width:60px;">
<button class="button bg-sub button-small ry-option-list-btn" style="margin:0 4px;" id="editor-select-region">选择</button>
<span></span>

				</span>
				<span id="editor-region-selected-list" class="list-link" style="min-height:30px;width:200px;display:inline-block;vertical-align:bottom;"></span>-->
        区域：
				<select class="input input-small"   style="width:90px;display:inline-block" id="person-region-select">
          <option value="all" selected="selected">全部</option>
          <option value="cz_jz">江州区</option>
          <option value="cz_td">天等县</option>
          <option value="cz_dx">大新县</option>
          <option value="cz_px">凭祥市</option>
          <option value="cz_nm">宁明县</option>
          <option value="cz_fs">扶绥县</option>
          <option value="cz_lz">龙州县</option>
        </select>
        人员类型：
				<select class="input input-small"   style="width:90px;display:inline-block" id="person-type-select">
          <option value="all" selected="selected">全部</option>
          <!--<option value="执行员">执行员</option>-->
          <option value="网格员">网格员</option>
          <option value="法律顾问">法律顾问</option>
        </select>
        <!--人员数展示-->
			<div class="person-num" style="display:inline-block">
				<div>
					法律顾问 <span class="badge bg-sub" id="flgw-num">0</span>
				</div>
				<div>
					网格员 <span class="badge bg-sub" id="wgy-num">0</span>
				</div>
			</div>
			</div>
      
			
			<!--人员信息查询-->
			<div class="person-list">
				<table class="table table-hover">
					<thead>
						<tr>
							<th>姓名</th>
							<th>性别</th>
							<th>出生年月</th>
							<th>职务</th>
							<th>地址</th>
							<th>联系号码</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody id="person-list-data">
						<tr class="list-tr">
							<td class='list-item-name'>张三</td>
							<td class='list-item-sex'>男</td>
							<td class='list-item-age'>100</td>
							<td class='list-item-duty'>陪审员</td>
							<td class='list-item-region'>大新县</td>
							<td class='list-item-phone'>10086</td>
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
			<!--人员信息录入及修改-->
			<div action="" class="editor-list" id="editor-panel">
				<ul class="editor-panel-ul">
					<li>
						<div class="edit_right">

							<div style="width:100px;height:120px;line-height:116px;border:1px solid #abc;background:#fff;display:inline-block;vertical-align: bottom;text-align:center;margin: 20px 60px;margin-top: 10px;"
							class="editor-photo">
							</div>
							<span class='ry-option-data' style="text-align: center;">
							<form action="" style="display:block;">
							<span class="button bg-sub button-small" style="position: relative;cursor:pointer;"><span>选择</span>
							<input id="fileupload" type="file" name="files[]" multiple=""  class="file-upload-btn">
							</form>
							</span>
							</span>
							<span class='ry-option-data' style="text-align: center;">
								<button class="button bg-sub button-small ry-option-list-btn editor-select-region" onclick='chooseregion()' style="display: block;margin: 20px auto;" ><span class="icon-map-marker"></span><t>选择区域</t></button>
							</span>
						</div>
						<div class="edit_left">
							<div class="line-div">
								<span class='ry-option'>姓名：</span>
								<span class='ry-option-data'><input type="text" class="input input-small input-auto editor-name" ></span>
							</div>
							<div class="line-div">
								<span class='ry-option'>性别：</span>
								<span class='ry-option-data'>
								<span class='ry-option-data'>
									<select class="input input-small input-auto editor-sex" >
									<option value="男" selected="selected">男</option>
									<option value="女">女</option>
									<option value="">未知</option>
									</select>
								</span>	
							</div>	
							<div class="line-div">
								<span class='ry-option'>出生年月：</span>
								<span class='ry-option-data'><input type="text" class="input input-small input-number editor-age input-auto" ></span>
							</div>	
							<div class="line-div">
								<span class='ry-option'>职务：</span>
								<span class='ry-option-data'>
								<select class="input input-small editor-rybs input-auto" >
								<option value="执行员" selected="selected">执行员</option>
								<option value="网格员">网格员</option>
								<option value="法律顾问">法律顾问</option>
								</select>
								</span>
							</div>
							<div class="line-div">
								<span class='ry-option'>详细地址：</span>
								<span class='ry-option-data'><input type="text" class="input input-small editor-address input-auto" ></span>
							</div>
							<div class="line-div">
								<span class='ry-option'>联系号码：</span>
								<span class='ry-option-data'><input type="text" class="input input-small editor-phone input-auto" ></span>
							</div>
<!-- 							<div class="line-div">
			<span class='ry-option'>内网邮箱：</span>
			<span class='ry-option-data'><input type="text" class="input input-small editor-email input-auto" ></span>
		</div>		 -->		
						</div>
					</li>
<!-- 					<li>
	<span class='ry-option'>地址：</span>
	<span class='ry-option-data'><textarea type="text"  rows="5" class="input editor-intro" ></textarea>
</li> -->
					<li>
						<span class='ry-option'>民族：</span>
						<select class="input input-small editor-nation" >
						<option value="读取中...">读取中...</option>
						</select>
					</li>
					<li>
						<span class='ry-option'>学历：</span>
						<select class="input input-small editor-education" >
						<option value="博士" selected="selected">博士</option>
						<option value="硕士">硕士</option>
						<option value="本科">本科</option>
						<option value="大专">大专</option>
						<option value="中专">中专</option>
						<option value="高中">高中</option>
						<option value="初中">初中</option>
						<option value="小学">小学</option>
						<option value="未知">未知</option>
						</select>
					</li>
					<li>
						<span class='ry-option'>工作地点：</span>
						<span class='ry-option-data'><input type="text" class="input input-small editor-company" ></span>
					</li>
					<li>
						<span class='ry-option'>政治面貌：</span>
						<select class="input input-small editor-zzmm" >
						<option value="中共党员" selected="selected">中共党员</option>
						<option value="中共预备党员">中共预备党员</option>
						<option value="共青团员">共青团员</option>
						<option value="民革党员">民革党员</option>
						<option value="民盟盟员">民盟盟员</option>
						<option value="群众">群众</option>
						<option value="">未知</option>
						</select>
					</li>
					<li>
						<span class='ry-option'>职业：</span>
						<span class='ry-option-data'><input type="text" class="input input-small editor-duty" ></span>
					</li>
</ul>
<input type="hidden"  class="ry-email" name="user-email" value="gyqinxp@gxfy.com">
<input type="hidden" class="ry-id" name="pid">
<input type="hidden" class="ry-photoId" name="photoId" value="">
<input type="hidden" class="ry-intro">
<!--保存-->
<div style="text-align:center">
<button class="button bg-sub button-small ry-option-list-btn ry-save-btn" style="margin:0 4px;" >保存</button>
</div>

</div>

</div>
</div>
<script>
$(function () {
    // $.each($('#test-table'),function(k,v)
    // {
    //   var val = $(v).children().text();
    //   val = val.replace(/(^\s+)|(\s+$)/g,"");
    //   if(val=='2'){
    //     console.log($(v).parent());
    //     // $(v).parent().remove();
    //   }
    //   console.log(val);
    // });
/*    $('#fileupload').fileupload({
        dataType: 'json',
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        add: function (e, data) {
            var allow_file_arr = ['jpeg','jpg','png','gif'];
            var fileType = data.files[0].name;
            fileType = fileType.split('.');
            fileType = fileType[1];
            if($.inArray(fileType.toLowerCase(), allow_file_arr) == -1)
            {
                layer.alert("请上传'jpeg'、'jpg'、'png'、'gif'等格式文件");
            }else{
                // layer.alert('图片格式正确');
                data.submit();
            }
            // data.context = $('<p/>').text('Uploading...').appendTo(document.body);
            // data.submit();
        },
        done: function (e, data) {
            console.log(data);
            if(data.total>3*1000*1000||data.total==0)
            {
                layer.alert('请上传大于0MB且小于1MB的图片');
            }else{
                // $('#editor-photo').prop('src',weburl+data.result.file_path);
                $('#ry-photoId').val(data.result.file_id);
                // console.log(data.result.file_path);
                showPhoto(data.result.file_path);
                // $.each(data.result.files, function (index, file) {
                //     $('<p/>').text(file.name).appendTo(document.body);
                // });
            }
        }
    });*/
/*    $('#excelFile').fileupload({
        acceptFileTypes: /(\.|\/)(xls|xlsx)$/i,
        add: function (e, data) {
            var allow_file_arr = ['xls','xlsx'];
            var fileType = data.files[0].name;
            fileType = fileType.split('.');
            fileType = fileType[fileType.length-1];
			console.log(fileType);
            if($.inArray(fileType.toLowerCase(), allow_file_arr) == -1)
            {
                layer.alert('请上传excel格式文件');
            }else{
                // layer.alert('图片格式正确');
                data.submit();
            }
            // data.context = $('<p/>').text('Uploading...').appendTo(document.body);
            // data.submit();
        },
        done: function (e, data) {
            if(data.result==1)
            {
                layer.alert('导入成功');
            }else{
                layer.alert('导入失败，请检查excel文件内容格式');
            }
        }
    });*/
});
</script>
</body>

</html>
