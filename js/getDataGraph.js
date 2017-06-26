//svg地图用于显示案件数对象
var regionJsonObj = {};
// }
//百度地图用于绘制坐标对象
var region_address = {}; 
// }
//获取整个法院的案件及坐标地址，此时由于标注点过多，绘制的时候会很慢，数据获取只需要零点几秒，dom结构的添加以及绘制可能要1-4s不等
function getregion_data(fjm) {
		var deferred = $.Deferred();
		$.ajax({
			type: 'post',
			url: weburl + 'index.php/welcome/getOneRData',
			data: {
				'fjm': fjm
			},
			dataType: 'json',
			success: function (data) {
				deferred.resolve(data);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest + ';' + errorThrown);
			}
		});
		return deferred.promise();
}
// getregion_data('K00');
//获取单个案件的坐标数据
function getRdataById(fjm, aj_type, aj_bs) {
	var deferred = $.Deferred();
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/welcome/getRdataById',
		data: {
			'fjm': fjm,
			'aj_type': aj_type,
			'aj_id': aj_bs
		},
		dataType: 'json',
		success: function (data) {
			deferred.resolve(data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(XMLHttpRequest + ';' + errorThrown);
		}
	});
	return deferred.promise();
}
// 各个法院的诉讼案件数好执行案件数
var sp_zx_obj = {};

function get_sp_zx_num() {
	//10号演示写死的数据，过后请取消下面注释
	sp_zx_obj = {
		K6A:{sp:366,zx:83},
		K6B:{sp:341,zx:53},
		K6C:{sp:547,zx:173},
		K60:{sp:336,zx:30},
		K61:{sp:401,zx:185},
		K67:{sp:495,zx:284},
		K68:{sp:197,zx:72},
		K69:{sp:219,zx:41}
	};
	regionJsonObj ={
		cz_nm:366+83,
		cz_lz:341+53,
		cz_fs:547+173,
		cz_jz2:336+30,
		cz_px:401+185,
		cz_jz:495+284,
		cz_dx:197+72,
		cz_td:219+41
	}
	// $.ajax({
	// 	type: 'post',
	// 	url: weburl + 'index.php/welcome/getSpZxNum',
	// 	data: {

	// 	},
	// 	dataType: 'json',
	// 	async: false,
	// 	success: function (data) {
	// 		sp_zx_obj = data;
	// 		//区域案件数对象
	// 		console.log(data);
	// 		regionJsonObj.cz_jz = 0;
	// 		$.each(data, function (k, v) {
	// 			if (k != 'K60'&&k!='K67') {
	// 				regionJsonObj[fjmToRid(k)] = v.sp;
	// 				regionJsonObj[fjmToRid(k)] += v.zx;
	// 			} else if(k=='K60') {
	// 				regionJsonObj.cz_jz2 = v.sp;
	// 				regionJsonObj.cz_jz2 += v.zx;
	// 			}else if(k=='K67'){
	// 				regionJsonObj.cz_jz = v.sp;
	// 				regionJsonObj.cz_jz += v.zx;
	// 			}
	// 		});

	// 		console.log(regionJsonObj);
	// 	},
	// 	error: function (XMLHttpRequest, textStatus, errorThrown) {
	// 		console.log(XMLHttpRequest + ';' + errorThrown);
	// 	}
	// });
}
