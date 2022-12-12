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

function enterBookNLifePins(numPinsToEnter) {
    let pins = loadPins();

    let rows = document.querySelectorAll('tbody tr');
    for (let i = 0; i < numPinsToEnter; i++) {
        let pinWithCode = pins[i].split('_');
        let pin = pinWithCode[0];
        var code = '';
        if (pinWithCode.length == 2) {
            code = pinWithCode[1];
        }
        
        let row = rows[i];

        let pinno1 = row.querySelector('input.pinno1');
        let pinno2 = row.querySelector('input.pinno2');
        let pinno3 = row.querySelector('input.pinno3');
        let pinno4 = row.querySelector('input.pinno4');
        let pincode = row.querySelector('input.pincode');

        pinno1.value = pin.slice(0, 4);
        pinno2.value = pin.slice(4, 8);
        pinno3.value = pin.slice(8, 12);
        pinno4.value = pin.slice(12, 16);
        pincode.value = code;
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
    let numPinsToEnter = Math.min(pins.length, 20);
    
    for (let i = 0; i < numPinsToEnter - 5; i++) {
        document.querySelector('button.btnPlus').click();
    }
    enterBookNLifePins(numPinsToEnter);
    deleteEnteredPins(numPinsToEnter);

    alert(`저장된 ${num}개의 핀 중 ${numPinsToEnter}개를 입력 후 저장목록에서 삭제하였습니다.`);
}
