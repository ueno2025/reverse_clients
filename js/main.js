import {fetch_json} from "./fetch.js";
import {render_data} from "./render.js";


async function main() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    
    if (code) {
        const candidates = await fetch_json(code);
        render_data(candidates, code);
    }
    else {
        const resultDiv = document.getElementById("text_result");
        resultDiv.innerHTML = "<p>証券コード、もしくは企業名を入力してください。"
    }
    
}


window.addEventListener("DOMContentLoaded", () => {
    main();
});