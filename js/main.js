const header = document.querySelector(".header");
const hamburger = document.querySelector(".hamburger-btn");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const backdrop = document.querySelector(".backdrop");
const search = document.querySelector(".search");
const headerNav = document.querySelector(".header__nav");
const main = document.querySelector(".main");
const footerThumbMenu = document.querySelector(".footer-thumbmenu");
const loadSection = document.querySelector(".latest__grid");

/*=== Hamburger Menu ===*/
let isHamburgerMenuOpen = false;
header.addEventListener("click", (e) => {
  if (e.target === hamburger && isHamburgerMenuOpen) {
    isHamburgerMenuOpen = !isHamburgerMenuOpen;
    hamburger.classList.remove("open");
    hamburgerMenu.classList.add("collapse");
    backdrop.style.display = "none";
  } else {
    if (e.target === hamburger && !isHamburgerMenuOpen) {
      isHamburgerMenuOpen = !isHamburgerMenuOpen;
      hamburger.classList.add("open");
      hamburgerMenu.classList.remove("collapse");
      backdrop.style.display = "block";
    }
  }
  if (e.target === backdrop) {
    hamburger.classList.remove("open");
    hamburgerMenu.classList.add("collapse");
    backdrop.style.display = "none";
  }
  e.stopPropagation();
});

/*=== SearchField ===*/
search.addEventListener("click", (e) => {
  let openSearch = false;
  const searchtarget = e.target.nextElementSibling;
  if (!openSearch) {
    openSearch = searchtarget;
    openSearch.classList.toggle("hidden");
  } else {
    if (searchtarget === openSearch) {
      searchtarget.classList.toggle("hidden");
    }
  }

  if (isHamburgerMenuOpen) {
    hamburger.classList.remove("open");
    hamburgerMenu.classList.add("collapse");
    backdrop.style.display = "none";
  }
  e.stopPropagation();
});

/*=== Change activestate of NavMenu items ===*/
let btns = headerNav.getElementsByClassName("nav-btn");

headerNav.addEventListener("click", (e) => {
  if (e.target.className.includes("nav-btn")) {
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  }
  e.stopPropagation();
});

/*=== Hide top Menu During Scroll ===*/
window.addEventListener("scroll", (e) => {
  const top = window.scrollY;
  if (top >= 50) {
    header.classList.add("scroll");
  }
  if (top <= 50) {
    header.classList.remove("scroll");
  }
  e.stopPropagation();
});

/*===  Toggle shareLink  ===*/
main.addEventListener("click", (e) => {
  let shareLink = false;
  const linktarget = e.target.nextElementSibling;
  const elemClass = e.target.className.includes("fa-share-alt");
  if (!shareLink && elemClass) {
    shareLink = linktarget;
    shareLink.classList.toggle("hidden");
  } else {
    if (shareLink === linktarget) {
      linktarget.classList.toggle("hidden");
    }
  }
  e.stopPropagation();
});

/*=== Mobile footer thumbmenu Scroll===*/
let lastScrollTop = 10;
window.addEventListener(
  "scroll",
  function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      footerThumbMenu.style.visibility = "hidden";
    } else {
      footerThumbMenu.style.visibility = "visible";
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  },
  false
);

/*=== Change activestate of footerThumbMenu links ===*/

function changeThumbMenuColor(e) {
  let btns = footerThumbMenu.getElementsByClassName("btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].classList.remove("active");
      this.className += " active";
    });
  }
  e.stopPropagation();
}
footerThumbMenu.addEventListener("click", changeThumbMenuColor);

//loadMore Functionality

let loadItems = loadSection.querySelectorAll(".card-1");
const loadMoreBtn = document.querySelector(".load-btn");
let maxItems = 10;
let hiddenClass = "visually-hidden";

[].forEach.call(loadItems, function (item, idx) {
  if (idx > maxItems - 1) {
    item.classList.add(hiddenClass);
  }
});

loadMoreBtn.addEventListener("click", function () {
  [].forEach.call(
    document.querySelectorAll("." + hiddenClass),
    function (item, idx) {
      if (idx < maxItems - 1) {
        item.classList.remove(hiddenClass);
      }

      if (document.querySelectorAll("." + hiddenClass).length === 0) {
        loadMoreBtn.style.display = "none";
      }
    }
  );
});
