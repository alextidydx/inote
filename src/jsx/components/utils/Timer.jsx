class Timer {
	id = 0
	total = 30
	current = 0
	interval = 1000/30
	fps = 30;
	progress = null
	finished = null

	constructor(_total, _fps) {
		this.total = _total;
		this.interval = 1000/_fps;
		this.fps = _fps;
	}

	start = () => {
		this.id = setInterval(this.onTimer, this.interval);
	}

	stop = () =>  {
		clearInterval(this.id);
		this.id = 0;
	}

	onTimer = () =>  {
		if (this.progress) {this.progress(this)}
		this.current++;
		if (this.current == this.total) {
			if (this.finished) {this.finished(this)}
			this.stop();
		}
	}

	reset = function()  {
		stop();
		this.current = 0;
	}
}

export default Timer;