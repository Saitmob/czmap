var phone_number = "";
var uMaxID = 64;
var uPlayFileID = new Array(64);
var uRecordID = new Array(64);
var uCCSessID = -1;
var vConfID = 0;
var g_interval = 0; //定时器全局变量
var isFirefox = navigator.userAgent.toUpperCase().indexOf("FIREFOX") ? true : false;
var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE") ? true : false;
var isChrome = navigator.userAgent.toUpperCase().indexOf("CHROME") ? true : false;
// 全局拨号对象
var Ole;
// 状态层
var start_i;
var calling_i;
var end_i;
var note_i; //通话笔记面板
var _r_c; //1为呼入，2为呼出
var jt_i; //呼入时接听提示

function AppendStatusEx(uID, szStatus) {
	uID = uID + 1;
	AppendStatus("通道" + uID + ":" + szStatus);
}

function T_GetEvent(uID, uEventType, uHandle, uResult, szdata) {
	//var vValueArray=qnviccub.QNV_Event(0,2,0,"","",1024);
	var vValue = " type=" + uEventType + " Handle=" + uHandle + " Result=" + uResult + " szdata=" + szdata;
	switch (uEventType) {
		case BriEvent_PhoneHook: // 本地电话机摘机事件
			AppendStatusEx(uID, "本地电话机摘机" + vValue);
			phone_number = szdata
			TV_EnableMic(0, TRUE);
			TV_StartRecordFile(0, 0, phone_number);
			break;
		case BriEvent_PhoneDial: // 只有在本地话机摘机，没有调用软摘机时，检测到DTMF拨号
			AppendStatusEx(uID, "本地话机拨号" + vValue);
			break;
		case BriEvent_PhoneHang: // 本地电话机挂机事件
			AppendStatusEx(uID, "本地电话机挂机" + vValue);
			TV_HangUpCtrl(0);
			break;
		case BriEvent_CallIn: // 外线通道来电响铃事件
			AppendStatusEx(uID, "外线通道来电响铃事件" + vValue);
			break;
		case BriEvent_GetCallID: //得到来电号码
			AppendStatusEx(uID, "得到来电号码" + vValue);
			_r_c = 1;
			jtdh(szdata);
			break;
		case BriEvent_StopCallIn: // 对方停止呼叫(产生一个未接电话)
			AppendStatusEx(uID, "对方停止呼叫(产生一个未接电话)" + vValue);
			layer.closeAll();
			layer.alert('您有一个未接电话，号码：' + phone_number);
			TV_HangUpCtrl(0);
			break;
		case BriEvent_DialEnd: // 调用开始拨号后，全部号码拨号结束
			AppendStatusEx(uID, "调用开始拨号后，全部号码拨号结束" + vValue);
			break;
		case BriEvent_PlayFileEnd: // 播放文件结束事件
			AppendStatusEx(uID, "播放文件结束事件" + vValue);
			break;
		case BriEvent_PlayMultiFileEnd: // 多文件连播结束事件
			AppendStatusEx(uID, "多文件连播结束事件" + vValue);
			break;
		case BriEvent_PlayStringEnd: //播放字符结束
			AppendStatusEx(uID, "播放字符结束" + vValue);
			break;
		case BriEvent_RepeatPlayFile: // 播放文件结束准备重复播放
			AppendStatusEx(uID, "播放文件结束准备重复播放" + vValue);
			break;
		case BriEvent_SendCallIDEnd: // 给本地设备发送震铃信号时发送号码结束
			AppendStatusEx(uID, "给本地设备发送震铃信号时发送号码结束" + vValue);
			break;
		case BriEvent_RingTimeOut: //给本地设备发送震铃信号时超时
			AppendStatusEx(uID, "给本地设备发送震铃信号时超时" + vValue);
			break;
		case BriEvent_Ringing: //正在内线震铃
			AppendStatusEx(uID, "正在内线震铃" + vValue);
			break;
		case BriEvent_Silence: // 通话时检测到一定时间的静音.默认为5秒
			AppendStatusEx(uID, "通话时检测到一定时间的静音" + vValue);
			break;
		case BriEvent_GetDTMFChar: // 线路接通时收到DTMF码事件
			AppendStatusEx(uID, "线路接通时收到DTMF码事件" + vValue);
			break;
		case BriEvent_RemoteHook: // 拨号后,被叫方摘机事件
			AppendStatusEx(uID, "拨号后,被叫方摘机事件" + vValue);
			layer.close(start_i);
			// calling_i = layer.alert('通话中...');
			TV_EnableMic(0, TRUE);
			TV_StartRecordFile(0, 0, phone_number);
			break;
		case BriEvent_RemoteHang: //对方挂机事件
			AppendStatusEx(uID, "对方挂机事件" + vValue);
			// layer.alert('对方已挂断');
			TV_HangUpCtrl(0);
			break;
		case BriEvent_Busy: // 检测到忙音事件,表示PSTN线路已经被断开
			AppendStatusEx(uID, "检测到忙音事件,表示PSTN线路已经被断开" + vValue);
			layer.alert('对方正忙');
			TV_HangUpCtrl(0);
			break;
		case BriEvent_DialTone: // 本地摘机后检测到拨号音
			AppendStatusEx(uID, "本地摘机后检测到拨号音" + vValue);
			break;
		case BriEvent_RingBack: // 电话机拨号结束呼出事件。
			AppendStatusEx(uID, "电话机拨号结束呼出事件" + vValue);
			break;
		case BriEvent_MicIn: // MIC插入状态
			AppendStatusEx(uID, "MIC插入状态" + vValue);
			is_mic(BriEvent_MicIn);
			break;
		case BriEvent_MicOut: // MIC拔出状态
			AppendStatusEx(uID, "MIC拔出状态" + vValue);
			is_mic(BriEvent_MicOut);
			break;
		case BriEvent_FlashEnd: // 拍插簧(Flash)完成事件，拍插簧完成后可以检测拨号音后进行二次拨号
			AppendStatusEx(uID, "拍插簧(Flash)完成事件，拍插簧完成后可以检测拨号音后进行二次拨号" + vValue);
			break;
		case BriEvent_RefuseEnd: // 拒接完成
			AppendStatusEx(uID, "拒接完成" + vValue);
			break;
		case BriEvent_SpeechResult: // 语音识别完成
			AppendStatusEx(uID, "语音识别完成" + vValue);
			break;
		case BriEvent_FaxRecvFinished: // 接收传真完成
			AppendStatusEx(uID, "接收传真完成" + vValue);
			break;
		case BriEvent_FaxRecvFailed: // 接收传真失败
			AppendStatusEx(uID, "接收传真失败" + vValue);
			break;
		case BriEvent_FaxSendFinished: // 发送传真完成
			AppendStatusEx(uID, "发送传真完成" + vValue);
			break;
		case BriEvent_FaxSendFailed: // 发送传真失败
			AppendStatusEx(uID, "发送传真失败" + vValue);
			break;
		case BriEvent_OpenSoundFailed: // 启动声卡失败
			AppendStatusEx(uID, "启动声卡失败" + vValue);
			break;
		case BriEvent_UploadSuccess: //远程上传成功
			AppendStatusEx(uID, "远程上传成功" + vValue);
			break;
		case BriEvent_UploadFailed: //远程上传失败
			AppendStatusEx(uID, "远程上传失败" + vValue);
			break;
		case BriEvent_EnableHook: // 应用层调用软摘机/软挂机成功事件
			AppendStatusEx(uID, "应用层调用软摘机/软挂机成功事件" + vValue);
			break;
		case BriEvent_EnablePlay: // 喇叭被打开或者/关闭
			AppendStatusEx(uID, "喇叭被打开或者/关闭" + vValue);
			break;
		case BriEvent_EnableMic: // MIC被打开或者关闭
			AppendStatusEx(uID, "MIC被打开或者关闭" + vValue);
			break;
		case BriEvent_EnableSpk: // 耳机被打开或者关闭
			AppendStatusEx(uID, "耳机被打开或者关闭" + vValue);
			break;
		case BriEvent_EnableRing: // 电话机跟电话线(PSTN)断开/接通
			AppendStatusEx(uID, "电话机跟电话线(PSTN)断开/接通" + vValue);
			console.log("电话线");
			break;
		case BriEvent_DoRecSource: // 修改录音源
			AppendStatusEx(uID, "修改录音源" + vValue);
			break;
		case BriEvent_DoStartDial: // 开始软件拨号
			AppendStatusEx(uID, "开始软件拨号" + vValue);
			break;
		case BriEvent_RecvedFSK: // 接收到FSK信号，包括通话中FSK/来电号码的FSK
			AppendStatusEx(uID, "接收到FSK信号，包括通话中FSK/来电号码的FSK" + vValue);
			break;
		case BriEvent_DevErr: //设备错误
			AppendStatusEx(uID, "设备错误" + vValue);
			break;
		default:
			if (uEventType < BriEvent_EndID)
				AppendStatusEx(uID, "忽略其它事件发生:ID=" + uEventType + vValue);
			break;
	}

}

