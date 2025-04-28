// scriptt.js

document.addEventListener("DOMContentLoaded", function () {
  // --- Initialize AOS (Animate On Scroll) ---
  AOS.init({
    duration: 700, // Slightly longer duration
    once: true,
    offset: 80, // Trigger slightly later
    // disable: 'mobile'
  });

  // --- Intersection Observer for Skill Bar Animations ---
  const skillCircles = document.querySelectorAll(".progress-circle");

  if (skillCircles.length > 0) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const circle = entry.target;
            const progressElement = circle.querySelector(
              ".progress-circle-progress"
            );
            const svgElement = circle.querySelector(".progress-svg"); // Get SVG element
            const percentage = circle.dataset.percentage || 0;
            const colorVar = circle.dataset.colorVar || "--accent-1"; // Get color variable name from data attribute
            const offset = 100 - percentage;

            // **NEW**: Set the CSS variable for the progress color & shadow
            if (svgElement) {
              svgElement.style.setProperty(
                "--progress-color",
                `var(${colorVar})`
              );
            }

            if (progressElement) {
              progressElement.style.strokeDashoffset = offset;
            }

            const textElement = circle.querySelector(".percentage-value");
            if (textElement) {
              let current = 0;
              const target = parseInt(percentage);
              if (isNaN(target) || target < 0) {
                textElement.textContent = 0;
                observer.unobserve(circle);
                return;
              }

              const increment = Math.max(target / 75, 0.5);
              const intervalTime = 20;

              const updateText = () => {
                current += increment;
                if (current >= target) {
                  textElement.textContent = target;
                  clearInterval(interval);
                } else {
                  textElement.textContent = Math.ceil(current);
                }
              };
              textElement.textContent = 0;
              const interval = setInterval(updateText, intervalTime);
            }

            observer.unobserve(circle);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    skillCircles.forEach((circle) => {
      const textElement = circle.querySelector(".percentage-value");
      if (textElement) textElement.textContent = 0;
      skillObserver.observe(circle);
    });
  }

  // --- Footer v2 Animations ---
  const footerV2 = document.getElementById("footer-v2");
  if (footerV2) {
    const wordSpans = footerV2.querySelectorAll(".footer-title .word-span");
    const socialIcons = footerV2.querySelectorAll(".social-icon-item");
    const languageLogos = footerV2.querySelectorAll(".language-logo-item");
    const copyrightText = footerV2.querySelector(".copyright-text-v2");
    const currentYearSpan = document.getElementById("current-year");

    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }

    if (
      wordSpans.length > 0 ||
      socialIcons.length > 0 ||
      languageLogos.length > 0 ||
      copyrightText
    ) {
      const footerObserverOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      };

      const footerCallback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            wordSpans.forEach((span, index) =>
              setTimeout(() => span.classList.add("word-visible"), index * 150)
            );
            socialIcons.forEach((icon, index) =>
              setTimeout(
                () => icon.classList.add("social-icon-visible"),
                300 + index * 100
              )
            );
            languageLogos.forEach((logo, index) =>
              setTimeout(
                () => logo.classList.add("logo-visible"),
                600 + index * 80
              )
            );
            if (copyrightText)
              setTimeout(() => copyrightText.classList.add("visible"), 1000);
            observer.unobserve(footerV2);
          }
        });
      };
      const footerObserver = new IntersectionObserver(
        footerCallback,
        footerObserverOptions
      );
      footerObserver.observe(footerV2);
    }
  }

  // --- Scroll To Top Button ---
  const scrollTopBtn = document.querySelector(".scroll-to-top");

  if (scrollTopBtn) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 400) {
          // Show after scrolling a bit more
          scrollTopBtn.classList.add("visible");
        } else {
          scrollTopBtn.classList.remove("visible");
        }
      },
      { passive: true }
    );

    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}); // End DOMContentLoaded
