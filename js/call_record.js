$(function () {
	show_aj_call_list(1);
	record_aj_search_event();
});
var aj_record_page; //案件当前页
// 展示案件列表
function show_aj_call_list(page,show_type,type_val) {
	aj_record_page = page;
	var perPageNum = 8;
	var show_type = show_type||'ALL';
	var type_val = type_val||'ALL';
	// var fjm = fjm || 'K60';
	// var case_type = case_type || 'ALL';
	var layer_i;
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/call_record/show_aj_call_list',
		data: {
			page: page,
			perPageNum: perPageNum,
			show_type:show_type,
			type_val:type_val
		},
		dataType: 'json',
		beforeSend: function () {
			layer_i = layer.load(1, {
				shade: [0.5, '#000'] //0.1透明度的白色背景
			});
		},
		success: function (data) {
			var str = '';
			var pageNum = data.page_num;
			var i = (page - 1) * perPageNum + 1;
			$.each(data.result, function (k, v) {
				// var sfjt = (v.sfjt==1)?'是':'否';
				str += '<tr><td>' + i + '</td><td>' + v.ah + '</td><td>' + v.ajzt + '</td><td>' + v.larq + '</td><td>' + v.num + '</td><td><button class="button bg-sub button-small ry-option-list-btn" onClick="show_record_list_panel(' + v.ajbs + ')">查看</button></tr>';
				i++;
			});
			$('#record-list-data').html(str);
			laypage({
				cont: 'my_list_page',
				curr: page,
				// skin: 'molv', //皮肤
				pages: Math.ceil(pageNum / perPageNum),
				jump: function (obj, first) {
					if (!first) {
						show_aj_call_list(obj.curr);
					}
				}
			});
		},
		complete: function () {
			layer.close(layer_i);
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}

function show_recordaj_list_panel(page) {
	$('#record-list-data').parent().find('thead tr').html('<th>序号</th>' +
              '<th>案号</th>'+
              '<th>立案状态</th>'+
              '<th>立案日期</th>'+
              '<th>通话记录数</th>'+
              '<th>操作</th>');
	$('.cz-nav').eq(0).html('<a href="">' +
		'<li>首页</li>' +
		'</a>' +
		'<li> > </li>' +
		'<li class="cur-nav">通话案件列表</li>');
	show_aj_call_list(page);
}

function show_record_list_panel(ajbs) {
	$('#record-list-data').parent().find('thead tr').html('<th>序号</th>' +
		'<th>联系人姓名</th>' +
		'<th>人员类型</th>' +
		'<th>电话号码</th>' +
		'<th>是否接听</th>' +
		'<th>通话时间</th>' +
		'<th>操作</th>');
	$('.cz-nav').eq(0).html('<a href="">' +
		'<li>首页</li>' +
		'</a>' +
		'<li> > </li>' +
		'<a href="javascript:show_recordaj_list_panel(' + aj_record_page + ');"<li>通话案件列表</li></a>' +
		'<li> > </li>' +
		'<li class="cur-nav">通话记录列表</li>');
	show_call_record_list(ajbs);
}
//录音列表
function show_call_record_list(ajbs, page) {
	var page = page || 1;
	var perPageNum = 8;
	// var fjm = fjm || 'K60';
	// var case_type = case_type || 'ALL';
	var layer_i;
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/call_record/show_call_record_list',
		data: {
			ajbs: ajbs,
			page: page,
			perPageNum: perPageNum
		},
		dataType: 'json',
		beforeSend: function () {
			layer_i = layer.load(1, {
				shade: [0.5, '#000'] //0.1透明度的白色背景
			});
		},
		success: function (data) {
			var str = '';
			var pageNum = data.page_num;
			var i = (page - 1) * perPageNum + 1;
			$.each(data.result, function (k, v) {
				var sfjt = (v.sfjt == 1) ? '是' : '否';
				str += '<tr><td>' + i + '</td><td>' + v.blxrxm + '</td><td>' + v.lxdx + '</td><td>' + v.phone + '</td><td>' + sfjt + '</td><td>' + v.call_date + '</td><td><button class="button bg-sub button-small ry-option-list-btn" onClick="editorRecord(' + v.id + ')">查看 / 编辑</button><button class="button bg-red button-small ry-option-list-btn" onClick="deleteRecord(this,' + v.id + ')">删除</button></td></tr>';
				i++;
			});
			$('#record-list-data').html(str);
			laypage({
				cont: 'my_list_page',
				curr: page,
				// skin: 'molv', //皮肤
				pages: Math.ceil(pageNum / perPageNum),
				jump: function (obj, first) {
					if (!first) {
						show_call_record_list(ajbs,obj.curr);
					}
				}
			});
		},
		complete: function () {
			layer.close(layer_i);
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}

// 编辑
function editorRecord(id) {
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/call_record/get_record_data',
		data: {
			id: id
		},
		dataType: 'json',
		success: function (data) {
			$.base64.utf8decode = true;
			var note = $.base64.decode(data.call_note);
			var result = $.base64.decode(data.call_result);
			var files = (data.lywj != undefined && data.lywj != null) ? data.lywj.split(',') : '';
			noteLayer(data.phone, data.blxrxm, data.address, data.lxdx, data.ajlx, data.ajbs, data.call_date, data.call_time, data.id);
			$('#note-panel-endcall').css('display', 'none');
			var file_d = '';
			if (files != '') {
				$.each(files, function (k, v) {
					file_d += '<li>' + v + '<i class="delete_file_btn" onclick="push_del_file(this,\'' + v + '\');">删除</i><a href="'+weburl+'record/' + v + '"><i class="download_file_btn">下载</i></a></li>';
					files_arr.push(v);
				});
				$('#record-files-list').append(file_d);
			}
			$('#call-note').val(note);
			$('#call-result').val(result);
			$('#call-sfjt').val(data.sfjt);
		},
		complete: function () {},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}

function deleteRecord(ele, id) {
	layer.confirm('确认删除该通话记录？', function (i) {
		$.ajax({
			type: 'post',
			url: weburl + 'index.php/call_record/delete_record_data',
			data: {
				id: id
			},
			success: function (data) {
				console.log(typeof data)
				if(data=='1'||data==1)
				{
					$(ele).parent().parent().remove();
					layer.alert('删除成功');
				}else{
					layer.alert('删除失败');
				}
			}
		});
	}, function (i) {
		layer.close(i);
	});
}
function record_aj_search_event()
{
	$('#search-record-btn').on('click',function(){
		var ah = $('#search-record-text').val();
		ah = ah.replace(' ','');
		var type = getAjType(ah);
		if(type!='sp'&&type!='zx')
		{

		}
		show_aj_call_list(1,type,ah);
	});
}
