function game2Screen() {
    this._planet = new planet();
    this._glifeBar = new lifeBar(new vector2(0, 0), new color(0, 255, 0), 1);
    this._vlifeBar = new lifeBar(new vector2(0, HEIGHT - 25), new color(255, 0, 0), 1);
    this._ast = new asteroid();
    this._world = new world(this._ast);
    this._sprites = new Array(this._planet, this._ast);
    this._wtext = new text("Nice", new vector2(WIDTH / 2.0, HEIGHT / 2.0), new color(0, 255, 0), 50);
    this._ltext = new text("Baddie", new vector2(WIDTH / 2.0, HEIGHT / 2.0), new color(255, 0, 0), 50);
	this._pause = false;
	
	this.nextButton = new defaultButton(new vector2(0.15*WIDTH, 0.15*HEIGHT), WIDTH*.15, HEIGHT*.1667, "Next", function() {
		mainHost.navigate(end);
	} );
	
	this.retryButton = new defaultButton(new vector2(0.15*WIDTH, 0.15*HEIGHT), WIDTH*.15, HEIGHT*.1667, "Retry", function() {
		mainHost.navigate(lev2);
	} );
	
    this.update = function () {
        if (this._ast.life > 0 && this._planet.life > 0) {
            this._world.update();
            for (var i = 0; i < this._sprites.length; i++) {
                this._sprites[i].update();
            }
            this._vlifeBar.update(this._planet.life / this._planet.mxLife);
            this._glifeBar.update(this._ast.life / this._ast.mxLife);
        }
        else {
            this._wtext.update();
            this._ltext.update();
			if (this._ast.life <= 0) {
				this.retryButton.update();
			}
			if (this._planet.life <= 0) {
				this.nextButton.update();
			}
        }
    }
    this.draw = function () {
        for (var i = this._sprites.length - 1; i >= 0; i--) {
            this._sprites[i].draw();
        }
        this._vlifeBar.draw();
        this._glifeBar.draw();
        if (this._ast.life <= 0) {
            this._ltext.draw();
			this.retryButton.draw();
			game = new gameScreen();
			b = true;
        }
        else if (this._planet.life <= 0) {
            this._wtext.draw();
			this.nextButton.draw();
        }
    }
}