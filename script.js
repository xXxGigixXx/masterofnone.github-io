document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");
  console.log("JS loaded");
  const startBtn = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const gameArea = document.getElementById("game-area");
  const cat = document.getElementById("cat");
  const birdContainer = document.getElementById("bird-container");
  const bulletsContainer = document.getElementById("bullets");
  const levelInfo = document.getElementById("level-info");

  let level = 1;
  let birdSpeed = 8000;
  let birdsToSpawn = 3;
  let bulletCount = 4;

  function startGame() {
    startScreen.classList.add("hidden");
    gameArea.classList.remove("hidden");
    cat.style.left = "calc(50% - 60px)";
    setTimeout(spawnBirds, 2000);
  }

  function spawnBirds() {
    bulletsContainer.innerHTML = "";
    birdContainer.innerHTML = "";

    for (let i = 0; i < bulletCount; i++) {
      const bullet = document.createElement("img");
      bullet.src = "gun.png";
      bullet.classList.add("bullet");
      bulletsContainer.appendChild(bullet);
    }

    for (let i = 0; i < birdsToSpawn; i++) {
      const bird = document.createElement("img");
      bird.src = "bird.png";
      bird.classList.add("bird");
      bird.style.top = `${Math.random() * 300 + 50}px`;
      bird.style.animationDuration = `${birdSpeed}ms`;

      bird.addEventListener("click", () => {
        bird.remove();
        checkWin();
      });

      birdContainer.appendChild(bird);
    }

    document.addEventListener("click", useBullet);
  }

  function useBullet(e) {
    const bullets = document.querySelectorAll(".bullet");
    if (bullets.length > 0) {
      bullets[0].remove();
    }
    checkLose();
  }

  function checkWin() {
    const birds = document.querySelectorAll(".bird");
    if (birds.length === 0) {
      document.removeEventListener("click", useBullet);
      setTimeout(() => {
        nextLevel();
      }, 1000);
    }
  }

  function checkLose() {
    const bullets = document.querySelectorAll(".bullet");
    const birds = document.querySelectorAll(".bird");

    if (bullets.length === 0 && birds.length > 0) {
      alert("Game Over!");
      location.reload();
    }
  }

  function nextLevel() {
    level++;
    birdSpeed -= 1500;
    birdsToSpawn++;
    bulletCount = birdsToSpawn + 1;

    levelInfo.textContent = `Level ${level}`;
    spawnBirds();
  }

  startBtn.addEventListener("click", startGame);
});
