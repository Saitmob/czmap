//选择人员所属区域
var regionSelectMultiple;
//bd_map_gisId是点击区域时存储的gisId，selected_gis_id_str是确认时存储的gis_id
function selectRegion(multiple, callbackFun, callbackFun2) { //是否多选，点击节点回调，确认后回调；已选选择列表在selected_gis_id_str中，自行生成
	var zTree;
	var demoIframe;
	regionSelectMultiple = multiple || false; //默认不多选
	var callbackFun = callbackFun || function () {
		console.log('未定义回调方法')
	};
	var callbackFun2 = callbackFun2 || function () {
		console.log('未定义回调方法2')
	};
	var isChanged = false; //区域节点是否被其他用户更改
	var setting = {
		view: {
			dblClickExpand: false,
			showLine: true,
			selectedMulti: false,

			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom

		},
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: 0
			}
		},
		edit: {
			enable: true,
			editNameSelectAll: true,
			removeTile: "remove",
			showRemoveBtn: true,
			showRenameBtn: true
		},
		callback: {
			beforeClick: function (treeId, treeNode) {
				if ($('#selected_gis_name_str').length < 1) {
					$('body').append('<input type="hidden" id="selected_gis_name_str" />');
				}
				console.log(treeNode);
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
			},
			beforeRemove: beforeRemove,
			beforeRename: beforeRename,
			onRemove: onRemove,
			onRename: onRename
		}
	};

	// function addHoverDom(treeId, treeNode) {
	// 	var aObj = $("#" + treeNode.tId + "_a");
	// 	if ($("#diyBtn_" + treeNode.id).length > 0) return;
	// 	var editStr = "<span id='diyBtn_space_" + treeNode.id + "' > </span>" +
	// 		"<button type='button' class='diyBtn1' id='diyBtn_" + treeNode.id +
	// 		"' title='" + treeNode.name + "' onfocus='this.blur();'></button>";
	// 	aObj.append(editStr);
	// 	var btn = $("#diyBtn_" + treeNode.id);
	// 	if (btn) btn.bind("click", function () {
	// 		alert("diy Button for " + treeNode.name);
	// 	});
	// };
	var newCount = 1;

	function addHoverDom(treeId, treeNode) {
		if (treeNode.level == 3) //屯级无法再往下增加
		{
			return false;
		}
		var sObj = $("#" + treeNode.tId + "_span");
		if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
		var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
			"' title='add node' onfocus='this.blur();'></span>";
		sObj.after(addStr);
		var btn = $("#addBtn_" + treeNode.tId);
		if (btn) btn.bind("click", function () {
			layer.confirm('确认在此区域下新增区域吗？', function (index) {
					layer.close(index);
					var name;
					layer.prompt({
						title: '输入您刚才选中区域下需要新增的区域名，如选中“江州区”增加“江南街道”，输入“江南街道”即可',
						formType: 2
					}, function (text, index) {
						name = text;
						if (!checkIsChange(treeNode.id, treeNode.name)) {
							name = name.replace(/\s+/g, '');
							var zTree = $.fn.zTree.getZTreeObj("treeDemo");
							zTree.addNodes(treeNode, {
								id: (100 + newCount),
								pId: treeNode.id,
								name: name
							});
							changeAddres('add', treeNode.id, name);
						}
						layer.close(index);
					});

					return false;
				},
				function () {

				});
		});


	};

	function removeHoverDom(treeId, treeNode) {
		$("#addBtn_" + treeNode.tId).unbind().remove();
	};

	function beforeRemove(treeId, treeNode) {
		console.log(treeNode);
		var canDele = true;
		canDele = confirm('删除后不可恢复，确认删除该区域吗？');
		if (canDele && treeNode.children) {
			layer.alert('请先删除子节点区域');
			return false;
		} else if (canDele) {
			isChanged = checkIsChange(treeNode.id, treeNode.name);
			if (isChanged) return false;
		}
	}

	function onRemove(e, treeId, treeNode) {
		console.log(isChanged);
		if (!isChanged) changeAddres('remove', treeNode.id, treeNode.name);
	}

	function beforeRename(treeId, treeNode, newName, isCancel) {
		console.log(treeNode);
		isChanged = checkIsChange(treeNode.id, treeNode.name);
	}

	function onRename(e, treeId, treeNode, isCancel) {
		if (!isChanged) changeAddres('rename', treeNode.id, treeNode.name);
		// else{
		// 	layer.alert('所改区域已被其他用户更改，请重新刷新页面')
		// }
	}
	//检查要更改的区域节点是否发生变化，因为更改途中可能有别的用户更改了这个节点的id
	function checkIsChange(id, name) {
		var res = false;
		$.ajax({
			type: 'post',
			url: weburl + 'index.php/pointManage/checkIsChange',
			data: {
				id: id,
				name: name
			},
			async: false,
			success: function (data) {
				console.log(data);
				if (data == '1') //所选节点已发生变化
				{
					layer.alert('页面超时，所选区域已被其他用户更改，请重新刷新页面');
					res = true;
				} else {
					res = false;
				}
			},
			error: function (a, b, c) {
				console.log(a);
				console.log(b);
				console.log(c);
			}
		});
		return res;
	}
	//更改当事人地址库cz_gis_library_dsr
	function changeAddres(type, id, name) { //更改类型（增删改，ID, ADDRESS,P_ID

		if (!isChanged) {
			$.ajax({
				type: 'post',
				url: weburl + 'index.php/pointManage/changeAddress',
				data: {
					type: type,
					id: id,
					name: name
				},
				async: false,
				success: function (data) {
					if (data == '1') {
						layer.alert('修改成功');
					} else if (data == '2') {
						layer.alert('删除成功');
					} else if (data == '3') {
						layer.alert('新增成功');
					} else if (data == '0') {
						layer.alert('修改失败');
					}
				},
				error: function (a, b, c) {
					console.log(a);
					console.log(b);
					console.log(c);
				}
			});
		}
	}

	layer.open({
		type: 1,
		title: '区域选择',
		skin: 'layui-layer-rim', //加上边框
		area: ['640px', '470px'], //宽高
		btn: ['确定'],
		closeBtn: 1,
		// content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
		content: '<div class="panel" style="height:344px;overflow:hidden;">' +
			'<div class="panel-body" style="height:100%;box-sizing:border-box;overflow:hidden;position:relative;">' +
			'<div id="treeDemo" style="width:200px;height:100%;overflow:auto;border-right:1px solid gray;display:inline-block;" class="ztree"></div>' +
			'<div style="width:56%;height:100%;display:inline-block;vertical-align:top;padding:0 10px">' +
			'<p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">单击选择</p>' +
			'<div class="select-list" style="height:64px;"></div>' +
			'<p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">已选择</p>' +
			'<div id="region-selected-list" class="list-link" style="height:155px;overflow:auto;"></div>' +
			'</div>' +
			'</div>' +
			'</div>',
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
			//存储需要修改的gis_id，修改坐标的时候用到
			if ($('#selected_gis_name_str').length < 1) {
				$('body').append('<input type="hidden" id="selected_gis_name_str" />');
			}
			$('#selected_gis_id_str').val(idArr.join(','));
			$('#selected_gis_name_str').val(nameArr.join(','));
			if (regionSelectMultiple == false) {

				if ($('#bd_map_gisId').length > 0) {
					$('#bd_map_gisId').val(idArr[idArr.length - 1]);
				}
			}
			callbackFun2(idArr, nameArr);
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
	console.log($('#selected_gis_id_str'));
	//将隐藏域的gis_id添加到已选择列表
	if ($('#selected_gis_name_str').length > 0) {
		var gis_id_arr = $('#selected_gis_id_str').val().split(',');
		var gis_name_arr = $('#selected_gis_name_str').val().split(',');
		$.each(gis_id_arr, function (k, v) {
			addSelect(v, gis_name_arr[k], callbackFun);
		});
	}
	// else {
	// 	addSelect($('#selected_gis_id_str').val(), $('#selected_gis_id_str').val(), callbackFun);
	// }
}

//添加区域事件
function addSelect(id, name, callback) {
	var callback = callback || function () {};
	if (id == '无' || id == 0) {
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
	if ($('#selected_gis_id_str').val() != '') {
		var id_arr = $('#selected_gis_id_str').val().split(',');
		var name_arr = $('#selected_gis_name_str').val().split(',');
		var k = $.inArray(id, id_arr);
		id_arr.splice(k, 1);
		name_arr.splice(k, 1);
		if (id_arr.length > 0) {
			$('#selected_gis_id_str').val(id_arr.join(','));
			$('#selected_gis_name_str').val(name_arr.join(','));
		} else {
			$('#selected_gis_id_str').val('');
			$('#selected_gis_name_str').val('');
		}
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
function bd_point_get(gis_id, x, y, callback) {
	if ($('#bd_map_x_y').length < 1) {
		$('body').append('<input type="hidden" id="bd_map_x_y" />'); //坐标
		$('body').append('<input type="hidden" id="bd_map_gisId" />'); //点击区域时需要更改的gis_id
		$('body').append('<input type="hidden" id="selected_gis_id_str" />'); //选择后点击确认才更改的gis_id
		$('#bd_map_x_y').val(x + ',' + y);
	} else {
		if ($('#bd_map_x_y').val() != '') {
			var xy = $('#bd_map_x_y').val().split(',');
			x = xy[0];
			y = xy[1];
		}
	}
	$('#bd_map_gisId').val(gis_id);
	$('#selected_gis_id_str').val(gis_id);
	layer.open({
		type: 1,
		title: '坐标拾取',
		skin: 'layui-layer-rim', //加上边框
		area: ['620px', '560px'], //宽高
		btn: ['确定'],
		// content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
		content: '<div style="text-align:center;padding:10px 0;"><!--<input type="text" class="input input-smal" style="width:120px;display:inline-block;margin-right:8px;">--><button class="button bg-sub button-small" id="region-location" style="margin-right:10px;">区域定位</button><span style="margin-right:10px;font-size:0.9em">单击地图区域获取坐标</span>X：<input type="text" id="res-x" class="input input-smal" style="width:120px;display:inline-block;margin-right:8px;">Y：<input type="text" class="input input-smal"  id="res-y" style="width:120px;display:inline-block;margin-right:8px;"><div id="getPointMap" style="height:360px;margin-top:10px;width:100%;"></div></div><script>showMap(' + x + ',' + y + ');</script>',
		yes: function (i) {
			$('#bd_map_x_y').val($('#res-x').val() + ',' + $('#res-y').val());
			callback($('#res-x').val(), $('#res-y').val(), $('#bd_map_gisId').val());
			//保存区域坐标
			save_region_x_y();
			layer.close(i);
		},
		btn2: function (i) {

		},
		end: function () {}
	});
}
//修改区域的坐标
function save_region_x_y() {
	var x = y = '';
	var gis_id = 0;
	if ($('#bd_map_x_y').length > 0) {
		if ($('#bd_map_x_y').val() != '') {
			var xy = $('#bd_map_x_y').val().split(',');
			x = xy[0];
			y = xy[1];
		}
		gis_id = $('#bd_map_gisId').val();
		if (gis_id == 0) {
			// layer.alert('未选择区域，请在选择区域中单击选择一个区域');
			return false;
		}
		$.ajax({
			type: 'post',
			url: weburl + 'index.php/pointManage/save_region_x_y',
			data: {
				gis_id: gis_id,
				x: x,
				y: y
			},
			success: function (data) {
				if (data == '1') {
					layer.alert('区域坐标更新成功');
				} else {
					layer.alert('区域坐标更新失败');
				}
			}
		});
	}
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
		selectRegion(false,'', centerMap); //打开区域树形图
		//定位地图
		function centerMap(gisId, name) {
			console.log(typeof gisId);
			console.log(gisId);
			var gisId = gisId || ''; //通过gis_id定位
			if (typeof gisId == 'object') {
				gisId = gisId[gisId.length - 1];
			}
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
					} else {
						var point = new BMap.Point(data.x, data.y);
						x = data.x;
						y = data.y;
						$('#res-x').val(x);
						$('#res-y').val(y);
						map.centerAndZoom(point, 14);
						var marker = new BMap.Marker(point); // 创建标注  
						map.clearOverlays(); //清除覆盖物 
						map.addOverlay(marker); // 将标注添加到地图中
					}
				}
			});
		}
	});
}
//网格员、调解员选择
function select_wgy_tjy(p_type, multiple, callbackFun, callbackFun2) { //点击回调，确认回调
	var zTree;
	var demoIframe;
	regionSelectMultiple = multiple || true; //默认多选
	var callbackFun = callbackFun || function () {
		// console.log('未定义回调方法')
	};
	var callbackFun2 = callbackFun2 || function () {
		// console.log('未定义回调方法2')
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
		content: '<div class="panel" style="height:450px;overflow:hidden;">' +
			'<div class="panel-body" style="height:430px;box-sizing:border-box;overflow:hidden;">' +
			'<div id="treeDemo" style="width:200px;height:100%;overflow:auto;border-right:1px solid gray;display:inline-block;" class="ztree"></div>' +
			'<div style="width:56%;height:100%;display:inline-block;vertical-align:top;padding:0 10px">' +
			'<p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">单击选择</p><div class="select-list" style="height:218px;overflow:auto;"></div><p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">已选择</p><div id="p-selected-list" class="list-link" style="height:107px;overflow:auto;"></div></div> </div></div>',
		yes: function (i) {
			callbackFun2();
			layer.close(i);
		},
		end: function () {}
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
//选择人员单击已选择列表
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
