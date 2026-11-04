// ==========================================
// ۱. دکمه بازگشت به بالا (Back to Top)
// ==========================================
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  // اگر کاربر بیشتر از ۳۰۰ پیکسل اسکرول کرد، دکمه رو نشون بده
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  // اسکرول نرم به بالای صفحه
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ==========================================
// ۲. انیمیشن ظاهر شدن بخش‌ها هنگام اسکرول (Scroll Reveal)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // المان‌هایی که می‌خوایم با اسکرول ظاهر بشن
  const revealElements = document.querySelectorAll(
    "section h2, .about-content, .skills-container, .project-card, .certificate-card, .contact-subtitle, form, footer .footer-container",
  );

  // اضافه کردن کلاس اولیه برای مخفی شدن
  revealElements.forEach((el) => {
    el.classList.add("reveal");
  });

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100; // فاصله‌ای که بعد از اون المان ظاهر میشه

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
      }
    });
  };

  // اجرای اولیه (برای المان‌هایی که از قبل توی صفحه دیده میشن)
  revealOnScroll();

  // اجرای مجدد هنگام اسکرول
  window.addEventListener("scroll", revealOnScroll);
});
