// ==UserScript==
// @name         西南交大电费充值页面修正补丁
// @namespace    swjtu.edu.cn
// @version      1.0
// @description  西南交大电费充值页面修正补丁
// @author       Nathan_21hz
// @match        http://card.swjtu.edu.cn/accountxnjddfInput.action?dktype=0
// @require      http://code.jquery.com/jquery-1.8.2.js
// ==/UserScript==

(function() {
    'use strict';
    $('[name="areaCode"]').eq(0).attr("id","areaCode")
    $('[name="dktype"]').eq(0).attr("id","dktype")
    $('[name="wfaccount"]').eq(0).attr("id","wfaccount")
    $('[name="wfaccount1"]').eq(0).attr("id","wfaccount1")
    $('[name="wfaccount2"]').eq(0).attr("id","wfaccount2")
    // Your code here...
})();