function I_CheckActiveX() {
	if (window.ActiveXObject) {
		try {
			var Ole = new ActiveXObject("qnviccub.qnviccub");
		} catch (e) {
			AppendStatus("未安装ACTIVEX,请使用regsvr32 qnviccub.dll先注册/或者开发包bin目录'组件注册'");
		}
	} else {
		try {
			if (qnviccub.QNV_DevInfo(0, QNV_DEVINFO_GETCHANNELS) <= 0) {
				AppendStatus("设备已经被打开，不需要重复打开");
			}
			AppendStatus("已经注册了ACTIVEX");
		} catch (e) {

			AppendStatus("未安装ACTIVEX,请使用regsvr32 qnviccub.dll先注册/或者开发包bin目录'组件注册'");
			//alert("未安装ACTIVEX,请使用regsvr32 qnviccub.dll先注册/或者开发包bin目录'组件注册'");
		}
	}
}

function TV_Initialize() {
	var canInit = false;
	if (window.ActiveXObject) {
		try {
			Ole = new ActiveXObject("qnviccub.qnviccub");
		} catch (e) {
			AppendStatus("未安装ACTIVEX,请使用regsvr32 qnviccub.dll先注册/或者开发包bin目录'组件注册'");
		}
	} else {
		if (Ole) {
			g_interval = setInterval(TV_GetEvent, "200");
		} else {
			layer.alert('浏览器无法打开ActiveX，这将导致无法使用通话功能。请更换为IE浏览器或者用360兼容模式打开');
		}
	}
	//var qnv = document.getElementById('qnviccub');
	//	qnv.attachEvent("OnQnvEvent", T_GetEvent);   	

	if (qnviccub.QNV_DevInfo(0, QNV_DEVINFO_GETCHANNELS) <= 0) {
		qnviccub.QNV_OpenDevice(0, 0, 0);
		//初始化状态控制
		var channels = qnviccub.QNV_DevInfo(0, QNV_DEVINFO_GETCHANNELS);
		if (channels > 0) {
			canInit = true;
			for (j = 0; j < channels; j++) {
				TV_SetParam(j, QNV_PARAM_AM_LINEIN, 5); //把输入能量增益调为5
			}
			//设置忙音侦测数
			TV_SetParam(0, QNV_PARAM_BUSY, 5);
			AppendStatus("打开设备成功 通道数:" + channels + " 序列号:" + qnviccub.QNV_DevInfo(0, QNV_DEVINFO_GETSERIAL) + " 设备类型:" + qnviccub.QNV_DevInfo(0, QNV_DEVINFO_GETTYPE) + " ver:" + qnviccub.QNV_DevInfo(0, QNV_DEVINFO_FILEVERSION));
		} else {
			AppendStatus("打开设备失败,请检查设备是否已经插入并安装了驱动,并且没有其它程序已经打开设备");
			layer.alert('打开设备失败,请检查设备是否已经插入并安装了驱动,并且没有其它程序已经打开设备');
		}
		//初始化变量
		for (i = 0; i < uMaxID; i = i + 1) {
			uPlayFileID[i] = -1;
			uRecordID[i] = -1;
		}
	} else {
		canInit = true;
		AppendStatus("设备已经被打开，不需要重复打开");
	}
	return canInit;
}

