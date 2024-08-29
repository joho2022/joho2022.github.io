// By: h01000110 (hi)
// github.com/h01000110

function numbers() {
    var fields = document.querySelectorAll('pre code'); // `<code>` 태그를 직접 대상으로 선택
    fields.forEach(field => {
        let codeText = field.innerText;
        field.innerHTML = ''; // 기존 내용을 비우고
        let lines = codeText.split(/\n/).filter(line => line.trim() !== ''); // 빈 줄 제거
        lines.forEach(line => {
            let textNode = document.createTextNode(line + '\n'); // 텍스트 노드 생성
            field.appendChild(textNode);
        });
    });
}

window.onload = numbers;
