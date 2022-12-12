function loadPins() {
    return JSON.parse(localStorage.getItem('pins'));
}

function savePins(pins) {
    localStorage.setItem('pins', JSON.stringify(pins));
}

function numUnregisteredPins() {
    let savedPins = loadPins();
    if (savedPins != null) {
        return savedPins.length;
    }
    return 0;
}

function extractPinsWithCode(raw) {
    let pinWithCodeRe = /\d{4}-\d{4}-\d{4}-\d{4}_\d+|\d{16}_\d+/g;
    let pinWithCodeMatches = raw.match(pinWithCodeRe);
    return pinWithCodeMatches;
}

function extractPinsOnly(raw) {
    let pinOnlyRe = /\d{4}-\d{4}-\d{4}-\d{4}|\d{16}/g;
    let pinOnlyMatches = raw.match(pinOnlyRe);
    return pinOnlyMatches;
}

function extractGiftPins(raw) {
    let pinCodeMatches = extractPinsWithCode(raw);
    if (pinCodeMatches != null) {
        return pinCodeMatches;
    }

    let pinOnlyMatches = extractPinsOnly(raw);
    if (pinOnlyMatches != null) {
        alert('각 핀의 인증번호 추출에 실패하였습니다. 인증번호 부분만 직접 입력해주세요.');
        return pinOnlyMatches;
    }

    return null;
}

function checkUnregisteredPins() {
    let num = numUnregisteredPins();
    if (num > 0) {
        return confirm(`[위험] 아직 등록하지 않은 핀 ${num}개가 있습니다. 모두 지우고 계속할까요?`);
    }
    return true;
}

if (checkUnregisteredPins()) {
    let raw = prompt('데이터를 입력하세요.');
    let pins = extractGiftPins(raw);
    if (pins != null) {
        savePins(pins);
        alert(`핀번호 ${pins.length}개를 저장하였습니다.`);
    } else {
        alert(`핀을 찾지 못하였습니다.`);
    }
}
