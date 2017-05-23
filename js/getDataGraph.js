$(function () {

})
//获取地图区域案件数量
var regionJsonObj = {};

// function getregion_tc(argument) {
// 	$.ajax({
// 		type: 'post',
// 		url: weburl + 'index.php/welcome/getRegionData',
// 		dataType: 'json',
// 		async: false, //设置为同步操作就可以给全局变量赋值成功
// 		success: function (data) {
// 			regionJsonObj = data;
// 			console.log(data);
// 			//崇左地区以及非崇左地区案件数赋值
// 		},
// 		error: function (XMLHttpRequest, textStatus, errorThrown) {
// 			console.log(XMLHttpRequest + ';' + errorThrown);
// 		}
// 	});
// }
//获取该地区案件信息
// var region_data = {}; //该地区未结案件数
// var region_point = {}; //区域（右侧）坐标
var region_address = {}; //该地区所有未结案件详细信息，包含地址、坐标、以及案件信息
// var region_repeat_data = {};
// function getregion_data(region) {
//     $.ajax({
//         type: 'post',
//         url: weburl + 'index.php/welcome/getOneRegionData',
//         data: { 'r_id': region },
//         dataType: 'json',
//         async: false, //设置为同步操作就可以给全局变量赋值成功
//         success: function(data) {
//             region_data = data.region_data;
//             region_point = data.point;
//             region_address = data.address;
//             console.log(data);
//             // region_repeat_data = data.repeat_region_data;
//         },
//         error: function(XMLHttpRequest, textStatus, errorThrown) {
//             console.log(XMLHttpRequest + ';' + errorThrown);
//         }
//     });
// }
function getregion_data(fjm) {
		var deferred = $.Deferred();
		$.ajax({
			type: 'post',
			url: weburl + 'index.php/welcome/getOneRData',
			data: {
				'fjm': fjm
			},
			dataType: 'json',
			// async: false, //设置为同步操作就可以给全局变量赋值成功
			success: function (data) {
				deferred.resolve(data);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest + ';' + errorThrown);
			}
		});
		return deferred.promise();
	// setTimeout(layer.close(i),2000);
	// var t=setTimeout("layer.closeAll()",2000);
}
// getregion_data('K00');

function getRdataById(fjm, aj_type, aj_id) {
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/getRdataById',
		data: {
			'fjm': fjm,
			'aj_type': aj_type,
			'aj_id': aj_id
		},
		dataType: 'json',
		async: false, //设置为同步操作就可以给全局变量赋值成功
		success: function (data) {
			// region_data = data.region_data;
			// region_point = data.point;
			region_address = data;
			// region_repeat_data = data.repeat_region_data;
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest + ';' + errorThrown);
		}
	});
}
//获取非崇左区域案件信息
// var unthis_area_data = {};

// function getunthis_area_data(argument) {
// 	$.ajax({
// 		type: 'post',
// 		url: weburl + 'index.php/welcome/getUnthisArea',
// 		data: {
// 			'gettype': 'getunthis_area'
// 		},
// 		dataType: 'json',
// 		async: false,
// 		success: function (data) {
// 			unthis_area_data = data;
// 		},
// 		error: function (XMLHttpRequest, textStatus, errorThrown) {
// 			console.log(XMLHttpRequest + ';' + errorThrown);
// 		}
// 	});

// }
// 各个法院的诉讼案件数好执行案件数
var sp_zx_obj = {};

function get_sp_zx_num() {
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/getSpZxNum',
		data: {

		},
		dataType: 'json',
		async: false,
		success: function (data) {
			sp_zx_obj = data;
			//区域案件数对象
			regionJsonObj.cz_jz = 0;
			$.each(data, function (k, v) {
				if (k != 'K60') {
					regionJsonObj[fjmToRid(k)] = v.sp;
					regionJsonObj[fjmToRid(k)] += v.zx;
				} else {
					regionJsonObj.cz_jz += v.sp;
					regionJsonObj.cz_jz += v.zx;
				}
			});

			// console.log(regionJsonObj);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest + ';' + errorThrown);
		}
	});
}
