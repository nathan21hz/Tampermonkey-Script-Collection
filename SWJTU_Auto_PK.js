// ==UserScript==
// @name         西南交大自动评课工具
// @namespace    https://github.com/nathan21hz/SWJTU_Auto_PK
// @version      1.0
// @description  自动一键好评/差评课程
// @author       Nathan_21hz
// @include      http*://*.vatuu.com/vatuu/AssessAction?setAction=viewAssess*
// @include      http*://*.vatuu.com/vatuu/AssessAction?setAction=list*
// @require      http://code.jquery.com/jquery-1.8.2.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_openInTab
// ==/UserScript==
    var ctd=500;
(function() {
    'use strict';
    function addButton(){
        var box = $('td[colspan="2"]')[0];
        box.innerHTML += "&nbsp;&nbsp;";
        var button = document.createElement("input"); //创建一个input对象（提示框按钮）
        button.setAttribute("type", "button");
        button.setAttribute("value", "显示所有");
        button.setAttribute("id", "showall");
        box.appendChild(button);
        var title = $('[class="post-title"]')[0];
        $('<div id="countdown" class="post-title"></div>').insertAfter(title);
    }

    if(window.location.search=="?setAction=list"){
        var box = $('[name="searchForm"]')[0];
        box.innerHTML += "&nbsp;&nbsp;";
        var button = document.createElement("input"); //创建一个input对象（提示框按钮）
        button.setAttribute("type", "button");
        button.setAttribute("value", "打开所有待评价页面");
        button.setAttribute("id", "openall");
        box.appendChild(button);
    }else{
        addButton();
        GM_setValue(ctd,25);
        window.setInterval(function() {
            var timeleft = GM_getValue(ctd)
            if(timeleft==0){
                var ps = document.answerForm.problem_id;//问题
                var ids = "",ans = "";
                for(var i=0;i<ps.length;i++){
                    var id = ps[i].value;
                    var answer = "";
                    answer = document.getElementsByName("problem"+id)[0].value;
                    if(answer==""){
                        answer = "无"
                    }
                    ids+=("_"+id);
                    ans+=("_"+answer);
                }
                document.form2.id.value=ids;
                document.form2.answer.value=ans;
                document.form2.assess_id.value=document.answerForm.assess_id.value;
                document.form2.templateFlag.value="0";
                document.form2.t.value=Math.random();
                document.form2.keyword.value="null";
                document.form2.submit();
            }else{
                $('#countdown').html('等待'+timeleft.toString()+'s后自动好评');
                GM_setValue(ctd,timeleft-1);
            }
    }, 1000);
    }

    $('#goodit').click(function(){
        var ps = document.answerForm.problem_id;//问题
        var ids = "",ans = "";
        for(var i=0;i<ps.length;i++){
            var id = ps[i].value;
            var answer = "";
            answer = document.getElementsByName("problem"+id)[0].value;
            if(answer==""){
                answer = "无"
            }
            ids+=("_"+id);
            ans+=("_"+answer);
        }
		document.form2.id.value=ids;
        document.form2.answer.value=ans;
        document.form2.assess_id.value=document.answerForm.assess_id.value;
        document.form2.templateFlag.value="0";
        document.form2.t.value=Math.random();
        document.form2.keyword.value="null";
        document.form2.submit();
    });

    $('#showall').click(function(){
        var ps = document.answerForm.problem_id;
        for(var i=0;i<ps.length;i++){
            radioClick(i);
        }
    });

    $('#openall').click(function(){
        var urls = $("[href$='Flag=0']");
        var url = ''
        console.log(urls.length)
        for(var i =0;i<urls.length;i++){
            url = urls[i].href;
            console.log(url)
            GM_openInTab(url,"insert")
        }
    });
})();
