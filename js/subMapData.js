function initMap(fjm, i) {
	if (i == 1) { //“地图”选项卡下的地图
		getregion_data(fjm); //获取该区域案件信息
		map_box_aj_num();
		set_map_box_dsrnum();
	}

	createMap(i); //创建地图
	setMapEvent(); //设置地图事件
	creatDataInfo();
	//显示地区
	// var address = region_point.R_NAME;
	// $('#address').html(address);


}



//创建地图函数：
function createMap(i) {
	var map = new BMap.Map("dituContent" + i, {
		minZoom: 9,
		maxZoom: 16
	}); //在百度地图容器中创建一个地图

	// 创建地理编码实例
	// var myGeo = new BMap.Geocoder();
	// 根据坐标得到地址描述
	// console.log(myGeo);
	// myGeo.getLocation(new BMap.Point(107.146577, 23.089894), function(result) {
	//     console.log(result);
	//     if (result) {
	//         alert(result.address);
	//     }
	// });
	// map.addEventListener("click", function(e) {
	//     alert(e.point.lng + ", " + e.point.lat);
	// });
	var point = new BMap.Point(region_address.REGION_POINT.x, region_address.REGION_POINT.y); //定义一个中心点坐标
	map.centerAndZoom(point, 11); //设定地图的中心点和坐标并将地图显示在地图容器中
	window.map = map; //将map变量存储在全局
	window.map.clearOverlays();
}

//地图事件设置函数：
function setMapEvent() {
	// map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
	map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
	// map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
	map.enableKeyboard(); //启用键盘上下左右键移动地图
}
var opts = {
	width: 600, // 信息窗口宽度
	height: 240, // 信息窗口高度
	title: "<font color='red'>案件信息</font>", // 信息窗口标题
	enableMessage: true, //设置允许信息窗发送短息
	message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
}


// function creatDataInfo() {
//     for (var i = 0; i < region_address.length; i++) {
//         var point = new BMap.Point(region_address[i].POINT_X, region_address[i].POINT_Y);
//         var content = region_address[i].detail_info;
//         //var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
//         var marker = new BMap.Marker(point); // 创建标注   
//         map.addOverlay(marker); // 将标注添加到地图中
//         addClickHandler(content, marker, point);
//         var wjadata = (region_address[i].case_num != undefined) ? region_address[i].case_num : '未录入未结案数据';
//         var label = new BMap.Label("<p style='height:10px;line-height:10px;padding:0 5px;'>" + wjadata + "</p>", { offset: new BMap.Size(20, -40) }); //offset设置偏移量
//         marker.setLabel(label);
//     }


// }
function creatDataInfo() {
	// 获取默认图标的阴影
	var marker = new BMap.Marker(new BMap.Point(region_address.REGION_POINT.x, region_address.REGION_POINT.y)); // 创建标注   
	var shadow = marker.getShadow();
	shadow.imageOffset.height = -13;
	shadow.imageOffset.width = -22;
	shadow.anchor.height = 0;
	shadow.anchor.width = 0;
	shadow.size.height = 40;
	shadow.size.width = 40;
	var region_arr = [];
	if (region_address.SP.ADDRESS != undefined && region_address.SP.ADDRESS.length > 0) {
		$.each(region_address.SP.ADDRESS, function (k, v) {
			region_arr.push(v);
		});
	}
	if (region_address.ZX.ADDRESS != undefined) {
		$.each(region_address.ZX.ADDRESS, function (k, v) {
			region_arr.push(v);
		});
	}
	var points = [];
	var points_str = [];
	var noPoint = '';
	console.log(region_arr);
	if (region_arr.length > 0) { //如果地点大于0
		$.each(region_arr, function (k, v) {
			if (v.POINT.x != undefined && v.POINT.y != undefined) {
				// xx先判断坐标是否重复，重复则做偏移处理
				var point = new BMap.Point(v.POINT.x, v.POINT.y);
				var point_str = v.POINT.x+','+v.POINT.y;
				if($.inArray(point_str,points_str)!=-1){
					point = new BMap.Point(parseFloat(v.POINT.x)+0.0007, parseFloat(v.POINT.y)+0.0003);
					console.log(point);
					point_str = parseFloat(v.POINT.x)+0.0007+','+parseFloat(v.POINT.y)+0.0003;
				}
				points.push(point);
				points_str.push(point_str);
				var content = "地址："+v.ADD_NAME+"<br>"+v.BZ_INFO+v.BZ_BOTTOM;
				var iconUrl = '';
				var size = new BMap.Size(20, 24);
				if (v.ADD_TYPE == '原告') {
					iconUrl = 'images/yg_bz.png';
				} else if (v.ADD_TYPE == '被告') {
					iconUrl = 'images/bg_bz.png';
				} else if (v.ADD_TYPE == '财产') {
					iconUrl = 'images/cc_bz_n.png';
					var size = new BMap.Size(30, 30);
				} else if (v.ADD_TYPE == '上诉人') {
					iconUrl = 'images/ssr_bz.png';
				} else if (v.ADD_TYPE == '被上诉人') {
					iconUrl = 'images/bssr_bz.png';
				} else if (v.ADD_TYPE == '申请执行人') {
					iconUrl = 'images/sqzxr_bz.png';
				} else if (v.ADD_TYPE == '被执行人') {
					iconUrl = 'images/bzxr_bz.png';
				} else if (v.ADD_TYPE == '第三人') {
					iconUrl = 'images/dsr_bz.png';
				}
				// var myIcon = new BMap.Icon(iconUrl, new BMap.Size(40,40),{imageOffset:new BMap.Size(100, 40) });
				var myIcon = new BMap.Icon(iconUrl, size);
				var marker = new BMap.Marker(point, {
					icon: myIcon
				}); // 创建标注
				marker.setShadow(shadow);
				map.addOverlay(marker); // 将标注添加到地图中
				addClickHandler(content, marker, point);
				var ssdw = v.ADD_TYPE;
				var label = new BMap.Label("<p style='height:16px;line-height:13px;padding:3px 5px;margin-bottom:0;'>" + ssdw + "</p>", {
					offset: new BMap.Size(20, -15)
				}); //offset设置偏移量
				marker.setLabel(label);
			} else {
				noPoint += v.NAME + '、';

			}

			// var wjadata = (region_address[i].case_num != undefined) ? region_address[i].case_num : '未录入未结案数据';
			// var label = new BMap.Label("<p style='height:10px;line-height:10px;padding:0 5px;'>" + wjadata + "</p>", { offset: new BMap.Size(20, -40) }); //offset设置偏移量
			// marker.setLabel(label);
		});
		if (points.length > 0) {
			var view = map.getViewport(eval(points));
			var mapZoom = view.zoom;
			var centerPoint = view.center;
			map.centerAndZoom(centerPoint, mapZoom);
		}
		if (noPoint.length > 0) {
			layer.alert(noPoint + '无法定位到地图中');
		}
		console.log(points_str);
	} else {
		layer.alert('没有地点可展示');
	}

}

