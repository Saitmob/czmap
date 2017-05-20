$(function () {
	// showList(1);
    show_person_list(1)
	// searchPerson();
	// laypage({
	//     cont: 'my_list_page',
	//     curr: 2,
	//     // pages: Math.ceil(parseInt($(".content").data("total_row")) / perPageNum),
	//     jump: function(obj, first) {
	//         if (!first) {
	//             showList(obj.curr);
	//         }
	//     }
	// });
	// laypage({
	//     cont: 'my_list_page', //容器。值支持id名、原生dom对象，jquery对象,
	//     pages: 100, //总页数
	//     // skin: 'yahei', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
	//     curr: 1,
	//     groups: 7 //连续显示分页数
	// });
	// pageNum = showPapeNum();
	showPersonNum();
	//添加人员按钮
	$('#add-person-btn').on('click', function () {

		addPersonClick();
	});
	//选择所属区域
	$('#editor-select-region').on('click', function () {
		selectRegion();
	});
	//保存人员信息
	$('#ry-save-btn').on('click', function () {
		savePersonInfo();
		return false; //防止提交表单
	});
	//查询
	$('#search-person-btn').on('click', function () {
		var user_name = $('#search-person-text').val();
		if (user_name == '') {
			layer.alert('查询名称不能为空');
		} else {
			searchPerson(user_name);
		}

	})
});

function deletePerson(id) {
	layer.confirm('是否确认删除该人员', function () {
		$.ajax({
			type: 'post',
			url: weburl + 'index.php/welcome/deletePerson',
			data: {
				'id': id
			},
			success: function (data) {
				if (data == 1) {
					layer.alert('删除成功');
				} else {
					layer.alert('删除失败');
				}
			}
		});
	});
}

function editorPerson(ele) {
	//隐藏域清空
	$('#ry-id').val('');
	$('#ry-photoId').val('');
	//编辑页赋值
	$('#editor-name').val('');
	$('#editor-sex').val('male');
	$('#editor-age').val('');
	$('#editor-duty').val('陪审员');
	// $('#editor-region').val('cz_td');
	$('#editor-phone').val('');
	$('#editor-email').val('');
	$('#editor-intro').val('');
	$('#editor-region-selected-list').html('');
	showPersonInfoPanel();
	var pId = $(ele).parent().find('.list-item-pid').val();
	var photoId = $(ele).parent().find('.list-item-photoId').val();
	var gisId = $(ele).parent().find('.list-item-gisId').val();
	var $p = $(ele).parent().parent();
	var name = $p.find('.list-item-name').text(),
		sex = $p.find('.list-item-sex').text(),
		age = $p.find('.list-item-age').text(),
		duty = $p.find('.list-item-duty').text(),
		region = $p.find('.list-item-region').text(),
		phone = $p.find('.list-item-phone').text(),
		email = $p.find('.list-item-email').text();
	// region = regionChange(region);
	switch (sex) {
		case '男':
			sex = 'male';
			break;
		case '女':
			sex = 'female';
			break;
		default:
			break;
	}
	//隐藏域赋值
	$('#ry-id').val(pId);
	$('#ry-photoId').val(photoId);
	//编辑页赋值
	$('#editor-name').val(name);
	$('#editor-sex').val(sex);
	$('#editor-age').val(age);
	$('#editor-duty').val(duty);
	$('#editor-phone').val(phone);
	$('#editor-email').val(email);
	showRegion(gisId, region);
	//获取照片以及简介
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/getPersonOtherInfo',
		data: {
			'pId': pId
		},
		dataType: 'json',
		success: function (data) {
			showPhoto(data.photo);
			$('#editor-intro').val(data.user_intro);
		}
	});
}

function showPhoto(file_path) {
	if (file_path == null) {
		$('#editor-photo').html('');
	} else {
		$('#editor-photo').html('<img src="' + weburl + file_path + '" style="max-width:100%;max-height:100%;vertical-align:middle;" alt="">');
	}
}

