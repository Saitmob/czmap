//选择人员所属区域
var regionSelectMultiple;

function selectRegion(multiple, callbackFun, callbackFun2) {
	var zTree;
	var demoIframe;
	regionSelectMultiple = multiple || false; //默认不多选
	var callbackFun = callbackFun || function () {
		console.log('未定义回调方法')
	};
	var callbackFun2 = callbackFun2 || function () {
		console.log('未定义回调方法2')
	};
	var setting = {
		view: {
			dblClickExpand: false,
			showLine: true,
			selectedMulti: false
		},
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: 0
			}
		},
		callback: {
			beforeClick: function (treeId, treeNode) {
				var id = treeNode.id,
					pArr = [];
				pArr.unshift(treeNode.name);
				var pNode = treeNode.getParentNode();
				while (pNode != null) {
					pArr.unshift(pNode.name);
					pNode = pNode.getParentNode();
				}
				var pArr_str = pArr.join('');
				// var selectListDom = '<div id="'+id+'" class="selected">'+pArr_str+'</div>';
				var selectListDom = '<button  class="button bg-mix" id="need-select" onClick="addSelect(' + id + ',\'' + pArr_str + '\',' + callbackFun + ');" >' + pArr_str + '</button>';
				$('.select-list').html(selectListDom);
			}
		}
	};
	layer.open({
		type: 1,
		title: '区域选择',
		skin: 'layui-layer-rim', //加上边框
		area: ['540px', '460px'], //宽高
		btn: ['确定'],
		closeBtn: 1,
		// content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
		content: '<div class="panel" style="height:374px;overflow:hidden;"><div class="panel-body" style="height:330px;box-sizing:border-box;overflow:hidden;"><div id="treeDemo" style="width:200px;height:315px;overflow:auto;border-right:1px solid gray;display:inline-block;" class="ztree"></div><div style="width:56%;height:100%;display:inline-block;vertical-align:top;padding:0 10px"><p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">单击选择</p><div class="select-list" style="height:64px;"></div><p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">已选择</p><div id="region-selected-list" class="list-link" style="height:155px;overflow:auto;"></div></div> </div></div>',
		yes: function (i) {
			var idObjArr = $('#region-selected-list').find('a[id^="region_"]');
			var idArr = [];
			var nameArr = [];
			var name = '';
			$.each(idObjArr, function (k, v) {
				var id = parseInt($(v).attr('id').substr(7));
				idArr.push(id);
				name = $.trim($("#region_" + id).text().replace("删除", ""));
				nameArr.push(name);
			});
			callbackFun2(idArr, nameArr, name);
			layer.close(i);
		},
		end: function () {
			// $('.editor-select-region').on('click', function () {
			//     $('.layui-layer-content .editor-select-region').unbind();
			//     $('.layui-layer-content .icon-map-marker').data('id', "");
			//     $('.layui-layer-content .icon-map-marker').data('name', "");    
			//     selectRegion(true, changeRangeText);
			// });
		}
	});
	//得到节点信息
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/regionNode',
		dataType: 'json',
		async: false,
		success: function (data) {
			zNodes = data;
			zTree = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
		},
		error: function (a, b, c) {
			console.log(a);
			console.log(b);
			console.log(c);
		}
	});

}