function TV_GetEvent() {
	//var iCh = 0;
	var iMax = qnviccub.QNV_DevInfo(0, QNV_DEVINFO_GETCHANNELS);
	var i = 0;
	for (iCh = 0; iCh < iMax; iCh++) {
		var lEventType = qnviccub.QNV_Event(iCh, QNV_EVENT_TYPE, 0, 0, 0, 0);

		var lEventHandle = -1;
		var lParam = 0;
		var lResult = -1;
		if (lEventType > 0) {
			lEventHandle = qnviccub.QNV_Event(iCh, QNV_EVENT_HANDLE,
				0, null, null, 0);
			lParam = qnviccub.QNV_Event(iCh, QNV_EVENT_PARAM, 0,
				null, null, 0);
			lResult = qnviccub.QNV_Event(iCh, QNV_EVENT_RESULT, 0,
				null, null, 0);
			var szDataBuffer = new Array();
			var szData = szDataBuffer.join("");
			var szArray = qnviccub.QNV_Event(iCh, QNV_EVENT_DATA, 0, null,
				szData, 1024);
			qnviccub.QNV_Event(iCh, QNV_EVENT_REMOVE, 0, null, null,
				0); // 删除
			T_GetEvent(iCh, lEventType, lEventHandle, lResult, szArray.toString()); //本函数在demo。html或者pstn.html里
		}
	}
	//AppendStatus("通道"+iCh + szDataBuffer.toString());

}