//保存人员信息
function savePersonInfo() {
	var name = $('#editor-name').val(),
		email = $('#editor-email').val(),
		sex = $('#editor-sex').val(),
		age = $('#editor-age').val(),
		duty = $('#editor-duty').val(),
		phone = $('#editor-phone').val();
	var regionArr = [];
	var regionStr = '';
	$.each($('#editor-region-selected-list').find('a[id^="editor_region_"]'), function (k, v) {
		regionArr.push($(v).attr('id').substr(14));
	});
	regionStr = regionArr.toString();
	if (name == '') {
		layer.alert('请填写姓名');
		return false;
	}
	// if (email == '') {
	//     layer.alert('请填写邮箱');
	//     return false;
	// }
	if (regionStr == '') {
		layer.alert('请填写所属区域');
		return false;
	}
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/savePersonInfo',
		data: {
			'email': $('#editor-email').val(),
			'gis_id': regionStr,
			'name': $('#editor-name').val(),
			'pId': $('#ry-id').val(),
			'photoId': $('#ry-photoId').val(),
			'sex': $('#editor-sex').val(),
			'age': $('#editor-age').val(),
			'duty': $('#editor-duty').val(),
			'phone': $('#editor-phone').val(),
			'intro': $('#editor-intro').val()
		},
		success: function (data) {
			if (data != 2 && data != 0) {
				layer.alert('插入成功');
				$('#ry-id').val(data),
					showList(1);
			} else if (data == 2) {
				layer.alert('修改成功');
			} else {
				layer.alert('操作失败');
			}
			// console.log(data);
		}
	})
}

function showPersonInfoPanel() {
	if ($('.editor-list').css('right') == '-500px') {
		$('.editor-list').animate({
			'right': '0'
		}, 300);
	} else {
		$('.editor-list').animate({
			'right': '-500px'
		}, 300, function () {
			$('.editor-list').animate({
				'right': '0'
			}, 300)
		});
	}
}

