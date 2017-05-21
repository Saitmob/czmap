$(function () {
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
	// 左侧区块点击
	region_click('cz_jz');
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
	// var bodyW = document.body.clientWidth;
	var bodyW = window.screen.width;
	var bodyH = document.body.clientHeight;
	var scale = (0.385*bodyW)/520;
	var R = Raphael("city_map", 520, 620);
	// console.log(R.transform());
	// console.log(Raphael.angle(10,50,100,120));
	//调用绘制地图方法
	paintMap(R);
	// console.log(R.canvas.transform);
	R.canvas.setAttribute("transform", "scale("+scale+")");

	var textAttr = {
		"fill": "#000",
		"font-size": "22px",
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
			china[state]['text'] = R.text(xx, yy, china[state]['name'] + '\n' + china[state]['data']).attr(textAttr);

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
				// initMap(rId_to_fjm(china[state]['id']));
				// document.getElementsByTagName('iframe')[0].src = "maptest.php?region=" + china[state]['id'];
			};

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
function show_map(aj_type, aj_id) {
	$('#map1_is_show').val('0');
	$('#map2_is_show').val('1');
	var left = $('#aj_or_map_panel').outerWidth();
	$('#aj_box_wraper').animate({
		'left': '-' + left + 'px'
	}, 300);
	var yg_str = '';
	var bg_str = '';
	var cc_str = '';
	var dsr_str = '';
	var ssr_str = '';
	var bssr_str = '';
	var sqzxr_str = '';
	var bzxr_str = '';
	var yg_num = 0;
	var bg_num = 0;
	var cc_num = 0;
	var dsr_num = 0;
	var ssr_num = 0;
	var bssr_num = 0;
	var sqzxr_num = 0;
	var bzxr_num = 0;
	var type = '';
	if (aj_type == 'sp') {
		type = 'SP';
	} else {
		type = 'ZX';
	}
	$.each(region_address[type].ADDRESS, function (k, v) {
		if (v.ADD_TYPE == '原告') {
			yg_str += '<li onclick="centerPoint(\'' + v.POINT.x + '\',\'' + v.POINT.y + '\')">' + v.NAME + '</li>';
			yg_num++;
		} else if (v.ADD_TYPE == '被告') {
			bg_str += '<li onclick="centerPoint(\'' + v.POINT.x + '\',\'' + v.POINT.y + '\')">' + v.NAME + '</li>';
			bg_num++;
		} else if (v.ADD_TYPE == '财产') {
			cc_str += '<li onclick="centerPoint(\'' + v.POINT.x + '\',\'' + v.POINT.y + '\')">' + v.NAME + '</li>';
			cc_num++;
		} else if (v.ADD_TYPE == '上诉人') {
			ssr_str += '<li onclick="centerPoint(\'' + v.POINT.x + '\',\'' + v.POINT.y + '\')">' + v.NAME + '</li>';
			ssr_num++;
		} else if (v.ADD_TYPE == '被上诉人') {
			bssr_str += '<li onclick="centerPoint(\'' + v.POINT.x + '\',\'' + v.POINT.y + '\')">' + v.NAME + '</li>';
			bssr_num++;
		} else if (v.ADD_TYPE == '第三人') {
			dsr_str += '<li onclick="centerPoint(\'' + v.POINT.x + '\',\'' + v.POINT.y + '\')">' + v.NAME + '</li>';
			dsr_num++;
		} else if (v.ADD_TYPE == '申请执行人') {
			sqzxr_str += '<li onclick="centerPoint(\'' + v.POINT.x + '\',\'' + v.POINT.y + '\')">' + v.NAME + '</li>';
			sqzxr_num++;
		} else if (v.ADD_TYPE == '被执行人') {
			bzxr_str += '<li onclick="centerPoint(\'' + v.POINT.x + '\',\'' + v.POINT.y + '\')">' + v.NAME + '</li>';
			bzxr_num++;
		}
	});
	$('#aj-box-yg-num').html(yg_num);
	$('#aj-box-bg-num').html(bg_num);
	$('#aj-box-cc-num').html(cc_num);
	$('#aj-box-ssr-num').html(ssr_num);
	$('#aj-box-bssr-num').html(bssr_num);
	$('#aj-box-dsr-num').html(dsr_num);
	$('#aj-box-sqzxr-num').html(sqzxr_num);
	$('#aj-box-bzxr-num').html(bzxr_num);
	$('#one-aj-yg-list').html(yg_str);
	$('#one-aj-bg-list').html(bg_str);
	$('#one-aj-cc-list').html(cc_str);
	$('#one-aj-ssr-list').html(ssr_str);
	$('#one-aj-bssr-list').html(bssr_str);
	$('#one-aj-dsr-list').html(dsr_str);
	$('#one-aj-sqzxr-list').html(sqzxr_str);
	$('#one-aj-bzxr-list').html(bzxr_str);
	// 弹出案件面板
	$('#case_detail_panel').animate({
		'height': '400px'
	}, 300);
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/case_data/get_case_base_data',
		data: {
			aj_type: aj_type,
			aj_id: aj_id
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
			$('#case_panel_bdje').html(data.BDJE);
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}
//将地图的中心定位到该点
function centerPoint(x, y) {
	var centerPoint = new BMap.Point(x, y);
	window.map.centerAndZoom(centerPoint, 14);
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
	getregion_data(fjm); //获取该区域案件信息
	initMap(fjm, 1); //初始化第一个地图
}

// 展示案件列表
function show_case_list(page, fjm, case_type) {
	var perPageNum = 8;
	var fjm = fjm || 'K60';
	var case_type = case_type || 'ALL';
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
		async: false,
		success: function (data) {
			var str = '';
			var pageNum = showPapeNum('CASE', case_type, fjm);
			var i = 1;
			$.each(data, function (k, v) {
				var ajType = getAjType(v.ah)
				str += '<tr><td>' + i + '</td><td>' + v.ah + '</td><td>' + v.ay + '</td><td>' + v.bdje + '</td><td>' + ((v.ajzt == undefined || v.ajzt == '') ? '未结' : v.ajzt) + '</td><td>' + v.larq + '</td><td><button class="button button--rayen button--border-medium button--text-thin button--size-s button--inverted" data-text="地图" onclick="getRdataById(\'' + fjm + '\',\'' + ajType + '\',\'' + v.aj_id + '\');initMap(\'' + fjm + '\',2);show_map(\'' + ajType + '\',' + v.aj_id + ');"><span>地图</span></button></td></tr>';
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
		error: function (a, b, c) {
			console.log(a);
		}
	});
}
//总页数
function showPapeNum(type, val, fjm) {
	var type = type || 'ALL';
	var val = val || 'ALL';
	var fjm = fjm || '';
	var num = 0;
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/indexShowPageNum',
		async: false,
		data: {
			type: type,
			val: val,
			fjm: fjm
		},
		success: function (data) {
			num = data;
		}
	});
	return num;
}

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


//左侧地图点击
function region_click(r_id) {
	var r_name = regionChange(r_id);
	var fjm = rIdToFjm(r_id)
	$('#current_region').val(r_id);
	$('#current_fjm').val(fjm);
	//案件面板诉讼案件数和执行案件数
	$('#aj-box-ssaj-num').html(sp_zx_obj[fjm].sp);
	$('#aj-box-zxaj-num').html(sp_zx_obj[fjm].zx);

	$('#aj-box-r-name').html(r_name);
	$('#aj-box-court-name').html(fjmToName(fjm));
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
function get_person_info(id) {
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
			console.log(data);
			person_info = data;
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
	layer.open({
		type: 1,
		title: false,
		skin: 'layui-layer-rim', //加上边框
		area: ['320px', '480px'], //宽高
		btn: ['确定'],
		// content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
		content: '<div style="padding:10px;" class="map-person-info"><ul><li>姓名：' + person_info.name + '</li><li>性别：' + ((person_info.sex) ? person_info.sex : '') + '</li><li>出生年月：' + ((person_info.csny) ? person_info.csny : '') + '</li><li>职务：' + ((person_info.duty) ? person_info.duty : '') + '</li><li>人员类型：' + ((person_info.rybs) ? person_info.rybs : '') + '</li><li>联系电话：' + ((person_info.phone) ? person_info.phone : '') + '</li><li style="text-align:center"><img style="width:100px;height:120px;" src="' + weburl + person_info.photo_nam + '.jpg?v=' + Math.random() + '"/></li></ul></div>',
		yes: function (i) {
			// 关闭则删除文件
			$.ajax({
				type: 'post',
				url: weburl + 'index.php/common/file_delete/delete_file',
				data: {
					file_name: person_info.file_name+'.jpg'
				},
				success: function (data) {
				},
			});
			layer.close(i);
		},
		end: function () {}
	});

}
