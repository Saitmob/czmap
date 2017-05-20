<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
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
	<!--<script src="<?=base_url()?>js/getDataGraph.js"></script>-->
	<script src="<?=base_url()?>js/ztree/jquery.ztree.core.min.js"></script>
	<script src="<?=base_url()?>js/jQuery-File-Upload/vendor/jquery.ui.widget.js"></script>
	<script src="<?=base_url()?>js/jQuery-File-Upload/jquery.iframe-transport.js"></script>
	<script src="<?=base_url()?>js/jQuery-File-Upload/jquery.fileupload.js"></script>
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
	<div class="cz-container" style="margin-top:20px;width:1200px;background: rgba(255, 255, 255, 0.7);border-radius: 5px;height:700px;">
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
					<input id="excelFile" type="file" name="file" multiple="" data-url="<?=base_url()?>index.php/personInput/input_person" class="file-upload-btn">
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
				<select class="input input-small" onchange="person_region_select(this)"  style="width:90px;display:inline-block" id="person-region-select">
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
				<select class="input input-small" onchange="person_type_select(this)"  style="width:90px;display:inline-block" id="person-type-select">
          <option value="all" selected="selected">全部</option>
          <option value="陪审员" >陪审员</option>
          <option value="执行员">执行员</option>
          <option value="网格员">网格员</option>
        </select>
        <!--人员数展示-->
			<div class="person-num" style="display:inline-block">
				<div>
					陪审员 <span class="badge bg-sub" id="psy-num">0</span>
				</div>
				<div>
					执行员 <span class="badge bg-sub" id="zxy-num">0</span>
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
						<tr>
							<td class='list-item-name'>张三</td>
							<td class='list-item-sex'>男</td>
							<td class='list-item-age'>100</td>
							<td class='list-item-duty'>陪审员</td>
							<td class='list-item-region'>大新县</td>
							<td class='list-item-phone'>10086</td>
							<td class='list-item-email'>10086</td>
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
				<ul>
					<li>
						<span class='ry-option'>照片：</span>
						<span class='ry-option-data'>
<form action="" style="display:inline-block;">
<span class="button bg-sub button-small" style="position: relative;cursor:pointer;"><span>选择</span>
						<input id="fileupload" type="file" name="files[]" multiple="" data-url="<?=base_url()?>index.php/FileUpload/" class="file-upload-btn">
						</form>
						</span>
						<div style="width:100px;height:120px;line-height:116px;margin-left:20px;border:1px solid #abc;background:#fff;display:inline-block;vertical-align: bottom;text-align:center;"
						id="editor-photo">

						</div>

						</span>
					</li>
					<li>
						<span class='ry-option'>姓名：</span>
						<span class='ry-option-data'><input type="text" class="input input-small" id="editor-name"></span>
					</li>
					<li>
						<span class='ry-option'>性别：</span>
						<span class='ry-option-data'>
<span class='ry-option-data'>
<select class="input input-small" id="editor-sex">
<option value="male" selected="selected">男</option>
<option value="female">女</option>
</select>
</span>
					</li>
					<li>
						<span class='ry-option'>年龄：</span>
						<span class='ry-option-data'><input type="text" class="input input-small input-number" id="editor-age"></span>
					</li>
					<li>
						<span class='ry-option'>职务：</span>
						<span class='ry-option-data'>
<select class="input input-small" id="editor-duty">
<option value="陪审员" selected="selected">陪审员</option>
<option value="执行员">执行员</option>
<option value="网格员">网格员</option>
</select>
</span>
					</li>
					<li>
						<span class='ry-option'>所属区域：</span>
						<span class='ry-option-data'>
<button class="button bg-sub button-small ry-option-list-btn" style="margin:0 4px;" id="editor-select-region">选择</button>
<span></span>

						</span>
						<div id="editor-region-selected-list" class="list-link" style="min-height:40px;width:75%;margin:10px;float:right;"></div>
					</li>
					<li>
						<span class='ry-option'>联系号码：</span>
						<span class='ry-option-data'><input type="text" class="input input-small" id="editor-phone"></span>
					</li>
					<li>
						<span class='ry-option'>内网邮箱：</span>
						<span class='ry-option-data'><input type="text" class="input input-small" id="editor-email"></span>
					</li>
					<li>
						<span class='ry-option'>个人简介：</span>
						<span class='ry-option-data'><textarea type="text"  rows="5" class="input" id="editor-intro"></textarea>
</li>
</ul>
<input type="hidden" id="ry-email"name="user-email" value="gyqinxp@gxfy.com">
<input type="hidden" id="ry-id" name="pid">
<input type="hidden" id="ry-photoId" name="photoId" value="">
<input type="hidden" id="ry-intro">
<!--保存-->
<div style="text-align:center">
<button class="button bg-sub button-small ry-option-list-btn" style="margin:0 4px;" id="ry-save-btn">保存</button>
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
    $('#fileupload').fileupload({
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
    });
    $('#excelFile').fileupload({
        // acceptFileTypes: /(\.|\/)(xls|xlsx)$/i,
        add: function (e, data) {
            // var allow_file_arr = ['xls','xlsx'];
            // var fileType = data.files[0].name;
            // fileType = fileType.split('.');
            // fileType = fileType[fileType.length-1];
			// console.log(fileType);
            // if($.inArray(fileType.toLowerCase(), allow_file_arr) == -1)
            // {
            //     layer.alert('请上传excel格式文件');
            // }else{
                // layer.alert('图片格式正确');
                data.submit();
            // }
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
    });
});
</script>
</body>

</html>
