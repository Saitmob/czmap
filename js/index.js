$(function () {
	// 获取首页头部各个数据
	get_index_all_num();
	//获取地图相关案件数据
	// getregion_tc();
	// 获取各个法院的诉讼案件和执行案件数
	get_sp_zx_num();
	// 重置地图宽度
	// aj-box 自适应
	resetAjBox();
	window.onresize = function () {
		resetAjBox();
	};
	cz_map();
	//案件面板初始化
	init_aj_list_panel('K67');
	// 左侧区块点击
	// region_click('cz_jz');
	// 法院选择事件
	court_select_event();
	//获取非该区域案件信息
	// getunthis_area_data();
	// createDataGraph(unthis_area_data.length);
	// $('#unthis-area-num').html(unthis_area_data.length);
	// $('.aj-num').parent().hover(function () {
	// 	$(this).addClass('active-nav');
	// 	// $(this).find('a').css('color', '#117799');
	// }, function () {
	// 	$(this).removeClass('active-nav');
	// 	// $(this).find('a').css('color', '#fff');
	// });

});
// 绘制svg地图
function cz_map() {
	var bodyW = window.screen.width;
	var bodyH = document.body.clientHeight;
	var scale0 = (0.37 * bodyW) / 520;
	var scale = (0.385 * bodyW) / 520;
	var R = Raphael("city_map", 520 * scale, 620 * scale);
	// console.log(R.transform());
	// console.log(Raphael.angle(10,50,100,120));
	//调用绘制地图方法
	paintMap(R);
	// console.log(R.canvas.transform);
	R.canvas.setAttribute("transform", "scale(" + scale0 + ")");

	var textAttr = {
		"fill": "#000",
		"font-size": "22px",
		"cursor": "pointer",
		"font-family": "微软雅黑"
	};
	var textAttr2 = {
		"fill": "#000",
		"font-size": "14px",
		"cursor": "pointer",
		"font-family": "微软雅黑"
	};
	var textAttr3 = {
		"fill": "red",
		"font-size": "17px",
		"cursor": "pointer",
		"font-family": "微软雅黑"
	};

	for (var state in china) {
		china[state]['path'].color = Raphael.getColor(0.9);
		// console.log(china[state]['path'].scale);
		(function (st, state) {

			//获取当前图形的中心坐标
			var xx = st.getBBox().x + (st.getBBox().width / 2);
			var yy = st.getBBox().y + (st.getBBox().height / 2);
			// china[state]['path'].scale(2,2,xx,yy);
			// china[state]['path'].transform('s0.5');
			//***修改部分地图文字偏移坐标
			switch (china[state]['name']) {
				case "江州区":
					xx -= 15;
					yy += 30;
					break;
				case "大新县":
					xx += 5;
					yy += 10;
					break;
				case "扶绥县":
					xx += 10;
					yy += 10;
					break;
				case "凭祥市":
					// xx += 10;
					yy += 10;
					break;

			}
			//写入文字


			if (china[state]['id'] == 'cz_jz') {
				// china[state]['text3']=R.text(xx-30, yy-60,  '★').attr(textAttr3);
				china[state]['text'] = R.text(xx + 10, yy + 40, china[state]['name'] + '\n' + china[state]['data']).attr(textAttr2);
				china[state]['text2'] = R.text(xx - 10, yy - 10, '★ 崇左中院 \n' + china[state]['data2']).attr(textAttr3);
			} else {
				china[state]['text'] = R.text(xx, yy, china[state]['name'] + '\n' + china[state]['data']).attr(textAttr);
			}
			// console.log(china[state]);
			// china[state]['text']+=R.text(xx, yy,  china[state]['data']).attr(textAttr2);

			// china[state]['text'].push(R.text(xx, yy,  china[state]['data']).attr(textAttr2));
			// console.log(china[state]['text']);

			// var tspanArr = document.getElementsByTagName('tspan');
			// //更改字体
			// for (var i = 0; i < tspanArr.length; i++) {
			//   tspanArr[i].style.fontFamily = '微软雅黑';
			//   tspanArr[i].style.cursor = 'text';
			//   // tspanArr[i].onclick = function(){
			//   //   alert('hello');
			//   // };

			// }
			//设置地图块颜色以及字体
			st.attr({
				'fill': china[state]['color'],
				'cursor': 'pointer'
			});
			st[0].onmouseover = function (e) {
				// st.animate({fill: st.color, stroke: "#F56A6A"}, 500);

				$(this).on('mousemove', function (e) {
					show_tips(e.clientX, e.clientY, china[state]['id']);
				});

				st.animate({
					fill: '#FF7771',
					stroke: "#F56A6A"
				}, 500);
				// st.animate({fill: st.color}, 500);
				$('#su-num-tips').html(china[state].data);
				// console.log(china[state].data);
				china[state]['text'].toFront();
				R.safari();
			};
			st[0].onmouseout = function (e) {

				$('#map_tips').css({
					'display': 'none'
				});
				st.animate({
					fill: china[state]['color'],
					stroke: "#fff"
				}, 500);
				// st.animate({fill: "#97d6f5"}, 500);
				china[state]['text'].toFront();
				R.safari();
			};

			st[0].onclick = function () {
				region_click(china[state]['id']);
				// initMap(rId_to_fjm(china[state]['id']));
				// alert(document.getElementsByTagName('iframe')[0].src);
				// document.getElementsByTagName('iframe')[0].src = "maptest.php?region=" + china[state]['id'];
				//根据不同县调用柱状图
				// getData(china[state]['id']);
				// createDataGrahp(china[state]['id']);
			};
			// 大区文字
			china[state]['text'][0].onmouseover = function (e) {
				$(this).on('mousemove', function (e) {
					show_tips(e.clientX, e.clientY, china[state]['id']);
				});
				st.animate({
					fill: '#FF7771',
					stroke: "#F56A6A"
				}, 500);
			};
			china[state]['text'][0].onmouseout = function () {
				$('#map_tips').css({
					'display': 'none'
				});
				st.animate({
					fill: china[state]['color'],
					stroke: "#F56A6A"
				}, 500);
			};
			china[state]['text'][0].onclick = function () {
				region_click(china[state]['id']);
			};
			// 崇左中院
			if (china[state]['text2'] != undefined) {
				china[state]['text2'][0].onmouseover = function (e) {
					$(this).on('mousemove', function (e) {
						show_tips(e.clientX, e.clientY, china[state]['id']);
					});
					st.animate({
						fill: '#FF7771',
						stroke: "#F56A6A"
					}, 500);
				};
				china[state]['text2'][0].onmouseout = function () {
					$('#map_tips').css({
						'display': 'none'
					});
					st.animate({
						fill: china[state]['color'],
						stroke: "#F56A6A"
					}, 500);
				};
				china[state]['text2'][0].onclick = function () {
					region_click(china[state]['id']);
				};
			}

		})(china[state]['path'], state);
	}
}

