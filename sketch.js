let bird,
pipes = [],
score = 0,
highscore = 0,
pause = false;

function setup(){
    createCanvas(430, 500);
    highscore = localStorage.getItem('highscore');
    bird = new Bird();
    pipes = [];
    pipes.push(new Pipe());
}

function draw(){
    background('#72C4D0');

    for(let i = pipes.length - 1; (i >= 0) || pause; i--){
        pipes[i].show();
        pipes[i].update();

        if(pipes[i].hits(bird)){
            pause = true;
            if(score > highscore){
                localStorage.setItem('highscore', score);
                highscore = score;
            }
            background('#72C4D0');
            fill(0,0,0);
            textFont('Ariel',45);
            text("GAME OVER", 80,100);
            text(`Your score is: ${score}`, 70,150);
            text(`The highscore is: ${highscore}`, 35,200);
            textFont('Ariel',25);
            fill('#75BE2F');
            text("Please press R to start again.", 80,230);
            score = 0;
        }

        if(pipes[i].offscreen()){
            pipes.splice(i, 1);
            score++;
        }
    }
    fill(255);
    textFont('Ariel',40);
    text(score, 205,45);
    
    !pause && bird.update();
    !pause && bird.show();

    if(frameCount % 70 === 0){
        pipes.push(new Pipe());
    }   
}

function keyPressed(){
    console.log(key);
    if(key === ' '){
        bird.up();
    }
    if(key === 'R'){
        pause && location.reload();
    }
}