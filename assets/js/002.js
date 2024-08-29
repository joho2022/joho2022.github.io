// By: h01000110 (hi)
// github.com/h01000110

function numbers() {
    var fields = document.getElementsByTagName("code");
    for (var field of fields) {
        var select = field.innerText;
        var select_f = select.split(/\n/);

        // 마크다운과 함께 추가 라인 문제를 수정
        if (select_f[select_f.length - 1] === "") {
            select_f.splice(-1, 1);
        }

        var pre = document.createElement("pre");
        field.innerHTML = "";
        field.appendChild(pre);

        for (var line of select_f) {
            pre.appendChild(document.createTextNode(line + '\n'));
        }
    }
}


window.onload = numbers();
