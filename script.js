class Segment {
    constructor(p0, p1, dir) {
        this.p0 = p0;
        this.p1 = p1;
        this.dir = dir;
    }

    Length() {
        var dx = this.p0.x - this.p1.x;
        var dy = this.p0.y - this.p1.y;
        return Math.hypot(dx, dy);
    }
}

class Snake {
    constructor() {
        this.speed = 5;
        this.width = 10;
        this.color = '#0000FF';
        this.segments = [
            new Segment(
                { x: 100, y: 100 },
                { x: 60, y: 100 },
                { x: 1, y: 0 }
            ),
            new Segment(
                { x: 60, y: 100 },
                { x: 60, y: 10 },
                { x: 0, y: 1 }
            )
        ];
    }

    GetFirstSegment() {
        return this.segments[0];
    }

    GetLastSegment() {
        return this.segments[this.segments.length - 1];
    }


    // Makes one step of the snake
    Step() {
        var seg0 = this.GetFirstSegment();
        var dx = this.speed * seg0.dir.x;
        var dy = this.speed * seg0.dir.y;
        seg0.p0.x += dx;
        seg0.p0.y += dy;

        var seg1 = this.GetLastSegment();
        var dx = this.speed * seg1.dir.x;
        var dy = this.speed * seg1.dir.y;
        seg1.p1.x += dx;
        seg1.p1.y += dy;
        if (seg1.Length() < 5) {
            this.segments.pop();
        }
    }

    // Returns true if a head the snake is inside the box
    InsideBox(box) {
        var x = this.segments[0].p0.x;
        var y = this.segments[0].p0.y;
        return x >= 0
            && x <= box.width
            && y >= 0
            && y <= box.height;
    }
}

class Game {
    constructor() {
        this.box = document.getElementById('box');
        this.graphics = box.getContext('2d');
        this.snake = new Snake();
    }

    Step() {
        this.snake.Step();
        if (!this.snake.InsideBox(this.box)) {
            this.Stop();
        }
    }

    // Draws all items in the game
    Draw() {
        this.graphics.clearRect(0, 0, this.box.width, this.box.height);
        this.graphics.beginPath();
        this.graphics.lineWidth = this.snake.width;
        this.graphics.strokeStyle = this.snake.color;
        for (var i = 0; i < this.snake.segments.length; i++) {
            var seg = this.snake.segments[i];
            this.graphics.moveTo(seg.p0.x, seg.p0.y);
            this.graphics.lineTo(seg.p1.x, seg.p1.y);
            this.graphics.stroke();
        }
        this.graphics.closePath();
    }

    Process() {
        this.Step();
        this.Draw();
    }

    Start() {
        this.timer = setInterval(this.Process.bind(this), 100);
    }

    Stop() {
        clearInterval(this.timer);
        alert('Game over!');
    }
}

$(function () {
    var game = new Game();
    game.Start();
});
