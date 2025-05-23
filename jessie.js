let highestZ = 1;

class Paper {
    holdingPaper = false;

    prevMouseX = 0;
    prevMouseY = 0;

    mouseX = 0;
    mouseY = 0;

    velocityX = 0;
    velocityY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {
        // Mouse Events
        paper.addEventListener('mousedown', (e) => {
            this.startDrag(e.clientX, e.clientY, paper);
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            this.onDrag(e.clientX, e.clientY, paper);
        });

        document.addEventListener('mouseup', () => {
            this.stopDrag();
        });

        // Touch Events
        paper.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.startDrag(touch.clientX, touch.clientY, paper);
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (!this.holdingPaper) return;
            const touch = e.touches[0];
            this.onDrag(touch.clientX, touch.clientY, paper);
        });

        document.addEventListener('touchend', () => {
            this.stopDrag();
        });
    }

    startDrag(x, y, paper) {
        this.holdingPaper = true;

        paper.style.zIndex = highestZ;
        highestZ += 1;

        this.prevMouseX = x;
        this.prevMouseY = y;
    }

    onDrag(x, y, paper) {
        if (this.holdingPaper) {
            this.mouseX = x;
            this.mouseY = y;

            this.velocityX = this.mouseX - this.prevMouseX;
            this.velocityY = this.mouseY - this.prevMouseY;

            this.currentPaperX += this.velocityX;
            this.currentPaperY += this.velocityY;

            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;

            paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
        }
    }

    stopDrag() {
        this.holdingPaper = false;
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});
