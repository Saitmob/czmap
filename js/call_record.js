$(function () {
	show_call_record_list(1);
});

// 展示案件列表
function show_call_record_list(page) {
	var perPageNum = 8;
	// var fjm = fjm || 'K60';
	// var case_type = case_type || 'ALL';
	var layer_i;
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/call_record/show_call_record_list',
		data: {
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
			console.log(data);
			var str = '';
			var pageNum = data.page_num;
			var i = (page - 1) * perPageNum + 1;
			$.each(data.result, function (k, v) {
                var sfjt = (v.sfjt==1)?'是':'否';
				str += '<tr><td>'+i+'</td><td>' + v.blxrxm + '</td><td>' + v.lxdx + '</td><td>' + v.phone + '</td><td>'+sfjt+'</td><td>' + v.call_date + '</td><td><button class="button bg-sub button-small ry-option-list-btn" onClick="editorRecord(' + v.id + ')">查看 / 编辑</button><button class="button bg-red button-small ry-option-list-btn" onClick="deleteRecord(this,' + v.id + ')">删除</button></td></tr>';
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
						show_call_record_list(obj.curr);
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
            $.base64.utf8decode=true;
            $note = $.base64.decode(data.call_note);
            $result = $.base64.decode(data.call_result);
            
		},
		complete: function () {
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}
