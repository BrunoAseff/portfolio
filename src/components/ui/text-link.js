// Reuse the application's .text-link + .contact-destination component contract.
// The shared app stylesheet owns underline geometry, layers, timing and hover.
export function prepareTextLink(link, { inline = false } = {}) {
  link.classList.remove("document-link");
  link.classList.add("text-link");
  if (inline) link.classList.add("inline-text-link");
  let label = link.querySelector(".contact-destination,.link-label");
  if (label) {
    label.classList.remove("link-label");
    label.classList.add("contact-destination");
  } else {
    label = document.createElement("span");
    label.className = "contact-destination";
    label.textContent = link.textContent;
    link.replaceChildren(label);
  }
  return link;
}
for (const link of document.querySelectorAll("[data-landscape-credit]")) prepareTextLink(link);
