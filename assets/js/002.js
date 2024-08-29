// By: h01000110 (hi)
// github.com/h01000110

function numbers () {
	var fields = document.getElementsByTagName("code");
	for (field in fields) {
		var select = fields[field].innerText;
		var select_f = select.split(/\n/);

		// 마크다운과 함께 추가 라인 문제를 수정
		select_f.splice(-1, 1);

		fields[field].innerHTML = "";
		for (line in select_f) {
			fields[field].appendChild(document.createTextNode(select_f[line]));
			fields[field].appendChild(document.createElement("br")); // 줄 바꿈 추가
		}
	}
}

window.onload = numbers();
