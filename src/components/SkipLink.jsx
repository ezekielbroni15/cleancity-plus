"use client";

export default function SkipLink() {
  const skipToMain = (event) => {
    const main = document.getElementById("main-content");
    if (!main) return;

    event.preventDefault();
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: "start" });
    window.history.replaceState(null, "", "#main-content");
  };

  return (
    <a className="skip-link" href="#main-content" onClick={skipToMain}>
      Skip to main content
    </a>
  );
}