//配置设备参数函数
//nChannel通道号
//paramName//参数名
//nValue参数值
function TV_SetParam(nChannel, paramName, nValue) {
	if (nChannel >= 0) {
		qnviccub.QNV_SetParam(nChannel, paramName, nValue);; //设置参数

	}
}

//控制设备参数函数
//nChannel通道号
//paramName//参数名
//nValue参数值
function TV_SetDevCtrl(nChannel, paramName, nValue) {
	qnviccub.QNV_SetDevCtrl(nChannel, paramName, nValue);
}

//线路声音到耳机，用耳机通话时
function TV_EnableLine2Spk(uID, bEnable) {
	qnviccub.QNV_SetDevCtrl(uID, QNV_CTRL_DOLINETOSPK, bEnable);
}

function TV_Disable() {
	qnviccub.QNV_CloseDevice(ODT_ALL, 0); //关闭所有设备
	if (!window.ActiveXObject) {
		clearTimeout(g_interval);
	}
	AppendStatus("关闭设备完成.");
}

function TV_StartDial(uID, szCode) { //正常拨号必须使用 DIALTYPE_DTMF
	if (qnviccub.QNV_General(uID, QNV_GENERAL_STARTDIAL, DIALTYPE_DTMF, szCode) <= 0) {
		AppendStatusEx(uID, "拨号失败:" + szCode);
		layer.alert('拨号失败');
		return false;
	} else {
		AppendStatusEx(uID, "开始拨号:" + szCode);

		start_i = layer.alert('开始拨号...');
		_r_c = 2;
		callIsEnd = 0;
		return true;
	}
}

function TV_EnableMic2Line(uID, bEnable) {
	//qnviccub.QNV_SetDevCtrl(uID,QNV_CTRL_DOMICTOLINE,bEnable);
	TV_SetDevCtrl(uID, QNV_CTRL_DOMICTOLINE, bEnable);
}

function TV_EnableMic(uID, bEnable) {
	TV_EnableMic2Line(uID, bEnable);
}
var callIsEnd;

function TV_HangUpCtrl(uID) {
	//停止录音
	TV_StopRecordFile(0);
	//挂断
	TV_EnableMic(0, FALSE);
	TV_EnableLine2Spk(0, FALSE);
	TV_EnableHook(uID, FALSE);
	// phone_number = "";
	if (callIsEnd == 0) {
		callIsEnd = 1;
		layer.alert('通话结束');
	}

	//关闭设备
	// TV_Disable();
	//挂断电话回调方法
	end_dial();
}

function TV_EnableHook(uID, bEnable) {
	TV_SetDevCtrl(uID, QNV_CTRL_DOHOOK, bEnable);
	AppendStatusEx(uID, bEnable ? "软摘机" : "软挂机");
}

