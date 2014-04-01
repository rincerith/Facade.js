var tick = new Facade.Line({
        x: stage.width() / 2,
        y: stage.height() / 2,
        anchor: 'top/center'
    }),
    clock_face = new Facade.Circle({
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 350,
        fillStyle: '#fff',
        strokeStyle: '#000',
        strokeWidth: 10,
        anchor: 'center'
    }),
    clock_hand_anchor = new Facade.Circle({
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 15,
        fillStyle: '#000',
        anchor: 'center'
    });

stage.draw(function () {

    var date = new Date(),
        current_second = date.getSeconds(),
        current_minute = date.getMinutes(),
        current_hour = date.getHours() % 12,
        r;

    this.clear();

    this.addToStage(clock_face);

    // Every Minutes
    for (r = 6; r < 360; r = r + 6) {
        this.addToStage(tick, {
            y1: -325,
            y2: -350,
            lineWidth: 5,
            rotate: r
        });
    }

    // Every Five Minutes
    for (r = 0; r < 360; r = r + 30) {
        this.addToStage(tick, {
            y1: -300,
            y2: -350,
            lineWidth: 10,
            rotate: r
        });
    }

    // Hour Hand
    this.addToStage(tick, {
        y2: -200,
        lineWidth: 15,
        rotate: (current_hour + current_minute / 60) * 30
    });

    // Minute Hand
    this.addToStage(tick, {
        y2: -280,
        lineWidth: 10,
        rotate: current_minute * 6
    });

    // Second Hand
    this.addToStage(tick, {
        y2: -370,
        lineWidth: 5,
        strokeStyle: '#f00',
        rotate: current_second * 6
    });

    this.addToStage(clock_hand_anchor);

    updatefps();

});
