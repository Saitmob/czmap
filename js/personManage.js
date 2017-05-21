var person_list_data_model;
$(function () {
	person_list_data_model = $("#person-list-data").html();
	show_list("all", "all", "", 1, 8);
	$("#excelFile").click(function () {
		console.log(1111);
		MyUploadexl.request({
			id: "#excelFile",
			singleFileUploads: true,
			postfix: 'doc,docx,xlsx,xls,png,jpg,jpeg,gif',
			myData: { folder: 'project', 's_id': 0 }
		}, function (data) {
		}, function (data) {
			if (data.result != 1) {
				layer.msg("上传exl失败");
			}
			else {
				layer.msg("上传exl成功");
			}
		});
	});
	showPersonNum();
	//添加人员按钮
	$('#add-person-btn').on('click', function () {

		addPersonClick();
	});
	//选择所属区域
	$('.editor-select-region').on('click', function () {
		selectRegion();
	});
	//保存人员信息
	$('.ry-save-btn').on('click', function () {
		savePersonInfo();
		return false; //防止提交表单
	});
	//查询
	$('#search-person-btn').on('click', function () {
		var range = regionChange($("#person-region-select option:selected").val());
		var persontype = $("#person-type-select option:selected").val();
		var name = $("#search-person-text").val();
		if (name == '') {
			layer.alert('查询名称不能为空');
		} else {
			show_list(range, persontype, name, 1, 8);
		}

	})

	//区域查询
	$("#person-region-select").change(function () {
		var range = regionChange($("#person-region-select option:selected").val());
		var persontype = $("#person-type-select option:selected").val();
		var name = $("#search-person-text").val();
		show_list(range, persontype, name, 1, 8);
	});

	//人员类型查询
	$("#person-type-select").change(function () {
		var range = regionChange($("#person-region-select option:selected").val());
		var persontype = $("#person-type-select option:selected").val();
		var name = $("#search-person-text").val();
		show_list(range, persontype, name, 1, 8);
	});
});

