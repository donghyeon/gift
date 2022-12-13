function loadPins() {
    return JSON.parse(localStorage.getItem('pins'));
}

function savePins(pins) {
    localStorage.setItem('pins', JSON.stringify(pins));
}

function removePins() {
    localStorage.removeItem('pins');
}

function numUnregisteredPins() {
    let savedPins = loadPins();
    if (savedPins != null) {
        return savedPins.length;
    }
    return 0;
}

async function enterHappyMoneyPin(row, pin, code) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let keypad = document.querySelector('div[id^=mtk_originalName][style*="display: block"]');

            let encryptedPin = pin.slice(0, 4);
            for (let j = 0; j < 4; j++) {
                let num = encryptedPin[j];
                keypad.querySelector(`img[alt="${num}"]`).closest('div.dv_transkey_div2').onmousedown();
            }

            row.querySelector('input[id^=originalName2]').value = pin.slice(4, 8);
            row.querySelector('input[id^=originalName3]').value = pin.slice(8, 12);
            row.querySelector('input[id^=originalName4]').value = pin.slice(12, 16);
            row.querySelector('input[id^=expire]').value = code;
            resolve(true);
        }, 100);
    });

    await promise;
}

async function enterHappyMoneyPins(numPinsToEnter) {
    let pins = loadPins();

    let rows = document.querySelectorAll('section.chargeOne');
    for (let i = 0; i < numPinsToEnter; i++) {
        let pinWithCode = pins[i].split('_');
        let pin = pinWithCode[0];
        var code = '';
        if (pinWithCode.length == 2) {
            code = pinWithCode[1];
        }

        let row = rows[i];
        row.querySelector('input[id^=originalName1]').onfocus();

        await enterHappyMoneyPin(row, pin, code);
    }
}

function deleteEnteredPins(numEnteredPins) {
    let pins = loadPins();

    if (numEnteredPins == pins.length) {
        removePins();
    } else {
        let restPins = pins.slice(numEnteredPins);
        savePins(restPins);
    }

    return numEnteredPins;
}

let num = numUnregisteredPins();
if (num === 0) {
    alert('저장된 핀이 없습니다. 등록할 핀을 먼저 추출해주세요.');
} else {
    let pins = loadPins();
    let numPinsToEnter = Math.min(pins.length, 5);
    
    for (let i = 0; i < numPinsToEnter - 2; i++) {
        document.querySelector('button.addSectionBtn').click();
    }

    enterHappyMoneyPins(numPinsToEnter).then(() => {
        deleteEnteredPins(numPinsToEnter);
        alert(`저장된 ${num}개의 핀 중 ${numPinsToEnter}개를 입력 후 저장목록에서 삭제하였습니다.`);
    });
}
