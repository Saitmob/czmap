 var MyUpload = {
    defaults: {
        id: '#fileupload',
        class: '.fileupload',
        dataType: 'json',
        postfix: '',
        myData: {},
        url: weburl + 'index.php/Uploadfile/upload',
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 99 * 1024 * 1024,
        minFileSize: 5,
        maxNumberOfFiles: 50,
        singleFileUploads: true,
        messages: {
            maxFileSize: '文件不能超过99MB',
            minFileSize: '文件不能小于5byte',
            acceptFileTypes: '文件类型不允许'
        }
    },
    request: function (options, progressall_callback, done_callback, failCallback) {
        var settings = $.extend(this.defaults, options);
        $(settings.class).fileupload({
            dataType: settings.dataType,
            url: settings.url,
            acceptFileTypes: settings.acceptFileTypes,
            maxFileSize: settings.maxFileSize,
            minFileSize: settings.minFileSize,
            maxNumberOfFiles: settings.maxNumberOfFiles,
            messages: settings.messages,
            add: function (e, data) {
                //console.log(data);
                if (settings.postfix == "") {
                    data.formData = settings.myData;
                    data.submit();
                }
                else {
                    if (lastname(data.originalFiles[0]['name'].toLowerCase(), settings.postfix) == 1) {
                        data.formData = settings.myData;
                        data.submit();
                    }
                    else {
                        layer.alert("只能上传png、jpg、jpeg、jhit类型的文件！");
                    }
                }
            },
            progressall: function (e, data) {
                if (progressall_callback) {
                    progressall_callback(data);
                }
            },
            done: function (e, data) {
                if (done_callback) {
                    done_callback(data.result);
                }
            }
        });
    }
}


 var MyUploadexl = {
    defaults: {
        id: '#fileupload',
        class: '.fileupload',
        dataType: 'json',
        postfix: '',
        myData: {},
        url: weburl + 'index.php/Uploadfile/uploadexl',
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|doc|docx|xls|rar|xlsx)$/i,
        maxFileSize: 99 * 1024 * 1024,
        minFileSize: 5,
        maxNumberOfFiles: 50,
        singleFileUploads: true,
        messages: {
            maxFileSize: '文件不能超过99MB',
            minFileSize: '文件不能小于5byte',
            acceptFileTypes: '文件类型不允许'
        }
    },
    request: function (options, progressall_callback, done_callback, failCallback) {
        var settings = $.extend(this.defaults, options);
        $(settings.id).fileupload({
            dataType: settings.dataType,
            url: settings.url,
            acceptFileTypes: settings.acceptFileTypes,
            maxFileSize: settings.maxFileSize,
            minFileSize: settings.minFileSize,
            maxNumberOfFiles: settings.maxNumberOfFiles,
            messages: settings.messages,
            add: function (e, data) {
                //console.log(data);
                if (settings.postfix == "") {
                    data.formData = settings.myData;
                    data.submit();
                }
                else {
                    if (lastname(data.originalFiles[0]['name'].toLowerCase(), settings.postfix) == 1) {
                        data.formData = settings.myData;
                        data.submit();
                    }
                    else {
                        layer.alert("只能上传更换xls,xlsx文件！");
                    }
                }
            },
            progressall: function (e, data) {
                if (progressall_callback) {
                    progressall_callback(data);
                }
            },
            done: function (e, data) {
                if (done_callback) {
                    done_callback(data.result);
                }
            }
        });
    }
}

function lastname(name, postfix) {
    //获取欲上传的文件路径
    var filepath = name;
    //为了避免转义反斜杠出问题，这里将对其进行转换
    var re = /(\\+)/g;
    var filename = filepath.replace(re, "#");
    //对路径字符串进行剪切截取
    var one = filename.split("#");
    //获取数组中最后一个，即文件名
    var two = one[one.length - 1];
    //再对文件名进行截取，以取得后缀名
    var three = two.split(".");
    //获取截取的最后一个字符串，即为后缀名
    var last = three[three.length - 1];
    //添加需要判断的后缀名类型
    var tp = postfix;
    //返回符合条件的后缀名在字符串中的位置
    var rs = tp.indexOf(last);
    //如果返回的结果大于或等于0，说明包含允许上传的文件类型
    if (rs >= 0) {
        return 1;
    } else {
        return 0;
    }
}
