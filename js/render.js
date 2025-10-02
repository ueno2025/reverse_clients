
export async function render_data(candidates, input_word) {
    const matchDiv = document.getElementById("matches");

    if (candidates.size == 0) {
        matchDiv.innerHTML = `<p>企業名「${input_word}」が主要取引先の会社は見つかりませんでした。`;
    }

    else {
        matchDiv.innerHTML = `<p>「${input_word}」に一致した取引先を選んでください。`;

        for (const [company, list] of candidates) {
            const child_Div = document.createElement("div");
            child_Div.textContent = `${company}`;
            child_Div.className = "match-item";
            child_Div.style.cursor = "pointer"; // カーソルを手にする
            matchDiv.appendChild(child_Div);

            const ul = document.createElement("ul");
            ul.style.display = "none"; // 最初は非表示
            list.forEach(element => {
                const li = document.createElement("li");
                li.innerHTML = `<a href=https://ueno2025.github.io/visibility_of_business_partners/?code=${element["証券コード"]} target="_blank" rel="noopener noreferrer">${element["証券コード"]}: ${element["企業名"]} - ${element["割合"]}%</a>`
                ul.appendChild(li);
            });

            matchDiv.append(ul);

            // clickされた時の処理
            child_Div.addEventListener("click", () => {
                ul.style.display = (ul.style.display === "none") ? "block" : "none";
            });
        }

    }

}