//添加区域事件
function addSelect(id, name, callback) {
	var callback = callback || function () {};
	if (id == '无') {
		return false;
	}
	var idName1 = 'region_';
	var idName2 = 'editor_region_';
	var str_1 = '<a href = "javascript:;" class="selectedRegion" id="';
	var str_2 = id + '" onmouseover="showDelBtn(this)" onmouseout="hideDelBtn(this)"> ' + name + '<span class="float-right tag bg-red" style="display:none;" onclick="deleteRegion(this,' + id + ')">删除</span> </a>';
	var str1 = str_1 + idName1 + str_2;
	var str2 = str_1 + idName2 + str_2;
	if ($('#editor_region_' + id).length > 0) {
		layer.alert('请勿重复添加');
		return false;
	}
	//判断是否多选
	if (regionSelectMultiple == true) {
		$('#region-selected-list').append(str1);
		$('#editor-region-selected-list').append(str2);
	} else {
		$('#region-selected-list').html(str1);
		$('#editor-region-selected-list').html(str2);
	}
	//
	callback(id, name);

}
//区域删除按钮显示
function showDelBtn(ele) {
	$(ele).find('span').css('display', 'inline-block');
}
//区域删除按钮隐藏
function hideDelBtn(ele) {
	$(ele).find('span').css('display', 'none');
}
//删除区域
function deleteRegion(ele, id, callback) {
	$(ele).parent().remove();
	if ($('#region_' + id).length > 0) {
		$('#region_' + id).remove();
	}
	if ($('#editor_region_' + id).length > 0) {
		$('#editor_region_' + id).remove();
	}
}
//删除人员
function deleteP(ele, p_type, id, name, add) {
	layer.confirm('是否确认删除', function (i) {
		$(ele).parent().remove();
		if ($('#' + p_type + '_id_str').val().length > 0) {
			var p_id_arr = $('#' + p_type + '_id_str').val().split(',');
			var p_name_arr = $('#' + p_type + '_name_str').val().split(',');
			var p_add_arr = $('#' + p_type + '_add_str').val().split(',');
			var k = $.inArray(id, p_id_arr);
			p_id_arr.splice(k, 1);
			p_name_arr.splice(k, 1);
			p_add_arr.splice(k, 1);
			$('#' + p_type + '_id_str').val(p_id_arr.join(','));
			$('#' + p_type + '_name_str').val(p_name_arr.join(','));
			$('#' + p_type + '_add_str').val(p_add_arr.join(','));
		}
		layer.close(i);
	}, function (i) {
		layer.close(i);
	});
}
//百度坐标获取
function bd_point_get(x, y, callback) {
	if($('#bd_map_x_y').length<1)
	{
		$('body').append('<input type="hidden" id="bd_map_x_y" />');
		$('#bd_map_x_y').val(x+','+y);
	}else{
		if($('#bd_map_x_y').val()!='')
		{
			var xy = $('#bd_map_x_y').val().split(',');
			x=xy[0];
			y=xy[1];
		}
	}
	layer.open({
		type: 1,
		title: '坐标拾取',
		skin: 'layui-layer-rim', //加上边框
		area: ['620px', '490px'], //宽高
		btn: ['确定'],
		// content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
		content: '<div style="text-align:center;padding:10px 0;"><!--<input type="text" class="input input-smal" style="width:120px;display:inline-block;margin-right:8px;">--><button class="button bg-sub button-small" id="region-location" style="margin-right:10px;">区域定位</button><span style="margin-right:10px;font-size:0.9em">单击地图区域获取坐标</span>X：<input type="text" id="res-x" class="input input-smal" style="width:120px;display:inline-block;margin-right:8px;">Y：<input type="text" class="input input-smal"  id="res-y" style="width:120px;display:inline-block;margin-right:8px;"><div id="getPointMap" style="height:360px;margin-top:10px;width:100%;"></div></div><script>showMap(' + x + ',' + y + ');</script>',
		yes: function (i) {
			$('#bd_map_x_y').val($('#res-x').val()+','+$('#res-y').val());
			callback($('#res-x').val(), $('#res-y').val());
			layer.close(i);
		},
		end: function () {}
	});
}
//展示地图
//坐标拾取地图
var map;

