//选择人员所属区域
var regionSelectMultiple;

function selectRegion(multiple, callbackFun) {
    var zTree;
    var demoIframe;
    regionSelectMultiple = multiple || false;//默认不多选
    var callbackFun = callbackFun || function() {console.log('未定义回调方法')};
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
            beforeClick: function(treeId, treeNode) {
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
                var selectListDom = '<button  class="button bg-mix" id="need-select" onClick="addSelect(' + id + ',\'' + pArr_str + '\',' + callbackFun + ');" >' + pArr_str + '</button>';
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
        closeBtn: 0,
        // content: '<div style="text-align:center;padding:10px 0;"><img src="' + weburl + '/images/baidu_map_getPointCode.png" alt=""></div>',
        content: '<div class="panel" style="height:374px;overflow:hidden;"><div class="panel-head">区域选择</div><div class="panel-body" style="height:330px;box-sizing:border-box;overflow:hidden;"><div id="treeDemo" style="width:200px;height:315px;overflow:auto;border-right:1px solid gray;display:inline-block;" class="ztree"></div><div style="width:56%;height:100%;display:inline-block;vertical-align:top;padding:0 10px"><p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">单击选择</p><div class="select-list" style="height:64px;"></div><p style="padding-left:10px;border-bottom:gray 1px solid;font-size:12px;color:gray;">已选择</p><div id="region-selected-list" class="list-link" style="height:155px;overflow:auto;"></div></div> </div></div>',
        yes: function(i) {
            var idObjArr = $('#region-selected-list').find('a[id^="region_"]');
            var idArr = [];
            $.each(idObjArr, function(k, v) {
                var id = parseInt($(v).attr('id').substr(7));
                idArr.push(id);
            });
            layer.close(i);
        },
        end: function() {
            // $('.editor-select-region').on('click', function () {
            //     $('.layui-layer-content .editor-select-region').unbind();
            //     $('.layui-layer-content .icon-map-marker').data('id', "");
            //     $('.layui-layer-content .icon-map-marker').data('name', "");    
            //     selectRegion(true, changeRangeText);
            // });
        }
    });
    //得到节点信息
    $.ajax({
        type: 'post',
        url: weburl + 'index.php/welcome/regionNode',
        dataType: 'json',
        async: false,
        success: function(data) {
            zNodes = data;
            zTree = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        },
        error: function(a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
        }
    });

}

//添加区域事件
function addSelect(id, name, callback) {
    var callback = callback || function() {};
    if (id == '无') {
        return false;
    }
    var idName1 = 'region_';
    var idName2 = 'editor_region_';
    var str_1 = '<a href = "javascript:;" class="selectedRegion" id="';
    var str_2 = id + '" onmouseover="showDelBtn(this)" onmouseout="hideDelBtn(this)"> ' + name + '<span class="float-right tag bg-red" style="display:none;" onclick="deleteRegion(this,' + id + ')">删除</span> </a>';
    var str1 = str_1 + idName1 + str_2;
    var str2 = str_1 + idName2 + str_2;
    if ($('#editor_region_' + id).length > 0) {
        layer.alert('请勿重复添加');
        return false;
    }
    //判断是否多选
    if (regionSelectMultiple == true) {
        $('#region-selected-list').append(str1);
        $('#editor-region-selected-list').append(str2);
    } else {
        $('#region-selected-list').html(str1);
        $('#editor-region-selected-list').html(str2);
    }
    //
    callback(id,name);

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