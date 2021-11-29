import { $ } from "./utils/dom.js"
import { createAnswer } from "./createAnswer.js"

export default function BaseballGame() {
  let computerNumber = createAnswer(); 
  
  this.play = (computerInputNumbers, userInputNumbers) => {
    if(!Array.isArray(computerInputNumbers) && !Array.isArray(userInputNumbers)) {
      computerInputNumbers = computerInputNumbers.toString().split('').map(v => Number(v));
      userInputNumbers = userInputNumbers.toString().split('').map(v => Number(v));
    }

    return getResult(computerInputNumbers, userInputNumbers);
  };
  
  const resetOutput = () => {
    $("#result").innerHTML = '';
    $("#user-input").value = '';
  }

  const isVaildNum = () => {
    const userInput = $("#user-input").value.split('').map(num => Number(num));
    if(userInput.includes(0) || userInput.includes(NaN) || userInput.length !== 3 ||  [...new Set(userInput)].length !== 3) {
      printError(userInput);
      return;
    }

    printResult(this.play(computerNumber, userInput));
  };

  const printError = (userInput) => {
    if(userInput.includes(NaN)) {
      alert("잘못 입력하였습니다❗️ 숫자를 입력하세요.");
    } else if(([...new Set(userInput)].length !== 3) && ($("#user-input").value.length === 3)) {
      alert("잘못 입력하였습니다❗️ 중복되지 않는 숫자를 입력하세요.");
    } else if(userInput.includes(0)) {
      alert("잘못 입력하였습니다❗️ 0을 제외한 1~9까지의 수만 입력하세요.");
    } else if(userInput.length !== 3) {
      alert("잘못 입력하였습니다❗️ 3개의 숫자를 입력하세요.");
    }
    resetOutput();
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

  const getResult = (computerInputNumbers, userInputNumbers) => {
    const [strike, ball] = countAnswer(computerInputNumbers, userInputNumbers);
    if(strike === 3) {
      return "정답";
    }
    if(!strike && !ball) {
      return "낫싱";
    }
    return `${ball? ball + '볼 ' : ''}${strike? strike + '스트라이크' : ''}`;
  }

  const printResult = (result) => {
    if(result === '정답') {
      $("#result").innerHTML = 
      `<strong>🎉 정답을 맞추셨습니다! 🎉</strong>
      <p id="restart">
        <span id="restart-message">게임을 새로 시작하시겠습니까?</span>
        <button id="game-restart-button">게임 재시작</button>
      </p>` 
      return;
    }
    $("#result").innerText = result;
  };



  const restartGame = () => {
    computerNumber = createAnswer();
    resetOutput();
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
