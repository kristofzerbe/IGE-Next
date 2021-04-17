//-------------------------------------------------------------------------
// HELPER...
function createElementFromHtml(html) {
  //> https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
  let e = document.createElement("template");
  e.innerHTML = html.trim();
  return e.content.firstChild;
}
//-------------------------------------------------------------------------
// SCROLL
function throttle(fn, wait) {
  var time = Date.now();
  return function (e) {
    if (time + wait - Date.now() < 0) {
      fn(e);
      time = Date.now();
    }
  };
}
function scrollDetect() {
  let scrollY = window.scrollY;
  window.addEventListener("scroll", throttle(handleScroll, 10));

  function handleScroll(e) {
    if (window.scrollY <= 10) {
      document.body.removeAttribute("data-scroll");
    } else {
      if (window.scrollY > scrollY) {
        document.body.setAttribute("data-scroll", "DOWN");
      } else if (window.scrollY < scrollY) {
        document.body.setAttribute("data-scroll", "UP");
      }
    }
    scrollY = window.scrollY;
  }
}
scrollDetect();

//-------------------------------------------------------------------------
// MENU TOGGLE
let menuButton = document.getElementById("menu-toggle");
let main = document.getElementsByTagName("main")[0];
function toggleMenu() {
  if (menuButton.classList.contains("open")) {
    document.body.classList.remove("menu-open");
    menuButton.className = menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    main.removeEventListener("click", toggleMenu, true);
  } else {
    document.body.classList.add("menu-open");
    menuButton.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
    main.addEventListener("click", toggleMenu, true);
  }
}
menuButton.addEventListener("click", toggleMenu, true);

//-------------------------------------------------------------------------
// MENU ITEM SETUP
document.querySelectorAll("nav ul#menu li a").forEach(function (item) {
  item.addEventListener("click", function (e) {
    let entry = this.closest("LI");
    let list = entry.closest("UL");
    let next = this.nextElementSibling;
    if (next && next.tagName === "UL") {
      e.preventDefault();
      console.log("toggle " + entry.dataset.menuItem);
      if (list.dataset.menuOpen === entry.dataset.menuItem) {
        list.dataset.menuOpen = null;
      } else {
        list.dataset.menuOpen = entry.dataset.menuItem;
      }
    }
  });
});
//-------------------------------------------------------------------------
// DROP-SHADOW IMAGES
document.querySelectorAll("img.drop-shadow").forEach(function(item) {
  // const widthFactor = 0.9;
  // const shiftTopFactor = 0.15;
  // const shiftLeftFactor = (1 - widthFactor) / 2;
  
  let wrapper = createElementFromHtml('<div class="shadow-wrapper"></div>');

  item.classList.forEach(function(c) {
    if (c != "drop-shadow") wrapper.classList.add(c);
  });
  wrapper.style.width = item.clientWidth + "px";
  wrapper.style.height = item.clientHeight + "px";

  wrapper.insertAdjacentHTML("beforeend", item.outerHTML);

  let shadow = item.cloneNode();
  shadow.classList.remove("drop-shadow");
  shadow.classList.add("shadow");
  wrapper.insertAdjacentHTML("beforeend", shadow.outerHTML);

  item.outerHTML = wrapper.outerHTML;
});

