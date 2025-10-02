
export async function fetch_json(code) {
    const response = await fetch("./data/partner_data.json");
    const companies = await response.json();
    const input = normalizeText(code);

    // codeに一致する証券コードがあるかを判定→あればコードを会社名に変換して主要取引先から探す。なければ会社名として扱い検索
    const exactMatchcode = companies.find(c => c["証券コード"] == input)
    if (exactMatchcode) {
        var company_name = exactMatchcode["企業名"];
        var candidates = get_company_list(companies, company_name);
    }
    else {
        var candidates = get_company_list(companies, input);
    }
    
    return candidates

}

// 全角・半角、大文字、小文字をそろえる関数
function normalizeText(str) {
    if (str == null) return "";
    return str
        .normalize("NFKC")
        .toUpperCase()
        .trim();
}

// 会社名から主要取引先内にあるデータを取得する関数
function get_company_list(companies, company_name) {
    const candidates = new Map();
    companies.forEach(element => {
        element["主要取引先"].forEach(c => {
            const json_name = normalizeText(c["取引先名"]);
            if (json_name.includes(company_name)) {
                if (!candidates.has(c["取引先名"])) {
                    candidates.set(c["取引先名"], []);
                }
                candidates.get(c["取引先名"]).push({
                    証券コード: element["証券コード"],
                    企業名: element["企業名"],
                    割合: c["割合"]
                });
            }
        });
    });

    candidates.forEach((arr, key) => {
        arr.sort((a, b) => b["割合"] - a["割合"]);
    });
    return candidates;

}
