async function incluirComponentes() {
    const includes = document.querySelectorAll("[data-include]");

    for (let el of includes) {
        const url = el.getAttribute("data-include");

        try {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error("Erro ao carregar " + url);

            const texto = await resp.text();

            // Cria documento temporário
            const parser = new DOMParser();
            const doc = parser.parseFromString(texto, "text/html");

            // pega só o conteúdo do BODY (ou o que existir)
            const conteudo =
                doc.body.innerHTML.trim() ||
                doc.documentElement.innerHTML.trim();

            el.innerHTML = conteudo;

        } catch (erro) {
            console.error(erro);
            el.innerHTML = "<p>Erro ao carregar componente.</p>";
        }
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", incluirComponentes);
} else {
    incluirComponentes();
}
