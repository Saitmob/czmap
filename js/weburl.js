var weburl = 'http://147.1.7.45/czmapgit/';
// var weburl = 'http://qxp.tunnel.2bdata.com/czmapn/';
// var weburl = 'http://192.168.118.68/czmapn/';
var CONNECT_ERROR = 0;
$(function () {

	//请求超时
	$(document).ajaxSend(function (event, jqxhr, settings) {});
	$(document).ajaxError(function () {
		// if (CONNECT_ERROR == 0) {
		// 	// alert('与服务器断开连接');
		// 	// document.write('请求超时，与服务器断开连接');
		// 	CONNECT_ERROR = 1;
		// }
		// return false;
	});
	

	//头部
	var header_str = '<span class="title"></span>' +
		'<div class="user-box" style="display:inline-block;">' +
		'<div>欢迎：<span class="user-name">...</span></div>' +
		'<div class="logout"><a href="' + weburl + 'index.php/welcome/logout">退出</a></div>' +
		'</div>' +
		'<div class="manager-entrance">' +
		'<ul>' +
		'<li class="header-nav"><a href="' + weburl + 'index.php/welcome/personManage">人员管理</a> </li>' +
		'<li class="nav-fgx"></li>' +
		'<li class="header-nav"><a href="' + weburl + 'index.php/welcome/addNDelData">案件数据管理</a></li>' +
		'<li class="nav-fgx"></li>' +
		'<li class="header-nav"><a href="' + weburl + 'index.php/call_record/">通话记录</a></li>' +
		'</ul>' +
		'</div>';
	$('.header').eq(0).append(header_str);
	$('.header-nav').hover(function () {
		$(this).addClass('active-nav');
		// $(this).find('a').css('color', '#117799');
	}, function () {
		$(this).removeClass('active-nav');
		// $(this).find('a').css('color', '#fff');
	});
	$('.header').find('.title').on('click', function () {
		window.location.href = weburl;
	});
	getUserInfo();
	validatorNum();
	//底部
	if (CONNECT_ERROR == 0) {
		$('body').append('<div class="footer"><p>友情链接：<a href="">门户系统</a> | <a href="">审判系统</a> | <a href="">执行系统</a></p><p>电话：0771-2478292</p></div>');
		resetFooter();
		window.onresize = function () {
			resetFooter();
		}
	}

});

function regionChange(region) {
	switch (region) {
		case '天等县':
			region = 'cz_td';
			break;
		case '大新县':
			region = 'cz_dx';
			break;
		case '龙州县':
			region = 'cz_lz';
			break;
		case '江州区':
			region = 'cz_jz';
			break;
		case '扶绥县':
			region = 'cz_fs';
			break;
		case '凭祥市':
			region = 'cz_px';
			break;
		case '宁明县':
			region = 'cz_nm';
			break;
		case 'cz_td':
			region = '天等县';
			break;
		case 'cz_dx':
			region = '大新县';
			break;
		case 'cz_lz':
			region = '龙州县';
			break;
		case 'cz_jz':
			region = '江州区';
			break;
		case 'cz_fs':
			region = '扶绥县';
			break;
		case 'cz_px':
			region = '凭祥市';
			break;
		case 'cz_nm':
			region = '宁明县';
			break;
	}
	return region;
}

function rIdToFjm(r_id) {
	switch (r_id) {
		case 'cz_td':
			r_id = 'K69';
			break;
		case 'cz_dx':
			r_id = 'K68';
			break;
		case 'cz_lz':
			r_id = 'K6B';
			break;
		case 'cz_jz':
			r_id = 'K60';
			break;
		case 'cz_fs':
			r_id = 'K6C';
			break;
		case 'cz_px':
			r_id = 'K61';
			break;
		case 'cz_nm':
			r_id = 'K6A';
			break;
	}
	return r_id;
}

function fjmToRid(fjm) {
	switch (fjm) {
		case 'K69':
			fjm = 'cz_td';
			break;
		case 'K68':
			fjm = 'cz_dx';
			break;
		case 'K6B':
			fjm = 'cz_lz';
			break;
		case 'K60':
			fjm = 'cz_jz';
			break;
		case 'K6C':
			fjm = 'cz_fs';
			break;
		case 'K61':
			fjm = 'cz_px';
			break;
		case 'K6A':
			fjm = 'cz_nm';
			break;
	}
	return fjm;
}

function fjmToName(fjm) {
	switch (fjm) {
		case 'K69':
			fjm = '天等县人民法院';
			break;
		case 'K68':
			fjm = '大新县人民法院';
			break;
		case 'K6B':
			fjm = '龙州县人民法院';
			break;
		case 'K67':
			fjm = '江州区人民法院';
			break;
		case 'K60':
			fjm = '崇左市中级人民法院';
			break;
		case 'K61':
			fjm = '凭祥市人民法院';
			break;
		case 'K6C':
			fjm = '扶绥县人民法院';
			break;
		case 'K6A':
			fjm = '宁明县人民法院';
			break;
	}
	return fjm;
}
var ryType = {
	'': 'yg',
	'原告': 'yg',
	'被告': 'bg',
	'被告人': 'bgr',
	'财产': 'cc',
	'上诉人': 'ssr',
	'被上诉人': 'bssr',
	'第三人': 'dsr',
	'申请执行人': 'sqzxr',
	'申请人': 'sqr',
	'被执行人': 'bzxr',
	'被执行第三人': 'bzxdsr',
	'yg': '原告',
	'bg': '被告',
	'bgr': '被告人',
	'cc': '财产',
	'ssr': '上诉人',
	'bssr': '被上诉人',
	'dsr': '第三人',
	'sqzxr': '申请执行人',
	'sqr': '申请人',
	'bzxr': '被执行人',
	'bzxdsr': '被执行第三人'
};


function resetFooter() {
	var bodyH = document.body.scrollHeight;
	// var height = document.body.scrollHeight;
	var height = window.screen.height;
	if (document.body.clientHeight - bodyH > 0) {
		$('.footer').css({
			'position': 'fixed',
			'bottom': '0'
		});
	} else {
		$('.footer').css({
			'position': 'static'
		});
	}
}
//单点登录用户信息
var userObj = {};

function getUserInfo() {
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/init',
		dataType: 'json',
		async: false,
		success: function (data) {
			userObj = data;
			console.log(data);
			$('.user-name').html(data.user_name);
		}
	});
}
//数字输入框验证
function validatorNum() {
	$.each($('.input-number'), function (k, v) {
		$(v).on('keydown', function (event) {
			v.value = v.value.replace(/[^0-9]/ig, '');
			if (event.keyCode == 38) v.value = parseInt(v.value) + 1;
			if (event.keyCode == 40) {
				v.value = parseInt(v.value) - 1;
				if (v.value < 1) {
					v.value = 1;
				}
			}
		});
		$(v).on('blur', function () {
			v.value = v.value.replace(/[^0-9]/ig, '');
		});
	})

}
