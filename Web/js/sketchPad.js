class SketchPad {
  constructor(container, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
            background-color:white;
            box-shadow: 0 0 10px 2px black;
        `;
    container.appendChild(this.canvas);

    const lineBreak = document.createElement("br");
    container.appendChild(lineBreak);
    this.undoBtn = document.createElement("button");
    this.undoBtn.innerHTML = "UNDO";
    this.undoBtn.disabled = true;
    container.appendChild(this.undoBtn);

    this.ctx = this.canvas.getContext("2d");
    this.paths = [];
    this.isDrawing = false;
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.onmousedown = (e) => {
      const mouse = this.#getMouse(e);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (e) => {
      if (!this.isDrawing) return;
      const mouse = this.#getMouse(e);

      this.paths[this.paths.length - 1].push(mouse);

      this.#redraw();
    };
    document.onmouseup = (e) => {
      this.isDrawing = false;
    };
    this.canvas.ontouchstart = (e) => {
      const loc = e.touches[0];
      this.canvas.onmousedown(loc);
    };
    this.canvas.ontouchmove = (e) => {
      const loc = e.touches[0];
      this.canvas.onmousemove(loc);
    };
    document.ontouchend = (e) => {
      this.canvas.onmouseup();
    };

    this.undoBtn.onclick = () => {
      this.paths.pop();
      this.#redraw();
    };
  }

  reset() {
    this.paths = [];
    this.isDrawing = false;
    this.#redraw();
  }

  #getMouse = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    const mouse = [
      Math.round(e.clientX - rect.left),
      Math.round(e.clientY - rect.top),
    ];
    return mouse;
  };

  #redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);
    if (this.paths.length > 0) {
      this.undoBtn.disabled = false;
    } else {
      this.undoBtn.disabled = true;
    }
  }
}
