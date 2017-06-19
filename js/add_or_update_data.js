	// 旧的案件管理
	$(function () {
		// console.log(saveSpAjDetail(ahStrReplace('(2016)桂刑终100号')));
		// console.log(getYearByAH(ahStrReplace(' aa 测试（213)哈哈523')));
		show_case_list(1);
		var region = $('#region');
		var address = $('#address');
		var point_x = $('#point_x');
		var point_y = $('#point_y');
		var court_name = $('#court_name');
		var an_hao = $('#an_hao');
		var case_type = $('#case_type');
		var li_an_date = $('#li_an_date');
		// var an_you = $('#an_you');
		var bzxr = $('#bzxr');
		var bd = $('#bd');
		var this_area = $('#this_area');
		var note = $('#note');

		var submitBtn = $('#submit');
		var searchBtn = $('#search-btn');
		var deleteBtn = $('#delete');
		//区域选择
		$('#select-region').on('click', function () {
			selectRegion();
			return false;
		});
		submitBtn.on('click', function () {
			// alert(region[0].value);
			// region[0].value = 'cz_jz';
			var data = {};
			if (!checkFormData(this_area)) { //验证不通过
				// data.R_NAME = regionChange(data.R_ID);
				return false;
			}
			data.THIS_AREA = this_area.val();
			if (data.THIS_AREA == 1) {
				data.GIS_ID = $('#editor-region-selected-list').find('a[id^="editor_region_"]').eq(0).attr('id').substr(14);
				data.POINT_X = point_x.val();
				// console.log(data.POINT_X);
				data.POINT_Y = point_y.val();
			}
			data.ADDRESS = address.val();
			data.COURT_NAME = court_name.val();
			data.DO_AH = ahStrReplace(an_hao.val());
			data.CASE_TYPE = parseInt(case_type.val());
			data.LA_DATE = li_an_date.val();
			// data.AN_REASON = an_you.val();
			data.BZXR_NAME = bzxr.val();
			data.BD = bd.val();
			data.NOTE = note.val();
			if (data.NOTE == '') {
				data.NOTE = '无备注';
			}
			if (data.CASE_TYPE == 1 || data.CASE_TYPE == '1') {
				saveSpAjDetail(data);
			} else {
				if (saveZxAjDetail(data) == false) return false;
			}

			// add_or_update(data);
		});

		searchBtn.bind('click', function () {
			var anhao = searchBtn.prev().val();
			var data = search_data(anhao); //通过案号搜索得到数据
			region.val(data.R_ID);
			address.val(data.ADDRESS);
			point_x.val(data.POINT_X);
			point_y.val(data.POINT_Y);
			court_name.val(data.COURT_NAME);
			an_hao.val(data.DO_AH);
			li_an_date.val(data.LA_DATE);
			// an_you.val(data.AN_REASON);
			bzxr.val(data.BZXR_NAME);
			bd.val(data.BD);
			this_area.val(data.THIS_AREA);
			note.val(data.NOTE);
			// console.log(typeof data.LA_DATE);
		});
		//编辑
		$('.case-editor').on('click', function () {
			var caseId = $(this).nextAll('input').val();
			show_editor_panel();
			var data = search_data(caseId, 'ID');
			region.val(data.R_ID);
			address.val(data.ADDRESS);
			point_x.val(data.POINT_X);
			point_y.val(data.POINT_Y);
			court_name.val(data.COURT_NAME);
			an_hao.val(data.DO_AH);
			li_an_date.val(data.LA_DATE);
			// an_you.val(data.AN_REASON);
			bzxr.val(data.BZXR_NAME);
			bd.val(data.BD);
			this_area.val(data.THIS_AREA);
			note.val(data.NOTE);
		});
		deleteBtn.on('click', function () {
			if (an_hao.val() != '') {
				layer.confirm('是否确认删除该案件信息', function () {
					deleteCase(an_hao.val());
				});
			} else {
				layer.alert('请提供要删除案件的案号');
			}

		});
		//百度坐标获取
		$('#map-point-get').on('click', function () {
			layer.open({
				type: 1,
				title: false,
				skin: 'layui-layer-rim', //加上边框
				area: ['620px', '490px'], //宽高
				btn: ['确定'],
				// content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
				content: '<div style="text-align:center;padding:10px 0;"><!--<input type="text" class="input input-smal" style="width:120px;display:inline-block;margin-right:8px;">--><button class="button bg-sub button-small" id="region-location" style="margin-right:10px;">区域定位</button><span style="margin-right:10px;font-size:0.9em">单击地图区域获取坐标</span>X：<input type="text" id="res-x" class="input input-smal" style="width:120px;display:inline-block;margin-right:8px;">Y：<input type="text" class="input input-smal"  id="res-y" style="width:120px;display:inline-block;margin-right:8px;"><div id="getPointMap" style="height:360px;margin-top:10px;width:100%;"></div></div><script>showMap();</script>',
				yes: function (i) {
					$('#point_x').val($('#res-x').val());
					$('#point_y').val($('#res-y').val());
					layer.close(i);
				},
				end: function () {}
			});
		});


		// editor point
		function editor_point(x,y){
			 	layer.open({
				type: 1,
				title: false,
				skin: 'layui-layer-rim', //加上边框
				area: ['620px', '490px'], //宽高
				btn: ['确定'],
				// content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
				content: '<div style="text-align:center;padding:10px 0;"><!--<input type="text" class="input input-smal" style="width:120px;display:inline-block;margin-right:8px;">--><button class="button bg-sub button-small" id="region-location" style="margin-right:10px;">区域定位</button><span style="margin-right:10px;font-size:0.9em">单击地图区域获取坐标</span>X：<input type="text" id="res-x" class="input input-smal" style="width:120px;display:inline-block;margin-right:8px;">Y：<input type="text" class="input input-smal"  id="res-y" style="width:120px;display:inline-block;margin-right:8px;"><div id="getPointMap" style="height:360px;margin-top:10px;width:100%;"></div></div><script>showMap('+x+','+y+');</script>',
				yes: function (i) {
					$('#point_x').val($('#res-x').val());
					$('#point_y').val($('#res-y').val());
					layer.close(i);
				},
				end: function () {}
			});
		}
	});
