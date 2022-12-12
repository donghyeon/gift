const blJson = prompt('JSON 형식으로 입력하세요.');
const parsed = JSON.parse(blJson);
const pins = parsed['pins'];
const codes = parsed['codes'];
const rows = document.querySelectorAll('tbody tr');

for (let i = 0; i < pins.length; i++) {
    let pin = pins[i];
    let code = codes[i];
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
