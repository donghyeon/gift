async function enterPin(pin, row, code) {
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

async function enterAvailablePins() {
    let hmJson = JSON.parse(localStorage.getItem('hmJson'));
    let pins = hmJson['pins'];

    for (let i = 2; i < 5; i++) {
        document.querySelector('button.addSectionBtn').click();
    }

    let rows = document.querySelectorAll('section.chargeOne');

    for (let i = 0; i < Math.min(pins.length, 5); i++) {
        let pin = pins[i];
        let code = '20220701';
        let row = rows[i];
        row.querySelector('input[id^=originalName1]').onfocus();

        await enterPin(pin, row, code);
        popPin();
    }
}

function canLoadLocalStorage() {
    let hmJson = localStorage.getItem('hmJson');
    if (hmJson === null) {
        return false;
    } else {
        return true;
    }
}

function loadUnregisteredPins() {
    let hmJson = JSON.parse(localStorage.getItem('hmJson'));
    return hmJson['pins'];
}

function saveUnregisteredPins() {
    let hmJson = prompt('JSON 형식으로 입력하세요.');
    localStorage.setItem('hmJson', hmJson);
}

function popPin() {
    let hmJson = JSON.parse(localStorage.getItem('hmJson'));
    let pins = hmJson['pins'];
    hmJson['pins'] = pins.slice(1);
    localStorage.setItem('hmJson', JSON.stringify(hmJson));
}

if (canLoadLocalStorage() && loadUnregisteredPins().length > 0) {
    enterAvailablePins();
} else {
    saveUnregisteredPins();
}