function showMap(x, y) {
	var x = x || 107.358146;
	var y = y || 22.412665;
	$('#res-x').val(x);
	$('#res-y').val(y);
	map = new BMap.Map("getPointMap");
	var p = new BMap.Point(x, y);
	map.centerAndZoom(p, 11);
	var marker = new BMap.Marker(p); // 创建标注  
	map.clearOverlays(); //清除覆盖物 
	map.addOverlay(marker); // 将标注添加到地图中
	map.setDefaultCursor("crosshair");
	map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
	map.enableKeyboard(); //启用键盘上下左右键移动地图
	map.addEventListener("click", function (e) {
		$('#res-x').val(e.point.lng);
		$('#res-y').val(e.point.lat);
		var point = new BMap.Point(e.point.lng, e.point.lat);
		var marker = new BMap.Marker(point); // 创建标注  
		map.clearOverlays(); //清除覆盖物 
		map.addOverlay(marker); // 将标注添加到地图中
	});
	$('#region-location').on('click', function () {
		selectRegion(false, centerMap);
		//定位地图
		function centerMap(gisId, x, y) {
			var gisId = gisId || ''; //传gid时通过gid定位，否则通过坐标定位
			var x = x || '';
			var y = y || '';
			if (gisId != '') {
				//获取坐标
				$.ajax({
					type: 'post',
					url: weburl + 'index.php/welcome/getPointById',
					data: {
						gisId: gisId
					},
					dataType: 'json',
					success: function (data) {
						if (data.x == '' || data.y == '') {
							layer.alert('无法定位该地点');
							return false;
						}
						var point = new BMap.Point(data.x, data.y);
						map.centerAndZoom(point, 14);
						var marker = new BMap.Marker(point); // 创建标注  
						map.clearOverlays(); //清除覆盖物 
						map.addOverlay(marker); // 将标注添加到地图中
					}
				});
			} else {
				var point = new BMap.Point(x, y);
				map.centerAndZoom(point, 14);
				var marker = new BMap.Marker(point); // 创建标注  
				map.clearOverlays(); //清除覆盖物 
				map.addOverlay(marker); // 将标注添加到地图中
			}
		}
	});
}
//网格员、调解员选择
function select_wgy_tjy(p_type, multiple, callbackFun, callbackFun2) { //点击回调，确认回调
	var zTree;
	var demoIframe;
	regionSelectMultiple = multiple || true; //默认多选
	var callbackFun = callbackFun || function () {
		console.log('未定义回调方法')
	};
	var callbackFun2 = callbackFun2 || function () {
		console.log('未定义回调方法2')
	};
	var setting = {
		view: {
			dblClickExpand: false,
			showLine: true,
			selectedMulti: false
		},
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: 0
			}
		},
		callback: {
			beforeClick: function (treeId, treeNode) {
				var id = treeNode.id,
					pArr = [];
				pArr.unshift(treeNode.name);
				var pNode = treeNode.getParentNode();
				while (pNode != null) {
					pArr.unshift(pNode.name);
					pNode = pNode.getParentNode();
				}
				var pArr_str = pArr.join('');

				$.ajax({
					type: 'post',
					url: weburl + 'index.php/pointManage/get_wgy_tjy_by_gisid',
					dataType: 'json',
					data: {
						gis_id: id,
						p_type: p_type
					},
					success: function (data) {
						var selectListDom = '';
						if (data.length > 0) {
							$.each(data, function (k, v) {
								selectListDom += '<button  class="button bg-mix" style="margin:2px 0;" onClick="select_w_or_t(\'' + p_type + '\',' +
									v.person_id + ',' + '\'' + v.name + '\',\'' + v.xxdz + '\',' + callbackFun + ');" >' +
									v.name + '<span class="c_bd01">(' +
									v.xxdz + ')</span></button>';
							});
						} else {
							selectListDom = '<p class="c_bd01" style="text-align:center;">无结果</p>';
						}
						$('.select-list').html(selectListDom);

					},
					error: function (a, b, c) {
						console.log(a);
						console.log(b);
						console.log(c);
					}
				});
			}
		}
	};
	layer.open({
		type: 1,
		title: '人员选择',
		skin: 'layui-layer-rim', //加上边框
		area: ['640px', '560px'], //宽高
		btn: ['确定'],
		closeBtn: 0,
		// content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
		content: '<div class="panel" style="height:474px;overflow:hidden;">' +
			'<div class="panel-body" style="height:430px;box-sizing:border-box;overflow:hidden;">' +
			'<div id="treeDemo" style="width:200px;height:100%;overflow:auto;border-right:1px solid gray;display:inline-block;" class="ztree"></div>' +
			'<div style="width:56%;height:100%;display:inline-block;vertical-align:top;padding:0 10px">' +
			'<p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">单击选择</p><div class="select-list" style="height:218px;overflow:auto;"></div><p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">已选择</p><div id="p-selected-list" class="list-link" style="height:107px;overflow:auto;"></div></div> </div></div>',
		yes: function (i) {
			callbackFun2();
			layer.close(i);
		},
		end: function () {
		}
	});
	added_p_list(p_type);
	//得到节点信息
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/regionNode',
		dataType: 'json',
		async: false,
		success: function (data) {
			zNodes = data;
			zTree = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
		},
		error: function (a, b, c) {
			console.log(a);
			console.log(b);
			console.log(c);
		}
	});
}

function select_w_or_t(p_type, id, name, add, callbackFun) {
	if ($('#pp_' + id).length > 0) {
		layer.alert('请勿重复添加');
		return false;
	}
	callbackFun(p_type, id, name, add);
	added_p_list(p_type);
}
//添加网格员或法律顾问显示列表
function added_p_list(p_type) {
	if ($('#' + p_type + '_id_str').val().length > 0) {
		var p_id_arr = $('#' + p_type + '_id_str').val().split(',');
		var p_name_arr = $('#' + p_type + '_name_str').val().split(',');
		var p_add_arr = $('#' + p_type + '_add_str').val().split(',');
		var str_1 = '';
		$.each(p_id_arr, function (k, v) {
			str_1 += '<a href = "javascript:;" id="pp_' +
				v + '" onmouseover="showDelBtn(this)" onmouseout="hideDelBtn(this)"> ' +
				p_name_arr[k] + '<span class="float-right tag bg-red" style="display:none;" onclick="deleteP(this,\'' + p_type + '\',' + v + ',\'' + p_name_arr[k] + '\',\'' + p_add_arr[k] + '\')">删除</span> </a>';
		});
		$('#p-selected-list').html(str_1);
	}
}
