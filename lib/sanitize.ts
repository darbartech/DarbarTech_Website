const ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};

const ESCAPE_RE = /[&<>"'/]/g;

export function escapeHtml(input: string): string {
  return input.replace(ESCAPE_RE, (ch) => ENTITY_MAP[ch] ?? ch);
}

const ALLOWED_TAGS = new Set([
  "p", "b", "i", "em", "strong", "a", "ul", "ol", "li",
  "br", "h1", "h2", "h3", "h4", "h5", "h6", "span", "div",
  "table", "thead", "tbody", "tr", "th", "td", "img", "blockquote",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target"]),
  img: new Set(["src", "alt", "width", "height"]),
  span: new Set(["class"]),
  div: new Set(["class"]),
  td: new Set(["colspan", "rowspan"]),
  th: new Set(["colspan", "rowspan"]),
};

const PROTOCOL_RE = /^(https?|mailto|tel):/i;
const JS_RE = /javascript:/i;

function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  if (JS_RE.test(trimmed)) return "";
  if (!PROTOCOL_RE.test(trimmed) && !trimmed.startsWith("/")) return "";
  return trimmed;
}

export function sanitizeHtml(dirty: string): string {
  const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
  const attrRe = /([a-zA-Z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g;

  return dirty.replace(tagRe, (match, tagName: string) => {
    const tag = tagName.toLowerCase();
    const isClosing = match.startsWith("</");

    if (isClosing) {
      return ALLOWED_TAGS.has(tag) ? `</${tag}>` : "";
    }

    if (!ALLOWED_TAGS.has(tag)) return "";

    const allowed = ALLOWED_ATTRS[tag] ?? new Set<string>();
    let attrs = "";

    let attrMatch: RegExpExecArray | null;
    while ((attrMatch = attrRe.exec(match)) !== null) {
      const name = attrMatch[1].toLowerCase();
      const value = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? "";

      if (!allowed.has(name)) continue;

      if (name === "href" || name === "src") {
        const clean = sanitizeUrl(value);
        if (!clean) continue;
        attrs += ` ${name}="${escapeHtml(clean)}"`;
      } else {
        attrs += ` ${name}="${escapeHtml(value)}"`;
      }
    }

    return `<${tag}${attrs}>`;
  });
}