function TV_StartRecordFile(uID, szFile, no) {
	// var vFilePath=qnviccub.QNV_Tool(QNV_TOOL_SELECTFILE,1,"wav files|*.wav|all files|*.*||",0,0,0);
	var vFilePath = "D:\\电话录音\\" + no + getNowFormatDate() + ".wav";

	if (vFilePath.length > 0) {
		TV_StopRecordFile(uID);
		var vFormatID = BRI_WAV_FORMAT_IMAADPCM8K4B; //选择使用4K/S的ADPCM格式录音
		var vmask = RECORD_MASK_ECHO | RECORD_MASK_AGC; //使用回音抵消后并且自动增益的数据
		//qnviccub.QNV_RecordFile(uID,QNV_RECORD_FILE_SETROOT,0,0,"c:\\recfile\\");

		uRecordID[uID] = qnviccub.QNV_RecordFile(uID, QNV_RECORD_FILE_START, vFormatID, vmask, vFilePath);
		if (uRecordID[uID] <= 0) {
			layer.alert('请将本站点添加为信任站点，否则无法开启录音功能');
			AppendStatusEx(uID, "录音失败:" + vFilePath);
		} else {
			AppendStatusEx(uID, "开始录音文件: id=" + uRecordID[uID] + "  " + vFilePath);
		}
	} else
		AppendStatus("没有选择文件");
}

function TV_StopRecordFile(uID) {
	if (uRecordID[uID] > 0) {
		//var vRecPath=qnviccub.QNV_GetRecFilePath(uID,uRecordID[uID]);
		var vRecPath = qnviccub.QNV_RecordFile(uID, QNV_RECORD_FILE_PATH, uRecordID[uID], 0, 0);
		var vElapse = qnviccub.QNV_RecordFile(uID, QNV_RECORD_FILE_ELAPSE, uRecordID[uID], 0, 0);
		//qnviccub.QNV_RecordFile(uID,QNV_RECORD_FILE_STOP,uRecordID[uID],0,"e:\\a.wav");//保存到e:\\a.wav删除原来路径的录音文件
		qnviccub.QNV_RecordFile(uID, QNV_RECORD_FILE_STOP, uRecordID[uID], 0, 0);
		AppendStatusEx(uID, "停止录音:" + vRecPath + "  录音时间:" + vElapse);
		uRecordID[uID] = 0;
	}
}

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = "-";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = seperator1 + date.getFullYear() + seperator1 + month + seperator1 + strDate + seperator1 + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
	return currentdate;
}
// 主动挂机事件
function endCalling() {

}
// 通话笔记记录面板
function notePanel(phone, name, address, rybs, aj_type, ajbs) {
	var date = new Date();
	var timestamp = date.getTime();
	var time = date.getFullYear() + '年' + (parseInt(date.getMonth()) + 1) + '月' + date.getDate() + '日';
	time += date.getHours() + '时' + date.getMinutes() + '分' + date.getSeconds() + '秒';
	noteLayer(phone, name, address, rybs, aj_type, ajbs, time, timestamp);

}