// function show_aj_or_map() {
// 	$('.aj_map_tab').on('click', function () {
// 		if ($(this).attr('id') == 'aj_tab') {
// 			$('#aj_box').css('display', 'block');
// 			$('#map_box').css('display', 'none');
// 		} else {
// 			$('#map_box').css('display', 'block');
// 			$('#aj_box').css('display', 'none');
// 		}
// 	});
// }

// 案件展示地图
function aj_show_map(fjm, ajType, ajbs) {
	var left = $('#aj_or_map_panel').outerWidth();
	$('#aj_box_wraper').animate({
		'left': '-' + left + 'px'
	}, 300);
	var index = layer.load(1, {
		shade: [0.5, '#000'] //0.1透明度的白色背景
	});
	$.when(getRdataById(fjm, ajType, ajbs)).done(function (data) {
		window.region_address = data;
		layer.close(index);
		initMap(fjm, 2); //初始化第一个地图
		show_map(ajType, ajbs);
	});
}

function show_map(aj_type, aj_bs) {
	$('#map1_is_show').val('0');
	$('#map2_is_show').val('1');

	var type = '';
	if (aj_type == 'sp') {
		type = 'SP';
	} else {
		type = 'ZX';
	}
	var span_n = 0;
	var add_num_str = '';
	var add_str = '';
	$.each(region_address[type].ADDRESS, function (k, v) {
		add_num_str += '<li><img src="images/' + ryType[k] + '_bz_b.png" alt="">' + k + ' <span class="badge bg-sub" >' + v.length + '</span></li>';
		var p_name = '';
		$.each(v, function (k2, v2) {
			if (v2.POINT.x == undefined || v2.POINT.y == undefined) {
				p_name += '<i class="add-name" style="color:#FC806D" onclick="centerPoint(\'' + v2.POINT.x + '\',\'' + v2.POINT.y + '\')">' + v2.NAME + '</i>' + ((v2.ADD_NAME != null) ? ('（' + v2.ADD_NAME + '）') : '');
			} else {
				p_name += '<i class="add-name" onclick="centerPoint(\'' + v2.POINT.x + '\',\'' + v2.POINT.y + '\')">' + v2.NAME + '</i>';
			}

		});
		var span_str = '<span>' + k + '：' + p_name + '</span>';
		add_str += span_str;
	});
	$('#aj_box_ssdw_num').html(add_num_str);
	$('#aj-mapbox-bottom').html(add_str);

	// 弹出案件面板
	$('#case_detail_panel').animate({
		'height': '400px'
	}, 300);
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/case_data/get_case_base_data',
		data: {
			aj_type: aj_type,
			ajbs: aj_bs
		},
		dataType: 'json',
		success: function (data) {
			$('#case_panel_add_num').html(data.ADD_NUM);
			$('#case_panel_dsr_num').html(data.ADD_DSR_NUM);
			$('#case_panel_cc_num').html(data.ADD_CC_NUM);
			$('#case_panel_ah').html(data.AH);
			$('#case_panel_ay').html(data.AY);
			$('#case_panel_court').html(data.COURT);
			$('#case_panel_larq').html(data.LARQ);
			$('#case_panel_hytcy').html(data.HYTCY);
			var bdje = (data.BDJE == false) ? '' : (data.BDJE + '元');
			$('#case_panel_bdje').html(bdje);
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}
//将地图的中心定位到该点
function centerPoint(x, y) {
	if (x == undefined || x == 'undefined' || y == undefined || y == 'undefined') {
		layer.alert('无法定位到该坐标');
	} else {
		var centerPoint = new BMap.Point(x, y);
		window.map.centerAndZoom(centerPoint, 14);
	}

}

function show_ajList() {
	$('#map1_is_show').val('0');
	$('#map2_is_show').val('0');
	$('#case_detail_panel').animate({
		'height': '0'
	}, 300);
	var left = $('#aj_or_map_panel').outerWidth();
	$('#aj_box_wraper').animate({
		'left': '0'
	}, 300);
}
//案件展示地图
function show_aj_box() {
	$('#map1_is_show').val('0');
	$('#map2_is_show').val('0');
	$('#aj_box').css('display', 'block');
	$('#map_box').css('display', 'none');
	var r_id = $('#current_region').val();
	show_ajList();
}
// 地图展示案件
function show_map_box() {
	if (userObj.user_qx_level != 1) {
		layer.alert('无权限查看该信息');
		return false;
	}
	$('#map1_is_show').val('1');
	$('#map2_is_show').val('0');
	$('#case_detail_panel').animate({
		'height': '0'
	}, 300);
	$('#map_box').css('display', 'block');
	$('#aj_box').css('display', 'none');
	var r_id = $('#current_region').val();
	// console.log(r_id);
	var fjm = $('#current_fjm').val();
	$('#map-box-court-name').html(regionChange(r_id));
	//获取该区域案件信息
	if ($.isEmptyObject(region_address) == true || region_address.REGION_POINT.fjm != fjm || region_address.REGION_TYPE != 'ONE_REGION') {
		var index = layer.load(1, {
			shade: [0.5, '#000'] //0.1透明度的白色背景
		});
		$.when(getregion_data(fjm)).done(function (data) {
			window.region_address = data;
			layer.close(index);
			initMap(fjm, 1); //初始化第一个地图
		});
	}
}

// 展示案件列表
function show_case_list(page, fjm, case_type) {
	var perPageNum = 8;
	var fjm = fjm || 'K60';
	var case_type = case_type || 'ALL';
	var layer_i;
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/indexShowCaseList',
		data: {
			page: page,
			perPageNum: perPageNum,
			fjm: fjm,
			case_type: case_type
		},
		dataType: 'json',
		beforeSend: function () {
			layer_i = layer.load(1, {
				shade: [0.5, '#000'] //0.1透明度的白色背景
			});
		},
		success: function (data) {
			var str = '';
			var pageNum = data.pagecount.count;
			var i = (page - 1) * perPageNum + 1;
			$.each(data.result, function (k, v) {
				var ajType = getAjType(v.ah)
				str += '<tr><td>' + i + '</td><td>' + v.ah + '</td><td>' + ((v.ajzt == undefined || v.ajzt == '') ? '未结' : v.ajzt) + '</td><td>' + v.larq + '</td><td><button style="margin-right:6px;" class="button button--rayen button--border-medium button--text-thin button--size-s button--inverted" data-text="详情" onclick="case_detail_open(\'' + v.ajbs + '\',\'' + ajType + '\',this)"><span>详情</span></button><button class="button button--rayen button--border-medium button--text-thin button--size-s button--inverted" data-text="地图" onclick="aj_show_map(\'' + fjm + '\',\'' + ajType + '\',\'' + v.ajbs + '\');"><span>地图</span></button></td></tr>';
				i++;
			});
			$('#index-case-list').html(str);
			laypage({
				cont: 'aj_list_page',
				curr: page,
				skin: 'molv', //皮肤
				pages: Math.ceil(pageNum / perPageNum),
				jump: function (obj, first) {
					if (!first) {
						show_case_list(obj.curr, fjm, case_type);
					}
				}
			});
		},
		complete:function()
		{
			layer.close(layer_i);
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}
function case_detail_open(ajbs, ajtype, ele) {
	// if(ajtype=='sp')
	// {
	// 	layer.alert('该演示版本暂无诉讼案件详情');
	// 	return false;
	// }
	var href = weburl + 'index.php/caseDetail/getcaseDetail?AH=' + ajbs + '&type=' + ajtype;
	$(ele).css({
		'backgroundColor': 'rgba(0,0,0,0)'
	});
	window.open(href);
}
// //总页数
// function showPapeNum(type, val, fjm) {
// 	var type = type || 'ALL';
// 	var val = val || 'ALL';
// 	var fjm = fjm || '';
// 	var num = 0;
// 	$.ajax({
// 		type: 'post',
// 		url: weburl + 'index.php/welcome/indexShowPageNum',
// 		async: false,
// 		data: {
// 			type: type,
// 			val: val,
// 			fjm: fjm
// 		},
// 		success: function (data) {
// 			num = data;
// 		}
// 	});
// 	return num;
// }

function resetAjBox() {
	var panelWidth = $('#aj_or_map_panel').width();
	var panelHeight = $('#aj_or_map_panel').height();
	$('#aj_box_map').css({
		'width': panelWidth + 'px'
	});
	$('#aj_box_map').css({
		'height': panelHeight + 'px'
	});
	if ($('#aj_box_wraper').position().left == 0) {
		$('#aj_box_list').css('width', panelWidth + 'px');
		$('#aj_box_list').css('height', panelHeight + 'px');
	} else {
		$('#aj_box_map').css({
			'width': panelWidth + 'px'
		});
		$('#aj_box_map').css({
			'height': panelHeight + 'px'
		});
	}
}

function getAjType(ah) {
	if (ah.indexOf('执') != -1) {
		return 'zx';
	} else {
		return 'sp';
	}
}
// 案件提示
function show_tips(x, y, r_id) {
	$('#map_tips').css({
		'display': 'block',
		'left': (x + 15) + 'px',
		'top': (y - 60) + 'px'
	});
	show_tips_content(r_id);
}
// 案件提示内容
function show_tips_content(r_id) {
	var str = '诉讼案件：<span id="ss-num-tips"></span><br> 执行案件：<span id="zx-num-tips"></span>';
	if (r_id != 'cz_jz') {
		$('#map_tips').html(str);
		$('#ss-num-tips').html(sp_zx_obj[rIdToFjm(r_id)].sp);
		$('#zx-num-tips').html(sp_zx_obj[rIdToFjm(r_id)].zx);
	} else {
		var str = '崇左市中级人民院：<br>诉讼案件：' + sp_zx_obj.K60.sp + '&nbsp;&nbsp;&nbsp;&nbsp;执行案件：' + sp_zx_obj.K60.zx + '<br>江州区人民法院：<br>诉讼案件：' + sp_zx_obj.K67.sp + '&nbsp;&nbsp;&nbsp;&nbsp;执行案件：' + sp_zx_obj.K67.zx;
		$('#map_tips').html(str);
	}
}

function init_aj_list_panel(fjm) {
	if (userObj.user_qx_level == 1) {
		$('#aj-box-court-name').html(fjmToName(fjm));

	} else {
		$('#aj-box-court-name').parent().html('我的案件');
		$('.aj-box-court-name-select').css('display', 'none');
	}
	show_case_list(1, fjm);
}
//左侧地图点击
function region_click(r_id) {
	// 无权限则无法点击
	if (userObj.user_qx_level != 1) {
		layer.alert('无权限查看该信息');
		return false;
	}
	var r_name = regionChange(r_id);
	var fjm = rIdToFjm(r_id)
	$('#current_region').val(r_id);
	$('#current_fjm').val(fjm);
	//案件面板诉讼案件数和执行案件数
	$('#aj-box-ssaj-num').html(sp_zx_obj[fjm].sp);
	$('#aj-box-zxaj-num').html(sp_zx_obj[fjm].zx);

	// $('#aj-box-r-name').html(r_name);
	// 权限设置

	init_aj_list_panel(fjm);
	if (r_id == 'cz_jz') {
		$('.aj-box-court-name-select').css('display', 'inline-block');
		$('.aj-box-court-name-select').val(fjm);
	} else {
		$('.aj-box-court-name-select').css('display', 'none');
	}
	// 更改右侧列表
	show_case_list(1, fjm);
	// 更改右侧“地图” 如果地图为展示状态，则初始化地图，否则不作处理

	if ($('#map1_is_show').val() == '1') {
		show_map_box();
	}
	if ($('#map2_is_show').val() == '1') {
		show_ajList();
	}
}
//aj-box 法院选择事件
function court_select_event() {
	$('.aj-box-court-name-select').eq(0).change(function () {
		var fjm = $(this).val();
		$('#aj-box-ssaj-num').html(sp_zx_obj[fjm].sp);
		$('#aj-box-zxaj-num').html(sp_zx_obj[fjm].zx);
		show_case_list(1, fjm);
		$('#aj-box-court-name').html(fjmToName(fjm));
	});
	$('.aj-box-court-name-select').eq(1).change(function () {
		var fjm = $(this).val();
		getregion_data(fjm);
		if (region_address.SP.ADDRESS.length == 0 && region_address.ZX.ADDRESS.length == 0) {
			map_box_aj_num();
			set_map_box_dsrnum();
			layer.alert('该法院暂无案件');
			map.clearOverlays(); //清除覆盖物 
		} else {
			initMap(fjm, 1);
		}

	});

}

//通过人员id拿到信息
function get_person_info(id,address) {
	var person_info = {}
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/getPersonInfo',
		async: false,
		data: {
			id: id
		},
		dataType: 'json',
		success: function (data) {
			person_info = data;
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
	var photo_url = (person_info.photo_url == null) ? './photo.jpg' : (person_info.photo_url);
	person_info.address = address;
	layer.open({
		type: 1,
		title: false,
		skin: 'layui-layer-rim', //加上边框
		area: ['380px', '490px'], //宽高
		btn: ['确定'],
		// content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
		content: '<div id="persin_info_panel" style="padding:10px;" class="map-person-info"><ul><li>姓名：' + person_info.name + '</li><li>性别：' + ((person_info.sex) ? person_info.sex : '') + '</li><li>出生年月：' + ((person_info.csny) ? person_info.csny : '') + '</li><li>职务：' + ((person_info.duty) ? person_info.duty : '') + '</li><li>人员类型：' + ((person_info.rybs) ? person_info.rybs : '') + '</li><li>联系电话：<select class="input input-small " id="phone-add0-' + person_info.phone + '" style="display:inline-block;width:70px;"><option value="">不加0</option><option value="0">+0</option><option value="00">+00</option></select><span id="p_' + person_info.phone + '">' + ((person_info.phone) ? person_info.phone : '') + '</span><button class="button bg-sub button-small" style="margin:0 10px;" onclick="call_one_person(' + person_info.phone + ',\''+person_info.name+'\',\''+address+'\');">拨号</button></li><li style="text-align:center"><img style="width:100px;height:120px;" src="' + photo_url + '?v=' + Math.random() + '"/></li></ul></div>',
		yes: function (i) {
			// 挂断电话
			TV_HangUpCtrl(0);
			layer.close(i);
		},
		end: function () {
			TV_HangUpCtrl(0);
			// console.log(callIsEnd);
		}
	});

}
// 拨号是否加0
function call_one_person(p,name,address) {
	// var phone = $('#p_'+p).html();
	phone = $('#phone-add0-' + p).val() + 18377775127;
	dial_up(phone,name,address);
}
// 首页获取审理案件数，地点数以及网格员数等
function get_index_all_num() {
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/getBaseData',
		dataType: 'json',
		data: {
			type: 'all'
		},
		success: function (data) {
			$('#index_all_num_aj').html(data.AJ_NUM);
			$('#index_all_num_add').html(data.AJ_P_NUM);
			$('#index_all_num_wgy').html(data.WGY_NUM);
			$('#index_all_num_flgw').html(data.FLGW_NUM);
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}
// 首页布局更改
function changeBj() {
	var width = window.screen.width;
	var height = window.screen.height;
	console.log(width);
	console.log(height);
	console.log(width / height);
}
