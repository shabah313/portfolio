// پنجره پیش‌نمایش پروژه‌ها و گواهینامه‌ها
// برای اضافه کردن چند عکس به یک پروژه، مسیرهای عکس را در data-images
// با کاما جدا کنید، مثال: data-images="imag/a.png, imag/b.png, imag/c.png"
(function () {
  var modal = document.getElementById("preview-modal");
  var gallery = document.getElementById("modal-gallery");
  var galleryHint = document.getElementById("modal-gallery-hint");
  var titleEl = document.getElementById("modal-title");
  var descEl = document.getElementById("modal-desc");
  var demoBtn = document.getElementById("modal-demo");
  var closeBtn = document.getElementById("modal-close");
  var lastFocused = null;

  function openModal(card) {
    var images = (card.dataset.images || "")
      .split(",")
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
    var title = card.dataset.title || "";
    var desc = card.dataset.desc || "";
    var demo = card.dataset.demo || "";
    var demoLabel = card.dataset.demoLabel || "مشاهده دمو";

    titleEl.textContent = title;
    descEl.textContent = desc;

    gallery.innerHTML = "";
    images.forEach(function (src) {
      var img = document.createElement("img");
      img.src = src;
      img.alt = title;
      img.loading = "lazy";
      gallery.appendChild(img);
    });
    galleryHint.hidden = images.length < 2;

    if (demo) {
      demoBtn.href = demo;
      demoBtn.textContent = demoLabel;
      demoBtn.style.display = "inline-block";
    } else {
      demoBtn.style.display = "none";
    }

    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-locked");
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-locked");
    if (lastFocused) lastFocused.focus();
  }

  document
    .querySelectorAll(".project-card, .certificate-card")
    .forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest("a")) return; // اجازه بده لینک "مشاهده دمو"/"مشاهده مدرک" عادی کار کنه
        openModal(card);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(card);
        }
      });
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
    });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
})();