function noteLayer(phone, name, address, rybs, aj_type, ajbs, time, timestamp, id) {
	phone_number = phone; //查看通话记录
	//初始化文件数据
	need_del_files = [];
	files_num = 0; //文件总数
	files_arr = [];
	var id = id || 0;
	note_i = layer.open({
		type: 1,
		title: '通话笔记',
		skin: 'layui-layer-rim', //加上边框
		area: ['460px', '580px'], //宽高
		closeBtn: 0,
		btn: ['保存', '取消'],
		// content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
		content: '<div style="padding:10px;position:relative;" class="map-person-info-no-border">' +
			'<img id="call_status_img" style="position:absolute;right:0;top:0;width:80px;box-shadow:-5px 5px 8px #eee" src="' + weburl + 'images/cz/on_phone.gif"/>' +
			'<ul id="record_ul"><li>姓名：<span id="call-blxr-name">' + name + '</span>（<span id="call-blxr-type">' + rybs + '</span>）</li>' +
			'<li>电话：<span id="call-blxr-phone">' + phone + '</span></li>' +
			'<li>地址：<span id="call-blxr-address">' + address + '</span></li>' +
			'<li>联系时间：<span id="call-date">' + time + '</span></li>' +
			'<li>通话笔记：<textarea type="text" class="input" style="height:80px;" id="call-note"></textarea></li>' +
			'<li>通话结果：<textarea type="text" class="input" style="height:80px;" id="call-result"></textarea>' +
			'<li><span class="button bg-sub button-small" style="position: relative;cursor:pointer;"><span>选择录音文件</span>' + '<input type="file" id="record-file" class="file-upload-btn" name="files[]" ></span><span style="margin-left:10px;font-size:12px;color:#3D7EB8;">录音文件位于“D:\\电话录音”下</span><br>' +
			'<ul id="record-files-list" class="inline-list" style="font-size:12px;color:#3D7EB8"></ul></li>' +
			'<li><select class="input input-auto input-small " id="call-sfjt" style="width:239px;margin-right:32px;height:32px;">' +
			'<option value="0">未接听</option>' +
			'<option value="1">已接听</option>' +
			'</select>' +
			'<input type="hidden" id="record_aj_type" />' +
			'<input type="hidden" id="record_ajbs" />' +
			'<input type="hidden" id="record_timestamp" />' +
			'<input type="hidden" id="record_in_or_out" value="2" />' +
			'<button class="button bg-dot button-small " id="note-panel-endcall" onclick="TV_HangUpCtrl(0)" style="display:inline-block;margin:4px 0;width:80px;">挂断</button></li></ul></div><script>upload_record_file(' + timestamp + ',\'' + address + '\',\'' + aj_type + '\',\'' + ajbs + '\',' + id + ')</script>',
		yes: function (i) {
			if ($('.delete_file_btn').length == 0 && $('#call-sfjt').val() == 1) {
				layer.alert('请务必上传录音文件');
			} else if ($('#call-sfjt').val() == 0 && $('.delete_file_btn').length == 0 || id != '') {
				insert_call_record(id, address, timestamp, files_arr, aj_type, ajbs);
				layer.close(i);
			} else if ($('#call-sfjt').val() == 0 && $('.delete_file_btn').length == 1) {
				layer.alert('未接听时请不要随意上传录音文件');
			}

			note_layer_i = i;
		},
		btn2: function (i) {
			layer.close(i);
		},
		end: function () {}
	});
}

var note_layer_i;
var need_del_files = [];//需要删除的文件数组，由于限制文件上传为单选，但找不到jqfileUpload的文件上传队列，只能手动去上传后删除
var files_num = 0; //文件总数
var files_arr = [];

function upload_record_file(timestamp, address, aj_type, ajbs, id) {
	var id = id || 0;
	//如果id不为空则表示查看，此时去除通话图标
	if (id != 0) {
		$('#call_status_img').remove();
	}
	$('#record-file').fileupload({
		url: weburl + "index.php/call_record/upload_record_file",
		dataType: 'json',
		autoUpload: false,
		drop: function (e, data) {
			$.each(data.files, function (index, file) {　　
				alert('Dropped file: ' + file.name);　　
			});
		},
		add: function (e, data) {
			if (files_num == 1) {
				layer.alert('只能上传一个文件');
				return false;
			}

			files_num++;
			var file_name = data.files[0].name
			var file_d = '<li>' + file_name + '<i class="delete_file_btn" onclick="push_del_file(this,\'' + file_name + '\');">删除</i></li>';
			$('#record-files-list').append(file_d);
			files_arr.push(data.files[0].name);
			$('.layui-layer-btn0').on('click', function () {
				data.submit();
			});
		},
		done: function (e, data) {
			var filesList = $('input[type="file"]').prop('files');
			if (data.result == 1) {
				files_num--;
				if (files_num == 0) { //所有文件上传后再进行数据插入
					delete_record_file();
					if ($('#call-sfjt').val() == 0) {
						layer.alert('请将接听结果改为已接听');
						files_num++;
					} else {
						insert_call_record(id, address, timestamp, files_arr, aj_type, ajbs);
					}
				}

			} else {

			}
		},
		progressall: function (e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			// console.log(progress + '%', data.loaded, data.total);
		},
	});
}
//记录数据到数据库
function insert_call_record(id, address, timestamp, files_arr, aj_type, ajbs) {
	var note = $('#call-note').val();
	var result = $('#call-result').val();
	var timestamp = (timestamp == undefined || timestamp == 'undefined') ? $('#record_timestamp').val() : timestamp;
	var aj_type = (aj_type == undefined || aj_type == 'undefined') ? $('#record_aj_type').val() : aj_type; //接听时取隐藏域的值
	var ajbs = (ajbs == undefined || ajbs == 'undefined') ? $('#record_ajbs').val() : ajbs;
	var in_or_out = $('#record_in_or_out').val();
	$.base64.utf8encode = true;
	note = $.base64.encode(note);
	result = $.base64.encode(result);
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/call_record/insert_call_record',
		data: {
			id: id,
			name: $('#call-blxr-name').html(),
			lxdx: $('#call-blxr-type').html(),
			phone: phone_number,
			address: address,
			date: $('#call-date').html(),
			time: timestamp,
			lywj: files_arr,
			note: note,
			result: result,
			sfjt: $('#call-sfjt').val(),
			aj_type: aj_type,
			ajbs: ajbs,
			in_or_out: in_or_out
		},
		success: function (data) {
			if (data == '1') {
				layer.alert('通话记录保存成功');
			} else {

			}
			layer.close(note_layer_i);
		}
	});
}
// 删除录音文件
function delete_record_file() {
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/call_record/delete_record_file',
		data: {
			file_arr: need_del_files
		},
		success: function (data) {
			if (data == '1') {
				layer.alert('删除成功');
			}
		}
	});
}