// $ end
	function search_data(val, type) {
		var type = type || 'AH';
		var case_data = {};
		$.ajax({
			type: 'post',
			url: weburl + 'index.php/welcome/searchCase',
			async: false,
			data: {
				'val': val,
				'type': type
			},
			dataType: 'json',
			success: function (data) {
				case_data.R_ID = data.R_ID;
				case_data.ADDRESS = data.ADDRESS;
				case_data.POINT_X = data.POINT_X;
				case_data.POINT_Y = data.POINT_Y;
				case_data.COURT_NAME = data.COURT_NAME;
				case_data.DO_AH = data.DO_AH;
				case_data.CASE_TYPE = data.CASE_TYPE;
				case_data.LA_DATE = data.LA_DATE;
				case_data.AN_REASON = data.AN_REASON;
				case_data.BZXR_NAME = data.BZXR_NAME;
				case_data.BD = data.BD;
				case_data.THIS_AREA = data.THIS_AREA;
				case_data.NOTE = data.NOTE;
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest + ';' + errorThrown);
			}
		});
		return case_data;
	}

	function add_or_update(data) {
		$.ajax({
			type: 'post',
			url: weburl + 'index.php/welcome/addOrUpdate',
			async: false,
			data: {
				'GIS_ID': data.GIS_ID,
				'R_NAME': data.R_NAME,
				'ADDRESS': data.ADDRESS,
				'POINT_X': data.POINT_X,
				'POINT_Y': data.POINT_Y,
				'COURT_NAME': data.COURT_NAME,
				'DO_AH': data.DO_AH,
				'CASE_TYPE': data.CASE_TYPE,
				'LA_DATE': data.LA_DATE,
				'AN_REASON': data.AN_REASON,
				'BZXR_NAME': data.BZXR_NAME,
				'BD': data.BD,
				'THIS_AREA': data.THIS_AREA,
				'NOTE': data.NOTE
			},
			// dataType:'json',
			success: function (data) {
				layer.alert(data);
			}
		});
	}
	//案号字符替换
	function ahStrReplace(an_hao) {
		an_hao = an_hao.replace(/\s+/g, '');
		an_hao = an_hao.replace(/\(/ig, '（').replace(/\)/ig, '）');
		return an_hao;
	}

	function getYearByAH(an_hao) {
		var year = an_hao.match(/[（]+[0-9]+[）]/ig);
		year = year[0].match(/[0-9]/ig);
		year = parseInt(year.join(''));
		return year;
	}
	//存储审判案件的案件详情
	function saveSpAjDetail(dataObj) {
		var an_hao = dataObj.DO_AH;
		$.base64.utf8encode = true;
		console.log(an_hao);
		var result;
		$.ajax({
			type: "get",
			url: "http://147.1.4.52:8090/case/ajxx",
			dataType: "jsonp",
			crossDomain: true,
			data: {
				"dm": userObj.court_dm,
				"year": getYearByAH(an_hao),
				"ah": $.base64.encode(an_hao)
			},
			success: function (data) {
				if (data != "") {
					var str = "";
					for (var i = 0; i < data.length; i++) {
						var ay = (data[i]['RX_AYMC'] == undefined) ? '' : data[i]['RX_AYMC'];
						$.ajax({
							type: "post",
							url: weburl + "index.php/caseDetail/insertSpAjDetail",
							data: {
								AH: an_hao,
								RX_HYTCRBS: (data[i]['RX_HYTCRBS'] == undefined) ? '' : data[i]['RX_HYTCRBS'],
								SSDW: (data[i]['SSDW'] == undefined) ? '' : data[i]['SSDW'],
								RX_FY: (data[i]['RX_FY'] == undefined) ? '' : data[i]['RX_FY'],
								RX_AJZT: (data[i]['RX_AJZT'] == undefined) ? '' : data[i]['RX_AJZT'],
								RX_AYMC: (data[i]['RX_AYMC'] == undefined) ? '' : data[i]['RX_AYMC'],
								RX_SJYBS: (data[i]['RX_SJYBS'] == undefined) ? '' : data[i]['RX_SJYBS'],
								RX_SJY: (data[i]['RX_SJY'] == undefined) ? '' : data[i]['RX_SJY'],
								RX_CBR: (data[i]['RX_CBR'] == undefined) ? '' : data[i]['RX_CBR'],
								RX_CBBMMC: (data[i]['RX_CBBMMC'] == undefined) ? '' : data[i]['RX_CBBMMC'],
								RX_HYTCY: (data[i]['RX_HYTCY'] == undefined) ? '' : data[i]['RX_HYTCY'],
								RX_CBRBS: (data[i]['RX_CBRBS'] == undefined) ? '' : data[i]['RX_CBRBS'],
								// AH: data[i]['AH'],
								RX_AJLX: (data[i]['RX_AJLX'] == undefined) ? '' : data[i]['RX_AJLX'],
								AJBS: (data[i]['AJBS'] == undefined) ? '' : data[i]['AJBS'],
								MC: (data[i]['MC'] == undefined) ? '' : data[i]['MC']
							},
							async: false,
							success: function (data) {
								if (data == 1) {
									// layer.alert('审批案件详情插入成功');
									dataObj.AN_REASON = ay;
									add_or_update(dataObj);
								}
							}
						});
					}
				} else {
					layer.alert('无法获取该案件详情，请检查案号是否正确');
				}
			}
		});
	}
	//存储执行案件详情
	function saveZxAjDetail(dataObj) {
		var an_hao = dataObj.DO_AH;
		$.ajax({
			type: 'post',
			url: weburl + "index.php/caseDetail/insertZxAjDetail",
			data: {
				'AH': an_hao
			},
			async: false,
			dataType: 'json',
			success: function (data) {
				if (data.result == 1) {
					dataObj.AN_REASON = data.ay;
					// layer.alert('执行案件详情插入成功');
					add_or_update(dataObj);
					return true;
				}
			}
		});
		return false;
	}

	function deleteCase(an_hao) {
		$.ajax({
			type: 'post',
			url: weburl + 'index.php/welcome/deleteCase',
			data: {
				'anHao': an_hao
			},
			// dataType:'json',
			success: function (data) {
				layer.alert(data);
			}
		});
	}

	function checkFormData(this_area) {
		if (this_area.val() == 1 || this_area.val() == '1') {
			$.each($('.must'), function (k, v) {
				if (v.value == '') {
					layer.alert('带*号为必填项哦');
					return false;
				}
			});
			return true;
		}
	}
	//坐标拾取地图
	var map;

	function showMap(x, y) {
		var x = x || 107.358146;
		var y = y || 22.412665;
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
			map.centerAndZoom(point, 14);
			var marker = new BMap.Marker(point); // 创建标注  
			map.clearOverlays(); //清除覆盖物 
			map.addOverlay(marker); // 将标注添加到地图中
		});
		$('#region-location').on('click', function () {
			selectRegion(false, centerMap);
		});
		centerMap('',x,y);
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
				// console.log(gisId);
				var point = new BMap.Point(x,y);
				map.centerAndZoom(point, 14);
				var marker = new BMap.Marker(point); // 创建标注  
				map.clearOverlays(); //清除覆盖物 
				map.addOverlay(marker); // 将标注添加到地图中
			}


		}
	}
	//显示人员表
	// function show_case_list() {


	// }

	function show_editor_panel() {
		clear_editor_pandel();
		$('#show-panel').css('display', 'none');
		$('#editor-panel').css('display', 'block');
	}

	function clear_editor_pandel() {
		var inputs = $('#editor-panel').find('input');
		$.each(inputs, function (k, v) {
			if (k > 0) {
				$(v).val('');
			}
		});
		$('#editor-region-selected-list').html('');
		// var selects = $('#editor-panel').find('select');
		// $.each(selects,function(k,v){
		// 	$(v).val('');
		// });
	}

	function show_case_list(page, searchType, typeVal, selectType1, selectVal1, selectType2, selectVal2) {
		$('#editor-panel').css('display', 'none');
		$('#show-panel').css('display', 'block');
		var perPageNum = 8;
		var searchType = searchType || 'ALL';
		var typeVal = typeVal || '';
		var selectType1 = selectType1 || 'ALL';
		var selectVal1 = selectVal1 || '';
		var selectType2 = selectVal2 || 'ALL';
		var selectVal2 = selectVal2 || '';
		$.ajax({
			type: 'post',
			url: weburl + 'index.php/welcome/showCaseList',
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
				var pageNum = showPapeNum('CASE', typeVal);
				$.each(data, function (k, v) {
					str += "<tr><td class='list-item-ah'>" + v.DO_AH + "</td><td class='list-item-ay'>" + v.AN_REASON + "</td><td class='list-item-court-name'>" + v.COURT_NAME + "</td><td class='list-item-region'>" + v.R_NAME + "</td><td class='list-item-bzxr'>" + v.BZXR_NAME + "</td><td class='list-item-date'>" + v.LA_DATE + "</td><td class='list-item-address'>" + v.ADDRESS + "</td><td><button class='button bg-sub button-small ry-option-list-btn case-editor'>查看 / 编辑</button> <button class='button bg-red button-small ry-option-list-btn' onClick='deleteCase(" + v.ID + ")'>删除</button><input type='hidden' class='list-item-caseid' value='" + v.ID + "'></td></tr>";
				});
				$('#case-list-data').html(str);
				laypage({
					cont: 'case_list_page',
					curr: page,
					pages: Math.ceil(pageNum / perPageNum),
					jump: function (obj, first) {
						if (!first) {
							show_case_list(obj.curr);
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
