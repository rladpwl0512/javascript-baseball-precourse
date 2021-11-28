import { $ } from "./utils/dom.js"
import { createAnswer } from "./createAnswer.js"

export default function BaseballGame() {
  let computerNumber = createAnswer(); 
  
  this.play = (computerInputNumbers, userInputNumbers) => {
    printResult(computerInputNumbers, userInputNumbers);
  };

  const printError = (userInput) => {
    if(userInput.has(NaN)) {
      alert("잘못 입력하였습니다❗️ 숫자를 입력하세요.");
    } else if((userInput.size !== 3) && ($("#user-input").value.length ===3)) {
      alert("잘못 입력하였습니다❗️ 중복되지 않는 숫자를 입력하세요.");
    } else if(userInput.has(0)) {
      alert("잘못 입력하였습니다❗️ 0을 제외한 1~9까지의 수만 입력하세요.");
    } else if($("#user-input").value.length !== 3) {
      alert("잘못 입력하였습니다❗️ 3개의 숫자를 입력하세요.");
    }
    $("#user-input").value = '';
    $("#result").innerHTML = '';
  }

  const countAnswer = (computerInputNumbers, userInputNumbers) => {
    // strike 수 
    const strike = computerInputNumbers.reduce((acc, num, i) => {
      if(num === userInputNumbers[i]) {
        acc += 1;
      }
      return acc;
    }, 0);

    // ball 수 
    const ball = computerInputNumbers.reduce((acc, num, i) => {
      if((userInputNumbers.indexOf(num) !== i) && (userInputNumbers.indexOf(num) !== -1)) {
        acc += 1;
      }
      return acc;
    }, 0);

    return [strike, ball];
  }

  const printResult = (computerInputNumbers, userInputNumbers) => {
    const [strike, ball] = countAnswer(computerInputNumbers, userInputNumbers);
    if(strike === 3) {
      $("#result").innerHTML = 
      `<strong>🎉 정답을 맞추셨습니다! 🎉</strong>
      <p id="restart">
        <span id="restart-message">게임을 새로 시작하시겠습니까?</span>
        <button id="game-restart-button">게임 재시작</button>
      </p>` 
      return;
    }
    if(!strike && !ball) {
      $("#result").innerText = "낫싱";
      return;
    }
    $("#result").innerText = `${ball? ball + '볼' : ''} ${strike? strike + '스트라이크' : ''}`;
  }

  const isVaildNum = () => {
    //유효하지 않은 경우 (에러메시지)
    const userInput = new Set([...$("#user-input").value.split('').map(num => Number(num))]);
    
    if(userInput.has(0) || userInput.has(NaN) || $("#user-input").value.length !== 3) {
      printError(userInput);
      return;
    }

    //유효한 경우 (결과 출력)
    this.play(computerNumber, [...userInput]);
  };

  const restartGame = () => {
    computerNumber = createAnswer();
    $("#result").innerHTML = '';
    $("#user-input").value = '';
  };

  $("#input-form").addEventListener("submit", e => {
    e.preventDefault();
    isVaildNum();
  })

  $("#result").addEventListener("click", e => {
    if (e.target.id === "game-restart-button") {
      restartGame();
    }
  });
} 

new BaseballGame();