function push_del_file(ele, file_name) {
	layer.confirm('是否确认删除该文件？', function (index) {
		files_num--;
		need_del_files.push(file_name);
		var i = $.inArray(file_name, files_arr);
		files_arr.splice(i, 1);
		$(ele).parent().remove();
		// delete_record_file();
		layer.close(index);
	}, function (i) {
		layer.close(i);
	});
}
//接听电话
function jtdh(phone_num) {
	$.ajax({
		type: 'post',
		url: weburl + 'index.php/call_record/get_person_by_phone',
		data: {
			phone: phone_num
		},
		dataType: 'json',
		success: function (data) {
			var name, address, rybs;
			if (data.person != undefined) {
				name = (data.person.name != null) ? data.person.name : '无';
				address = (data.person.xxdz != null) ? data.person.xxdz : '无';
				rybs = (data.person.rybs != null) ? data.person.rybs : '无';
			} else {
				name = address = rybs = '无';
			}

			notePanel(phone_num, name, address, rybs);
			// 修改面板dom
			$('#record_in_or_out').val('1');
			var aj_select_str = '<li>相关案件：<select class="input input-small input-auto" id="record_ah" style="min-width:160px;">';
			var aj_select_item = '';
			$.each(data.aj, function (k, v) {
				if (v != null) {
					$.each(v, function (k2, v2) {
						aj_select_item += '<option value="' + v2.ajbs + '" aj_type="' + k + '">' + v2.ah + '</option>';
					});
				}
			});
			if (aj_select_item.length == 0) {
				aj_select_item = '<option value="" aj_type="">无</option>';
			}
			aj_select_str += aj_select_item + '</select></li>';
			$('#call-note').parent().before(aj_select_str);
			pick_up_status();
			var ah_s = $('#record_ah');
			$('#record_aj_type').val(ah_s.find('option').eq(0).attr('aj_type'));
			$('#record_ajbs').val(ah_s.find('option').eq(0).val());
			ah_s.change(function () {
				var aj_type = $(this).find(':selected').attr('aj_type');
				$('#record_aj_type').val(aj_type);
				$('#record_ajbs').val($(this).val());
			});
			if (data.has == 0) {
				jt_i = layer.alert(phone_num + '请求向您通话，该人员号码不在系统记录内', {
					closeBtn: 0,
					btn: ['接听'],
					yes: function (index) {
						pick_up();
						layer.close(index);
					}
				});
			} else {
				jt_i = layer.alert(name + '（人员类型：' + rybs + '）请求向您通话', {
					closeBtn: 0,
					btn: ['接听'],
					yes: function (index) {
						pick_up();
						layer.close(index);
					}
				});
			}
		}
	})
}

function pick_up_status() //本机已接听时，修改为已接听
{
	$('#call-sfjt').val('1').attr('disabled', 'disabled');
}

function pick_up() {
	//打开耳机
	TV_EnableLine2Spk(0, TRUE);
	TV_EnableHook(0, TRUE);
	TV_EnableMic(0, TRUE);
	TV_StartRecordFile(0, 0, phone_number);
}