function show_list(range, persontype, name, cur_page, per_page_num)//区域，人员类型，人员名称，第几页，一页几行
{
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/personManage/show_list',
		data: {
			'range': range,
			'persontype': persontype,
			'name': name,
			'cur_page': cur_page,
			'per_page_num': per_page_num
		},
		dataType: "json",
		success: function (data) {
			$("#person-list-data").html("");
			if (data.result.length > 0) {
				$.each(data.result, function (k, v) {
					$("#person-list-data").append(person_list_data_model);
					$(".list-tr:last").find(".ry-option-list-btn").data("id",v.id);
					$(".list-tr:last").find(".list-item-name").html(v.name);
					$(".list-tr:last").find(".list-item-sex").html(v.sex);
					$(".list-tr:last").find(".list-item-age").html(v.csny);
					$(".list-tr:last").find(".list-item-duty").html(v.rybs);
					$(".list-tr:last").find(".list-item-region").html(v.address);
					$(".list-tr:last").find(".list-item-phone").html(v.phone);
				});
				var page_num = parseInt(data.page_num);
				laypage({
					cont: 'my_list_page',
					curr: cur_page,
					pages: Math.ceil(page_num / per_page_num),
					jump: function (obj, first) {
						if (!first) {
							var range = regionChange($("#person-region-select option:selected").val());
							var persontype = $("#person-type-select option:selected").val();
							var name = $("#search-person-text").val();
							show_list(range, persontype, name, obj.curr, per_page_num)
							/*showList(obj.curr);*/
						}
					}
				});
			}
			else {
				layer.msg("查不到相关内容");
			}
		}
	});
}

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
	$('.ry-id').val('');
	$('.ry-photoId').val('');
	//编辑页赋值
	$('.editor-name').val('');
	$('.editor-sex').val('');
	$('.editor-age').val('');
	$('.editor-duty').val('');
	// $('#editor-region').val('cz_td');
	$('.editor-phone').val('');
	$('.editor-email').val('');
	$('.editor-intro').val('');
	$('.editor-region-selected-list').html('');

	var pId = $(ele).data("id");
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

	showPersonInfoPanel(pId);
	$(".layui-layer-content .editor-name").val(name);
	$(".layui-layer-content .editor-sex:selected").val(sex);
	$(".layui-layer-content .editor-age").val(age);
	$(".layui-layer-content .editor-duty:selected").val(duty);
	$(".layui-layer-content .editor-region").val(region);
	$(".layui-layer-content .editor-phone").val(phone);
	$(".layui-layer-content .editor-email").val(email);
	//showRegion(gisId, region);
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
			// $('.layui-layer-content .editor-photo').html('<img src=\"\"/>');
			// $('.layui-layer-content .editor-photo').find('img').attr('src',data.photo);
			$('.layui-layer-content .editor-photo').css('background-image', 'url(' + weburl + data.photo + ')');
			$('.layui-layer-content .editor-photo').css('background-size', '100% 100%');
			$('.layui-layer-content .editor-photo').find('img').css('width', '100%');
			$('.layui-layer-content .editor-photo').find('img').css('height', '100%');
			if (data.gis_id != "") {
				$('.icon-map-marker').css('font-size', '12px');
				$('.layui-layer-content .editor-select-region t').html('修改区域');
				var name = data.gis_name.split(",")[0];
				console.log(data.gis_name);
				$('.layui-layer-content .icon-map-marker').html(name);
				$('.layui-layer-content .icon-map-marker').data('id', data.gis_id);
				$('.layui-layer-content .icon-map-marker').data('name', data.gis_name);
				$('.layui-layer-content .editor-select-region').unbind();
				$('.layui-layer-content .editor-select-region').on('mouseenter', function () {
					layer.tips(data.gis_name, '.layui-layer-content .editor-select-region', {
						tips: [1, '#3595CC'],
						time: 2000
					});
				});
			}
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
	var name = $('.layui-layer-content .editor-name').val(),
		email = $('.layui-layer-content .editor-email').val(),
		sex = $('.layui-layer-content .editor-sex').val(),
		age = $('.layui-layer-content .editor-age').val(),
		duty = $('.layui-layer-content .editor-duty').val(),
		phone = $('.layui-layer-content .editor-phone').val();
	var regionArr = [];
	var regionStr = '';
	var idstring = $('.layui-layer-content .icon-map-marker').data('id');
	console.log(idstring);
	if (idstring.length > 0) {
		idstring = idstring.substring(0, idstring.length - 1);
		var regionArr = idstring.split(',');
	}
	/*	$.each($('.layui-layer-content .editor-select-region').data, function (k, v) {
			regionArr.push($(v).attr('id').substr(14));
		});*/
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
			'email': email,
			'gis_id': regionStr,
			'name': name,
			'pId': $(".layui-layer-content .ry-save-btn").data('pId'),
			'photoId': $('.layui-layer-content .ry-photoId').val(),
			'photourl': $('.layui-layer-content .editor-photo').data('imageurl'),
			'phototype': $('.layui-layer-content .editor-photo').data('imagetype'),
			'sex': sex,
			'age': age,
			'duty': duty,
			'phone': phone,
			'intro': $('.layui-layer-content .editor-intro').val()
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

