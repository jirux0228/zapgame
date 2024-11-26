const gameArea = document.getElementById('gameArea');
const caughtBugsDisplay = document.getElementById('caughtBugs');
let caughtBugs = 0;
const bugImages = ['bug1.png', 'bug2.png', 'bug3.png', 'bug4.png', 'bug5.png']; // 벌레 이미지 배열

// 벌레 생성 함수
function createBug() {
    const bug = document.createElement('div');
    bug.classList.add('bug');

    // 랜덤으로 벌레 이미지 선택
    const randomIndex = Math.floor(Math.random() * bugImages.length);
    bug.style.backgroundImage = `url(${bugImages[randomIndex]})`;

    // 초기 위치 설정
    bug.style.left = `${Math.random() * (gameArea.offsetWidth - 50)}px`;
    bug.style.top = `${Math.random() * (gameArea.offsetHeight - 50)}px`;

    // 즉시 벌레 움직임 추가 (랜덤 속도로)
    moveBug(bug);
    gameArea.appendChild(bug);

    // 벌레 클릭 시
    bug.addEventListener('click', (event) => {
        const x = event.clientX;
        const y = event.clientY;

        // 벌레 클릭 시 효과 발생
        createEffect(x, y);

        // 벌레 제거 및 점수 업데이트
        bug.remove();
        caughtBugs++;
        caughtBugsDisplay.textContent = caughtBugs;
    });


}

// 벌레를 부드럽게 움직이기 (랜덤한 속도 설정)
function moveBug(bug) {
    const randomSpeed = Math.random() * 3 + 2; // 2초에서 5초 사이의 랜덤 속도
    bug.style.transition = `left ${randomSpeed}s linear, top ${randomSpeed}s linear`;

    // 위치를 일정 시간마다 부드럽게 변경
    setInterval(() => {
        bug.style.left = `${Math.random() * (gameArea.offsetWidth - 50)}px`;
        bug.style.top = `${Math.random() * (gameArea.offsetHeight - 50)}px`;
    }, randomSpeed * 1000);
}

// 효과 생성 함수
function createEffect(x, y) {
    const effect = document.createElement('div');
    effect.classList.add('effect');
    effect.style.left = `${x - 90}px`; // 효과가 벌레 중심에 위치하도록 조정
    effect.style.top = `${y - 150}px`;

    // 게임 영역의 크기 내에서 이펙트가 잘리지 않도록 제한
    if (effect.offsetLeft < 0) effect.style.left = '0px'; // 왼쪽 경계
    if (effect.offsetTop < 0) effect.style.top = '0px';   // 상단 경계
    if (effect.offsetLeft > gameArea.offsetWidth - 80) effect.style.left = `${gameArea.offsetWidth - 80}px`; // 오른쪽 경계
    if (effect.offsetTop > gameArea.offsetHeight - 80) effect.style.top = `${gameArea.offsetHeight - 80}px`; // 하단 경계

    gameArea.appendChild(effect);

    // 애니메이션이 끝난 후 효과 제거
    setTimeout(() => {
        effect.remove();
    }, 500); // 0.5초 후 제거
}

// 일정 시간마다 새로운 벌레 생성
setInterval(createBug, 2000); // 1초마다 벌레 생성
