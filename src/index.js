if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  //help and guidance https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
  const container = document.createElement("div");
  container.className = "container";

  for (let i = 0; i < 5; i++) {
    addWikiItem(i);
  }

  async function addWikiItem(i) {
    const breedArr = ["Akita", "Boxer", "Setter", "Shiba", "Saluki"];
    let dataPromise = await fetch(
      "https://dog.ceo/api/breed/" +
        breedArr[i].toLowerCase() +
        "/images/random"
    );
    let dataJSON = await dataPromise.json();

    let infoPromise = await fetch(
      "https://en.wikipedia.org/api/rest_v1/page/summary/" +
        breedArr[i].toLowerCase()
    );
    let infoJSON = await infoPromise.json();

    let txt = "";
    let fragment = document.createDocumentFragment();

    let div = document.createElement("div");
    div.className = "wiki-item";
    fragment.appendChild(div);

    let h1 = document.createElement("h1");
    h1.className = "wiki-header";
    txt = document.createTextNode(breedArr[i]);
    h1.appendChild(txt);
    div.appendChild(h1);

    let div1 = document.createElement("div");
    div1.className = "wiki-content";
    div.appendChild(div1);

    let p = document.createElement("p");
    p.className = "wiki-text";
    txt = document.createTextNode(infoJSON.extract);
    p.appendChild(txt);
    div1.appendChild(p);

    let div2 = document.createElement("div");
    div2.className = "img-container";
    div1.appendChild(div2);

    let img = document.createElement("img");
    img.className = "wiki-img";
    img.src = dataJSON.message;
    div2.appendChild(img);

    container.appendChild(fragment);
    const element = document.getElementById("app");
    element.appendChild(container);
  }
}
