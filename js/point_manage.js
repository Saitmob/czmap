var aj_page;
$(function () {
	show_aj_list_panel(1, 'K60');
	// show_dsr_list('279900005000616','sp',1);
	$('#aj-fjm-select').change(function () {
		show_case_list(1, $(this).val());
	});
	$("#show_search_button").click(function () {
		show_case_list(1, $('#aj-fjm-select').val(), 'ah', $("#show_search").val());
	});
});

//案件列表面板
function show_aj_list_panel(page, fjm) {
	$('.ry-search-box').css('display', 'block');
	$('#aj-list-data').parent().find('thead tr').html('<th>序号</th>' +
		'<th>案号</th>' +
		'<th>立案状态</th>' +
		'<th>立案日期</th>' +
		'<th>操作</th>');
	$('.cz-nav').eq(0).html('<a href="">' +
		'<li>首页</li>' +
		'</a>' +
		'<li> > </li>' +
		'<li class="cur-nav">案件列表</li>');
	show_case_list(page, fjm);
}
//当事人列表面板
function show_dsr_list_panel(ajbs, aj_type, page) {
	$('.ry-search-box').css('display', 'none');
	$('#aj-list-data').parent().find('thead tr').html('<th>序号</th>' +
		'<th>当事人姓名</th>' +
		'<th>诉讼地位</th>' +
		'<th>电话号码</th>' +
		'<th>地址</th>' +
		'<th>操作</th>');
	$('.cz-nav').eq(0).html('<a href="">' +
		'<li>首页</li>' +
		'</a>' +
		'<li> > </li>' +
		'<a href="javascript:show_aj_list_panel(' + aj_page + ');"<li>案件列表</li></a>' +
		'<li> > </li>' +
		'<li class="cur-nav">案件当事人列表</li>');
	show_dsr_list(ajbs, aj_type, page);
}
// 展示案件列表
function show_case_list(page, fjm, show_type, show_search, case_type) { //当前页，法院分级码，展示类型，类型值
	aj_page = page;
	var perPageNum = 8;
	var fjm = fjm || 'K60';
	var show_type = show_type || 'ALL';
	var case_type = case_type || 'ALL';
	//var show_search = show_search || 'ALL';
	var layer_i;
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/indexShowCaseList',
		data: {
			page: page,
			perPageNum: perPageNum,
			fjm: fjm,
			show_type: show_type,
			case_type: case_type,
			show_search: show_search
		},
		dataType: 'json',
		beforeSend: function () {
			layer_i = layer.load(1, {
				shade: [0.5, '#000'] //0.1透明度的白色背景
			});
		},
		success: function (data) {
			if (data.result.length > 0) {
				var str = '';
				var pageNum = data.pagecount.count;
				var i = (page - 1) * perPageNum + 1;
				$.each(data.result, function (k, v) {
					var ajType = getAjType(v.ah);
					str += '<tr><td>' + i + '</td><td>';
					str += v.ah + '</td><td>' + ((v.ajzt == undefined || v.ajzt == '') ? '未结' : v.ajzt) + '</td><td>';
					str += v.larq + '</td><td><button class="button bg-sub button-small ry-option-list-btn" onClick="show_dsr_list_panel(' + v.ajbs + ',\'' + ajType + '\',1)">查看当事人</button></td></tr>';
					i++;
				});
				$('#aj-list-data').html(str);
				laypage({
					cont: 'my_list_page',
					curr: page,
					// skin: 'molv', //皮肤
					pages: Math.ceil(pageNum / perPageNum),
					jump: function (obj, first) {
						if (!first) {
							show_case_list(obj.curr, fjm, show_type, show_search, case_type);
						}
					}
				});
			} else {
				$('#aj-list-data').html("");
				$('#my_list_page').html("");
				layer.msg("没有相关数据");
			}
		},
		complete: function () {
			layer.close(layer_i);
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}

function show_dsr_list(ajbs, aj_type, page) {
	var page = page || 1;
	var perPageNum = 8;
	var aj_type = aj_type || 'ALL';
	// var fjm = fjm || 'K60';
	// var case_type = case_type || 'ALL';
	var layer_i;
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/pointManage/show_dsr_list',
		data: {
			ajbs: ajbs,
			aj_type: aj_type,
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
				str += '<tr><td>' + i + '</td>';
				str += '<td>' + v.xm + '</td>';
				str += '<td>' + ((isNull(v.ssdw)) ? '' : v.ssdw) + '</td>';
				str += '<td>' + ((isNull(v.lxdh)) ? '' : v.lxdh) + '</td>';
				str += '<td>' + ((isNull(v.xxdz)) ? '' : v.xxdz) + '</td>';
				str += '<td><button class="button bg-sub button-small ry-option-list-btn" onClick="dsr_p_panel(' + v.dsr_id + ',\'' + aj_type + '\',\'' + v.xxdz + '\',select_dsr_point)">查看 / 编辑</button></td>';
				str += '<input type="hidden" id="sp_dsr_gisId_' + v.dsr_id + '" value="' + ((!isNull(v.gis_id)) ? v.gis_id : '') + '" />';
				str += '<input type="hidden" id="sp_dsr_p_' + v.dsr_id + '" value="' + v.POINT_X + ',' + v.POINT_Y + '" />';
				str += '<input type="hidden" id="sp_dsr_ajtype_' + v.dsr_id + '" value="' + v.POINT_X + ',' + v.POINT_Y + '" />';
				str += '</tr>';
				i++;
			});
			$('#aj-list-data').html(str);
			laypage({
				cont: 'my_list_page',
				curr: page,
				// skin: 'molv', //皮肤
				pages: Math.ceil(pageNum / perPageNum),
				jump: function (obj, first) {
					if (!first) {
						show_dsr_list(ajbs, aj_type, obj.curr);
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
//获取当事人坐标（gis_id  用于百度地图坐标拾取确定后的回调
function select_dsr_point(x, y, gis_id) {
	$('#dsr_p_point_x_y').html(x + ',' + y);
	save_dsr_point(gis_id);
}
//保存当事人坐标（gis_id
function save_dsr_point(gis_id)
{
	//保存当事人gis_id
	var dsr_id = $('#dsr_panel_dsr_id').val();
	var aj_type = $('#dsr_panel_ajtype').val();
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/pointManage/save_dsr_gisId',
		data: {
			gis_id: gis_id,
			dsr_id:dsr_id,
			aj_type,aj_type
		},
		success: function (data) {
			if (data == '1') {
				layer.alert('当事人坐标更新成功');
			} else {
				layer.alert('当事人坐标更新失败');
			}
		}
	});
}
//当事人坐标级网格员信息
function dsr_p_panel(dsr_id, aj_type, add, callback) {
	var x = y = gis_id = '';
	if ($('#sp_dsr_p_' + dsr_id).val()) {
		var xy = $('#sp_dsr_p_' + dsr_id).val().split(',');
		x = xy[0];
		y = xy[1];
		gis_id = (!isNull($('#sp_dsr_gisId_' + dsr_id).val())) ? $('#sp_dsr_gisId_' + dsr_id).val() : 0;
	}
	//拿到网格员和法律顾问和坐标，原来坐标直接存到当事人表里，后改成通过当事人表的gis_id获取
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/pointManage/get_wgy_tjy',
		data: {
			dsr_id: dsr_id,
			aj_type: aj_type
		},
		dataType: 'json',
		success: function (data) {
			console.log(data);
			var wg_tj = data.wg_tj;
			var x_y = data.x_y;
			$('#wgy_id_str').val('');
			$('#wgy_name_str').val('');
			$('#flgw_id_str').val('');
			$('#flgw_name_str').val('');
			var wgy_str = '';
			var flgw_str = '';
			if (wg_tj.length > 0) {
				$.each(wg_tj, function (k, v) {
					if (v.rybs == '网格员') {
						wgy_str += v.name + '<span class="c_bd01" style="margin-right:10px;">(' + v.xxdz + ')</span>';
						set_wgy_tjy('wgy', v.person_id, v.name, v.xxdz);
					} else if (v.rybs == '法律顾问') {
						flgw_str += v.name + '<span class="c_bd01" style="margin-right:10px;">(' + v.xxdz + ')</span>';
						set_wgy_tjy('flgw', v.person_id, v.name, v.xxdz);
					}
				});
			}
			layer.open({
				type: 1,
				title: false,
				skin: 'layui-layer-rim', //加上边框
				area: ['620px', '340px'], //宽高
				btn: ['保存', '取消'],
				content: $('#p_manage_dsr_panel'),
				yes: function (i) {
					// callback($('#res-x').val(), $('#res-y').val());
					// $('#point_x').val($('#res-x').val());
					// $('#point_y').val($('#res-y').val());
					save_dsr_p_w_t(dsr_id, aj_type);
					layer.close(i);
				},
				btn2: function (i) {
					layer.close(i);
				},
				end: function () {}
			});
			//当前人员id和案件类型隐藏域
			if($('#dsr_panel_ajtype').length<1&&$('#dsr_panel_dsr_id').length<1)
			{
				$('#p_manage_dsr_panel').append('<input type="hidden" id="dsr_panel_ajtype" />');
				$('#p_manage_dsr_panel').append('<input type="hidden" id="dsr_panel_dsr_id" />');
			}
			$('#dsr_panel_dsr_id').val(dsr_id);
			$('#dsr_panel_ajtype').val(aj_type);
			var btn_str = '<button class="button bg-sub button-small ry-option-list-btn" onClick="bd_point_get(' + gis_id + ',' + x + ',' + y + ',' + callback + ')">选择</button>';
			$('#dsr_p_point_btn').html('坐标：' + btn_str);
			$('#dsr_p_add').html(add);
			//原来直接通过当事人表里的point_x,point_y字段拿到坐标，后改成gis_id拿
			if (!isNull(x)) {
				$('#dsr_p_point_x_y').html(x + ',' + y);
			} else {
				$('#dsr_p_point_x_y').html(x_y.POINT_X + ',' + x_y.POINT_Y);
			}
			$('#dsr_p_wgy').html(wgy_str);
			$('#dsr_p_wgy').prev().html('网格员：<button class="button bg-sub button-small ry-option-list-btn" onClick="select_wgy_tjy(\'wgy\',' + true + ',' +
				set_wgy_tjy + ',' + show_dsr_wgy_tjy + ')">选择</button>');
			$('#dsr_p_flgw').html(flgw_str);
			$('#dsr_p_flgw').prev().html('法律顾问：<button class="button bg-sub button-small ry-option-list-btn" onClick="select_wgy_tjy(\'flgw\',' + true + ',' +
				set_wgy_tjy + ',' + show_dsr_wgy_tjy + ')">选择</button>');
		},
		complete: function () {},
		error: function (a, b, c) {
			console.log(a);
		}
	});
	//隐藏域赋值
	function set_wgy_tjy(p_type, id, name, add) {
		var f_i_str = $('#' + p_type + '_id_str').val();
		var f_n_str = $('#' + p_type + '_name_str').val();
		var f_a_str = $('#' + p_type + '_add_str').val();
		if (f_i_str.length > 0) {
			$('#' + p_type + '_id_str').val(f_i_str + ',' + id);
			$('#' + p_type + '_name_str').val(f_n_str + ',' + name);
			$('#' + p_type + '_add_str').val(f_a_str + ',' + add);
		} else {
			$('#' + p_type + '_id_str').val(id);
			$('#' + p_type + '_name_str').val(name);
			$('#' + p_type + '_add_str').val(add);
		}
	}
	//展示该当事人已选的网格员和调解员列表
	function show_dsr_wgy_tjy() {
		dsr_wgy_tjy('flgw');
		dsr_wgy_tjy('wgy');

	}
	//保存当事人坐标以及网格员、调解员(法律顾问)
	function save_dsr_p_w_t(dsr_id, aj_type) {
		var person_id_str;
		var person_id_arr;
		var wgy_id_arr;
		var flgw_id_arr;
		if ($('#wgy_id_str').val().length > 0) {
			wgy_id_arr = $('#wgy_id_str').val().split(',');
		} else {
			wgy_id_arr = [];
		}
		if ($('#flgw_id_str').val().length > 0) {
			flgw_id_arr = $('#flgw_id_str').val().split(',');
		} else {
			flgw_id_arr = [];
		}
		person_id_arr = wgy_id_arr.concat(flgw_id_arr);
		person_id_str = (person_id_arr.length > 0) ? person_id_arr.join(',') : '';
		$.ajax({
			type: 'post',
			url: weburl + 'index.php/pointManage/save_dsr_p_w_t',
			data: {
				dsr_id: dsr_id,
				aj_type: aj_type,
				person_id_str: person_id_str,
				point: $('#dsr_p_point_x_y').html()
			},
			success: function (data) {
				if (data == '1') {
					$('#sp_dsr_p_' + dsr_id).val($('#dsr_p_point_x_y').html());
					layer.alert('保存成功');
				} else {
					layer.alert('保存失败');
				}
			}
		});
	}
}

function dsr_wgy_tjy(p_type) {
	var str = '';
	if ($('#' + p_type + '_id_str').val().length > 0) {
		var p_name_arr = $('#' + p_type + '_name_str').val().split(',');
		var p_add_arr = $('#' + p_type + '_add_str').val().split(',');

		$.each(p_name_arr, function (k, v) {
			str += v + '<span class="c_bd01" style="margin-right:10px;">(' + p_add_arr[k] + ')</span>';
		});
		$('#dsr_p_' + p_type).html(str);
	}
	$('#dsr_p_' + p_type).html(str);
}