function showPersonInfoPanel(pId) {
	layer.open({
		type: 1,
		skin: 'layui-layer-lan',
		title: "编辑人员信息",
		area: ['500px', '600px'], //宽高
		//content: $("#editor-panel").prop("outerHTMl"), //捕获的元素
		content: $("#editor-panel").html(), //捕获的元素
		success: function () {
			$("body").off('click', '.ry-save-btn');
			$(".ry-save-btn").click(function () {
				savePersonInfo();
				return false; //防止提交表单
			});
			$("body").off('click', '.editor-select-region');
			$(".editor-select-region").click(function () {
				selectRegion(true, changeRangeText);
			});
			$(".layui-layer-content .file-upload-btn").click(function () {
				MyUpload.request({
					class: ".layui-layer-content .file-upload-btn",
					singleFileUploads: true,
					postfix: 'doc,docx,xlsx,xls,png,jpg,jpeg,gif',
					myData: { folder: 'project', 's_id': $(".layui-layer-content .ry-save-btn").val() }
				}, function (data) {
				}, function (data) {
					if (data.result != 1) {
						layer.msg("上传修改图片失败");
					}
					else {
						$('.layui-layer-content .editor-photo').css('background-image', 'url(' + weburl + data.filedir + ')');
						$('.layui-layer-content .editor-photo').css('background-size', '100% 100%');
						//$('.layui-layer-content .editor-photo').html('<img src=\"\"/>');
						//$('.layui-layer-content .editor-photo').find('img').attr('src',data.file);
						//$('.layui-layer-content .editor-photo').find('img').css('width','100%');
						//$('.layui-layer-content .editor-photo').find('img').css('height','100%');
						$('.layui-layer-content .editor-photo').data('imageurl', data.filedir);
						$('.layui-layer-content .editor-photo').data('imagename', data.filename);
						$('.layui-layer-content .editor-photo').data('imagetype', data.filetype);
					}
				});
			});
			$('.layui-layer-content .icon-map-marker').data('id', '');
			$('.layui-layer-content .icon-map-marker').data('name', '');
			$('.layui-layer-content .ry-save-btn').data('pId', pId);
		},
	});
}

function changeRangeText(id, name) {
	var idstring = $('.layui-layer-content .icon-map-marker').data('id');
	var namestring = $('.layui-layer-content .icon-map-marker').data('name');
	idstring += id + ',';
	namestring += name + ',';
	$('.layui-layer-content .icon-map-marker').data('name', namestring);
	$('.icon-map-marker').css('font-size', '12px');
	$('.layui-layer-content .editor-select-region t').html('修改区域');
	$('.layui-layer-content .icon-map-marker').html(name);
	$('.layui-layer-content .icon-map-marker').data('id', idstring);
	$('.layui-layer-content .icon-map-marker').data('name', namestring);
	$('.layui-layer-content .editor-select-region').unbind();
	$('.layui-layer-content .editor-select-region').on('mouseenter', function () {
		layer.tips(namestring, '.layui-layer-content .editor-select-region', {
			tips: [1, '#3595CC'],
			time: 2000
		});
	});
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
	showPersonInfoPanel("");

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


//人员信息编辑页展示区域信息
function showRegion(idStr, nameStr) {
	var idArr = idStr.split(',');
	var nameArr = nameStr.split(';');
	$.each(idArr, function (k, v) {
		addSelect(v, nameArr[k]);
	});
}


// ---------------新增--------
function show_person_list(cur_page, per_page_num, show_type, type_val) {
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
				str += "<tr><td class='list-item-name'>" + v.name + "</td><td class='list-item-sex'>" + ((v.sex == null || v.sex == undefined) ? '' : v.sex) + "</td><td class='list-item-age'>" + ((v.csny == null || v.csny == undefined) ? '' : v.csny) + "</td><td class='list-item-duty'>" + ((v.duty == null || v.duty == undefined) ? '' : v.duty) + "</td><td class='list-item-phone'>" + ((v.address == null || v.address == undefined) ? '' : v.address) + "</td><td class='list-item-email'>" + v.phone + "</td><td><button class='button bg-sub button-small ry-option-list-btn' onClick='editorPerson(this," + v.id + ")'>查看 / 编辑</button> <button class='button bg-red button-small ry-option-list-btn' onClick='deletePerson(" + v.id + ")'>删除</button><input type='hidden' class='list-item-pid' value='" + v.id + "'></td></tr>";
			});
			$('#person-list-data').html(str);
			laypage({
				cont: 'my_list_page',
				curr: cur_page,
				pages: Math.ceil(data.page_num / per_page_num),
				jump: function (obj, first) {
					if (!first) {
						show_person_list(show_type, type_val, obj.curr);
					}
				}
			});
		},
		error: function (a, b, c) {
			console.log(a);
		}
	});
}
