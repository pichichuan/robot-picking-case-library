const search = document.querySelector("#case-search");
const buttons = [...document.querySelectorAll("[data-filter]")];
const cases = [...document.querySelectorAll(".case-link")];
const result = document.querySelector("#result-count");
let activeType = "all";

function refresh() {
  const query = search.value.normalize("NFKC").trim().toLowerCase();
  let visible = 0;
  for (const item of cases) {
    const text = item.textContent.normalize("NFKC").toLowerCase();
    const matches = (activeType === "all" || item.dataset.type === activeType) && text.includes(query);
    item.closest("li").hidden = !matches;
    if (matches) visible++;
  }
  result.textContent = visible === 0 ? "没有匹配的案例" : `显示 ${visible} 条案例`;
}

search.addEventListener("input", refresh);
for (const button of buttons) {
  button.addEventListener("click", () => {
    activeType = button.dataset.filter;
    for (const filter of buttons) filter.setAttribute("aria-pressed", String(filter === button));
    refresh();
  });
}