function addPersonClick() {
	//隐藏域清空
	$('#ry-id').val('');
	$('#ry-photoId').val('');
	//编辑页赋值
	$('#editor-name').val('');
	$('#editor-sex').val('male');
	$('#editor-age').val('');
	$('#editor-duty').val('陪审员');
	// $('#editor-region').val('cz_td');
	$('#editor-phone').val('');
	$('#editor-email').val('');
	$('#editor-intro').val('');
	$('#editor-region-selected-list').html('');
	showPersonInfoPanel();

	$('#editor-photo').html('');
}
//显示人员列表
function showList(page, searchType, typeVal, selectType1, selectVal1, selectType2, selectVal2) {
	var perPageNum = 8;
	var searchType = searchType || 'ALL';
	var typeVal = typeVal || '';
	var selectType1 = selectType1 || 'ALL';
	var selectVal1 = selectVal1 || '';
	var selectType2 = selectVal2 || 'ALL';
	var selectVal2 = selectVal2 || '';
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/showPersonList',
		data: {
			page: page,
			perPageNum: perPageNum,
			searchType: searchType,
			typeVal: typeVal
		},
		dataType: 'json',
		async: false,
		success: function (data) {
			var str = '';
			var pageNum = showPapeNum(searchType, typeVal);
			$.each(data, function (k, v) {
				str += "<tr><td class='list-item-name'>" + v.USER_NAME + "</td><td class='list-item-sex'>" + v.USER_SEX + "</td><td class='list-item-age'>" + v.USER_AGE + "</td><td class='list-item-duty'>" + v.USER_DUTY + "</td><td class='list-item-region'>" + v.ADDRESS + "</td><td class='list-item-phone'>" + v.USER_PHONE + "</td><td class='list-item-email'>" + v.USER_EMAIL + "</td><td><button class='button bg-sub button-small ry-option-list-btn' onClick='editorPerson(this)'>查看 / 编辑</button> <button class='button bg-red button-small ry-option-list-btn' onClick='deletePerson(" + v.ID + ")'>删除</button><input type='hidden' class='list-item-pid' value='" + v.ID + "'><input type='hidden' class='list-item-photoId' value='" + v.PHOTO_ID + "'><input type='hidden' class='list-item-gisId' value='" + v.GIS_ID + "'></td></tr>";
			});
			$('#person-list-data').html(str);
			laypage({
				cont: 'my_list_page',
				curr: page,
				pages: Math.ceil(pageNum / perPageNum),
				jump: function (obj, first) {
					if (!first) {
						showList(obj.curr);
					}
				}
			});
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}
//显示三个职位的人员数
function showPersonNum() {
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/showPersonNum',
		dataType: 'json',
		success: function (data) {
			$('#psy-num').html(data.psy);
			$('#zxy-num').html(data.zxy);
			$('#wgy-num').html(data.wgy);
		}
	});
}
//总页数
function showPapeNum(type, val) {
	var type = type || 'ALL';
	var val = val || 'ALL';
	var num = 0;
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/showPageNum',
		async: false,
		data: {
			type: type,
			val: val
		},
		success: function (data) {
			num = data;
		}
	});
	return num;
}
//查询人员
function searchPerson(user_name) {
	showList(1, 'USER_NAME', user_name);
}
//选择人员所属区域
function selectRegion() {
	var zTree;
	var demoIframe;

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
				var selectListDom = '<button  class="button bg-mix" id="need-select" onClick="addSelect(' + id + ',\'' + pArr_str + '\');" >' + pArr_str + '</button>';
				$('.select-list').html(selectListDom);
			}
		}
	};
	layer.open({
		type: 1,
		title: false,
		skin: 'layui-layer-rim', //加上边框
		area: ['540px', '440px'], //宽高
		btn: ['确定'],
		// content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
		content: '<div class="panel" style="height:374px;overflow:hidden;"><div class="panel-head">区域选择</div><div class="panel-body" style="height:330px;box-sizing:border-box;overflow:hidden;"><div id="treeDemo" style="width:200px;height:330px;overflow:auto;border-right:1px solid gray;display:inline-block;" class="ztree"></div><div style="width:56%;height:100%;display:inline-block;vertical-align:top;padding:0 10px"><p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">单击选择</p><div class="select-list" style="height:64px;"></div><p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">已选择</p><div id="region-selected-list" class="list-link" style="height:155px;overflow:auto;"></div></div> </div></div>',
		yes: function (i) {
			var idObjArr = $('#region-selected-list').find('a[id^="region_"]');
			var idArr = [];
			$.each(idObjArr, function (k, v) {
				var id = parseInt($(v).attr('id').substr(7));
				idArr.push(id);
			});
			layer.close(i);
		},
		end: function () {}
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
		error: function (a, b, c) {}
	});

}
//人员信息编辑页展示区域信息
function showRegion(idStr, nameStr) {
	var idArr = idStr.split(',');
	var nameArr = nameStr.split(';');
	$.each(idArr, function (k, v) {
		addSelect(v, nameArr[k]);
	});
}
//添加区域事件
function addSelect(id, name) {
	if (name == '无' || id == '') {
		return false;
	}
	var idName1 = 'region_';
	var idName2 = 'editor_region_';
	var str_1 = '<a href = "#" class="selectedRegion" id="';
	var str_2 = id + '" onmouseover="showDelBtn(this)" onmouseout="hideDelBtn(this)"> ' + name + '<span class="float-right tag bg-red" style="display:none;" onclick="deleteRegion(this,' + id + ')">删除</span> </a>';
	var str1 = str_1 + idName1 + str_2;
	var str2 = str_1 + idName2 + str_2;
	if ($('#editor_region_' + id).length > 0) {
		layer.alert('请勿重复添加');
		return false;
	}
	$('#region-selected-list').append(str1);
	$('#editor-region-selected-list').append(str2);
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
function deleteRegion(ele, id) {
	$(ele).parent().remove();
	if ($('#region_' + id).length > 0) {
		$('#region_' + id).remove();
	}
	if ($('#editor_region_' + id).length > 0) {
		$('#editor_region_' + id).remove();
	}
}

// ---------------新增--------
function show_person_list(cur_page, per_page_num,show_type, type_val) {
	var show_type = show_type || 'all';
	var type_val = type_val || 'all';
	var cur_page = cur_page || 1;
	var per_page_num = per_page_num || 8;
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/personManage/show_person_list',
		data: {
			show_type: show_type,
			type_val: type_val,
			cur_page: cur_page,
			per_page_num: per_page_num
		},
		dataType: 'json',
		success: function (data) {
			var str = '';
			$.each(data.result, function (k, v) {
				str += "<tr><td class='list-item-name'>" + v.name + "</td><td class='list-item-sex'>" + ((v.sex==null||v.sex==undefined)?'':v.sex) + "</td><td class='list-item-age'>" + ((v.csny==null||v.csny==undefined)?'':v.csny) + "</td><td class='list-item-duty'>" + ((v.duty==null||v.duty==undefined)?'':v.duty) + "</td><td class='list-item-phone'>" + ((v.address==null||v.address==undefined)?'':v.address) + "</td><td class='list-item-email'>" + v.phone + "</td><td><button class='button bg-sub button-small ry-option-list-btn' onClick='editorPerson(this,"+v.id+")'>查看 / 编辑</button> <button class='button bg-red button-small ry-option-list-btn' onClick='deletePerson(" + v.id + ")'>删除</button><input type='hidden' class='list-item-pid' value='" + v.id + "'></td></tr>";
			});
			$('#person-list-data').html(str);
			laypage({
				cont: 'my_list_page',
				curr: cur_page,
				pages: Math.ceil(data.page_num / per_page_num),
				jump: function (obj, first) {
					if (!first) {
						show_person_list(show_type, type_val,obj.curr);
					}
				}
			});
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}
