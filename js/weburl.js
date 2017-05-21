var weburl = 'http://147.1.7.45/czmapgit/';
// var weburl = 'http://qxp.tunnel.2bdata.com/czmapn/';
// var weburl = 'http://192.168.118.68/czmapn/';
$(function() {
    $('.header').find('.title').on('click', function() {
        window.location.href = weburl;
    });
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
function rIdToFjm(r_id){
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
function fjmToRid(fjm){
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
function fjmToName(fjm){
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
$(function() {
    getUserInfo();
    $('.header-nav').hover(function() {
        $(this).addClass('active-nav');
        // $(this).find('a').css('color', '#117799');
    }, function() {
        $(this).removeClass('active-nav');
        // $(this).find('a').css('color', '#fff');
    });
    //头部

    validatorNum();
    //底部
    $('body').append('<div class="footer"><p>友情链接：<a href="">门户系统</a> | <a href="">审判系统</a> | <a href="">执行系统</a></p><p>电话：0771-2478292</p></div>');
    resetFooter();
    window.onresize = function() {
        resetFooter();
    }

});

function resetFooter() {
    var bodyH = document.body.scrollHeight;
    // var height = document.body.scrollHeight;
    var height = window.screen.height;
    if (document.body.clientHeight  - bodyH > 0) {
        $('.footer').css({ 'position': 'fixed', 'bottom': '0' });
    }else{
        $('.footer').css({ 'position': 'static' });
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
        success: function(data) {
            userObj = data;
            $('.user-name').html(data.user_name);
        }
    });
}
//数字输入框验证
function validatorNum() {
    $.each($('.input-number'), function(k, v) {
        $(v).on('keydown', function(event) {
            v.value = v.value.replace(/[^0-9]/ig, '');
            if (event.keyCode == 38) v.value = parseInt(v.value) + 1;
            if (event.keyCode == 40) {
                v.value = parseInt(v.value) - 1;
                if (v.value < 1) {
                    v.value = 1;
                }
            }
        });
        $(v).on('blur', function() {
            v.value = v.value.replace(/[^0-9]/ig, '');
        });
    })

}