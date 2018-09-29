var chart = (function () {
    var $btn = document.querySelector('.chart_send');
    var $txt = document.querySelector('.chart_content');
    var $rigth = document.querySelector('.main__right');
    var chartBox = document.querySelector('.chart-box__main');
    return {
        init: function () {
            this.event();
            this.sendData();
        },
        event: function () {
            var _this = this;
            $btn.onclick = function () {
                // 获取文本框的值
                var val = $txt.value.trim();
                if (val) {
                    // 如果文本框有内容
                    _this.chartdom(val, true);
                    _this.sendData();
                    // 聊天内容加入以后在计算高度
                    chartBox.scrollTop = chartBox.scrollHeight - chartBox.clientHeight;
                    // 清空文本
                    $txt.value = '';

                }
            }
            $txt.onkeydown = function (ev) {
                ev = ev || window.event;
                var keyCode = ev.keyCode || ev.which;
                if (ev.ctrlKey) {
                    if (keyCode == 13) {
                        $btn.click();
                    }
                }
            }
        },
        sendData() {
            var _this = this;
            var val = $txt.value.trim();
            var url = 'http://www.tuling123.com/openapi/api?key=f15708c6fca14ec695d6501eb29c0b67&info='+val+'&userid=123456';
            if (val) {
                var data = {
                    key:"f15708c6fca14ec695d6501eb29c0b67",
                    info:val,
                    userid:"123456"
                }
                data =JSON.stringify(data);
                console.log(data);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url , true);
                xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                // get请求,send方法默认传一个null值
                xhr.send(data);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var result = xhr.responseText;
                        _this.setResult(result);
                    }
                }
            }

        },
        chartdom(val, imgAvter) {
            if (imgAvter) {
                var $li = document.createElement('li');
                $li.className = 'main__right';
                var span = document.createElement('span');
                var $text = document.createTextNode(val);
                span.className = 'main_bg';
                span.appendChild($text);
                $li.appendChild(span);
                span = document.createElement('span');
                span.className = 'main_avater';
                var $img = document.createElement('img');
                $img.src = 'img/xiaolan.jpg';
                span.appendChild($img);
                $li.appendChild(span);
                chartBox.appendChild($li);
            } else {
                var $li = document.createElement('li');
                $li.className = 'main__left';
                var span = document.createElement('span');
                span.className = 'main_avater';
                var $img = document.createElement('img');
                $img.src = 'img/xiaoming.jpg';
                span.appendChild($img);
                $li.appendChild(span);
                span = document.createElement('span');
                var $text = document.createTextNode(val);
                span.className = 'main_bg';
                span.appendChild($text);
                $li.appendChild(span);
                chartBox.appendChild($li);
                chartBox.scrollTop = chartBox.scrollHeight - chartBox.clientHeight;
            }
        },
        setResult(data) {
            console.log(data);
            var json = JSON.parse(data);
            this.chartdom(json.text, false);
        }
    }
}())