//测试打印，正式使用时注释内容
function AppendStatus(szStatus) {
	//$("#text").html(szStatus);
	//qnviccub.QNV_Tool(QNV_TOOL_WRITELOG,0,szStatus,NULL,NULL,0);//写本地日志到控件注册目录的userlog目录下
	var szHint = $("#StatusArea").val() + szStatus + "\r\n";
	$("#StatusArea").val(szHint);
	//$("#StatusArea").scrollTop($("#StatusArea").scrollHeight());
}

//版本一：
//使用3.5接口耳机与麦克风
//拨号事件
function dial_up(no, name, address, rybs, aj_type, ajbs) {
	var name = name || '';
	var address = address || '';
	var rybs = rybs || '';
	var aj_type = aj_type || '';
	var ajbs = ajbs || '';
	// DetectActiveX();

	//检测盒子控件是否安装
	I_CheckActiveX();
	//验证手机号是否正确
	// if(!(/^1[34578]\d{9}$/.test(no))){
	//     alert("手机号码有误");
	//     return false;
	// }
	phone_number = no;
	//检测盒子是否开机，如果未开机则自动开机
	var canInit = TV_Initialize();
	if (canInit) {
		// 弹出通话笔记记录面板
		notePanel(no, name, address, rybs, aj_type, ajbs);
		change_status_img('up');
		//打开耳机
		TV_EnableLine2Spk(0, TRUE);
		//开始拨号
		var is_dial = TV_StartDial(0, phone_number);
	}
}

//从拨号开始到通话结束的麦克风状态显示
function is_mic(t) {
	//BriEvent_MicIn麦克风接入
	if (BriEvent_MicIn == t) {
		//显示麦克风可用图标
	}
	if (BriEvent_MicOut == t) {
		//显示麦克风不可用图标
	}
}

//挂机回调方法
function end_dial() {
	change_status_img('down');
}

function DetectActiveX() {
	try {
		var comActiveX = new ActiveXObject('qnviccub.qnviccub');
	} catch (e) {
		layer.alert('请安装或打开ActiveX控件,并正确安装拨号驱动');
		return false;
	}
	return true;
}

function change_status_img(status) {
	if (status == 'up') {
		if ($('#call_status_img').length > 0) {
			if ($('#call_status_img').attr('src') == weburl + 'images/cz/off_phone.jpg')
				$('#call_status_img').attr('src', weburl + 'images/cz/on_phone.gif');
		}
	} else if (status == 'down') {
		if ($('#call_status_img').length > 0) {
			if ($('#call_status_img').attr('src') == weburl + 'images/cz/on_phone.gif')
				$('#call_status_img').attr('src', weburl + 'images/cz/off_phone.jpg');
		}
	}
}
