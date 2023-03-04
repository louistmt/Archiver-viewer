const { marked } = window;

const renderer = {
    // Block renderer methods

    code(code, infostring, escaped) {
        return code
    },
    blockquote(quote) {
        return quote
    },
    html(html) {
        return html
    },
    heading(text, level, raw, slugger) {
        return text
    },
    hr() {
        return "\n"
    },
    list(body, ordered, start) {
        return body
    },
    listitem(text, task, checked) {
        return text
    },
    checkbox(checked) {
        return ""
    },
    paragraph(text) {
        return text;
    },
    table(header, body) {
        return body;
    },
    tablerow(content) {
        return content;
    },
    tablecell(content, flags) {
        return content;
    },

    // Inline renderer methods

    strong(text) {
        return `<span class="bold">${text}</span>`;
    },
    em(text) {
        return `<span class="italic">${text}</span>`;
    },
    codespan(code) {
        return code
    },
    br() {
        return "\n"
    },
    del(text) {
        return text
    },
    link(href, title, text) {
        return text
    },
    image(href, title, text) {
        return text
    },
    text(text) {
        return text
    },
};
marked.use({renderer});

/**
 * 
 * @param {{ avatarUrl: string, username: string, content: string }[]} messages
 * @return {HTMLDivElement[]}
 */
function createContentDivs(messages) {
    const contentDivs = [];

    for (let {avatarUrl, username, content} of messages) {
        const divMsg = document.createElement("div");
        divMsg.classList.add("message");

        const img = document.createElement("img");
        img.src = avatarUrl;

        const divContent = document.createElement("div");
        divContent.classList.add("content");

        const h2 = document.createElement("h2");
        h2.innerText = username;

        const p = document.createElement("p");
        p.innerHTML = DOMPurify.sanitize(marked.parse(content));

        divContent.appendChild(h2);
        divContent.appendChild(p);
        
        divMsg.appendChild(img);
        divMsg.appendChild(divContent);

        contentDivs.push(divMsg);
    }

    return contentDivs;
}

const cdnPath = location.pathname.replace("/viewer/", "");

const jsonRequest = await fetch(`/api/${cdnPath}`);
const { name: title, messages } = await jsonRequest.json();

const h1 = document.createElement("h1");
h1.innerText = title;
const contentDivs = createContentDivs(messages);

document.body.appendChild(h1);

for (let div of contentDivs) {
    document.body.appendChild(div);
}