let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  prevX = 0;
  prevY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {

    /* ================= MOUSE (LAPTOP) ================= */

    document.addEventListener("mousemove", (e) => {
      if (!this.holdingPaper) return;

      const dx = e.clientX - this.prevX;
      const dy = e.clientY - this.prevY;

      this.currentPaperX += dx;
      this.currentPaperY += dy;

      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    });

    paper.addEventListener("mousedown", (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
    });

    /* ================= TOUCH (MOBILE FIX) ================= */

    paper.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;

      this.prevX = e.touches[0].clientX;
      this.prevY = e.touches[0].clientY;
    }, { passive: false });

    paper.addEventListener("touchmove", (e) => {
      if (!this.holdingPaper) return;
      e.preventDefault();

      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      const dx = x - this.prevX;
      const dy = y - this.prevY;

      this.currentPaperX += dx;
      this.currentPaperY += dy;

      this.prevX = x;
      this.prevY = y;

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    }, { passive: false });

    paper.addEventListener("touchend", () => {
      this.holdingPaper = false;
    });
  }
}

document.querySelectorAll(".paper").forEach(paper => {
  new Paper().init(paper);
});