function addClickHandler(content, marker, point) {
	marker.addEventListener("click", function () {
		openInfo(content, point)
	});
}

function openInfo(content, point) {
	//这里可以判断content字节数来修改info窗口的宽高来实现“自适应”
	var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
	map.openInfoWindow(infoWindow, point); //开启信息窗口
}

function map_box_aj_num() {
	// 显示诉讼案件数以及执行案件数和坐标数
	$('#mapbox-spaj-num').html(region_address.SP.AJ_NUM);
	$('#mapbox-zxaj-num').html(region_address.ZX.AJ_NUM);
	$('#mapbox-sppoint-num').html(region_address.SP.AJ_P_NUM);
	$('#mapbox-zxpoint-num').html(region_address.ZX.AJ_P_NUM);
}
//当事人以及财产地址数
function set_map_box_dsrnum() {
	var yg_num = 0;
	var bg_num = 0;
	var cc_num = 0;
	var ssr_num = 0;
	var bssr_num = 0;
	var dsr_num = 0;
	var sqzxr_num = 0;
	var bzxr_num = 0;
	$.each(region_address.SP.ADDRESS, function (k, v) {
		if (v.ADD_TYPE == '原告') {
			yg_num++;
		} else if (v.ADD_TYPE == '被告') {
			bg_num++;
		} else if (v.ADD_TYPE == '财产') {
			cc_num++;
		} else if (v.ADD_TYPE == '上诉人') {
			ssr_num++;
		} else if (v.ADD_TYPE == '被上诉人') {
			bssr_num++;
		} else if (v.ADD_TYPE == '第三人') {
			dsr_num++;
		} else if (v.ADD_TYPE == '申请执行人') {
			sqzxr_num++;
		} else if (v.ADD_TYPE == '被执行人') {
			bzxr_num++;
		}
	});
	$.each(region_address.ZX.ADDRESS, function (k, v) {
		if (v.ADD_TYPE == '原告') {
			yg_num++;
		} else if (v.ADD_TYPE == '被告') {
			bg_num++;
		} else if (v.ADD_TYPE == '财产') {
			cc_num++;
		} else if (v.ADD_TYPE == '上诉人') {
			ssr_num++;
		} else if (v.ADD_TYPE == '被上诉人') {
			bssr_num++;
		} else if (v.ADD_TYPE == '第三人') {
			dsr_num++;
		} else if (v.ADD_TYPE == '申请执行人') {
			sqzxr_num++;
		} else if (v.ADD_TYPE == '被执行人') {
			bzxr_num++;
		}
	});
	$('#map-box-yg-num').html(yg_num);
	$('#map-box-bg-num').html(bg_num);
	$('#map-box-cc-num').html(cc_num);
	$('#map-box-ssr-num').html(ssr_num);
	$('#map-box-bssr-num').html(bssr_num);
	$('#map-box-dsr-num').html(dsr_num);
	$('#map-box-sqzxr-num').html(sqzxr_num);
	$('#map-box-bzxr-num').html(bzxr_num);
}
