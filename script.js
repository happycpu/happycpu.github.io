async function encryptText() {
    const keyText = document.getElementById('keyText').value;
    const key = new TextEncoder().encode(keyText);

    const iv = new Uint8Array([0x65, 0x66, 0x71, 0x64, 0x61, 0x73, 0x64, 0x66, 0x33, 0x34, 0x7A, 0x78, 0x65, 0x72, 0x66, 0x65]);
    
    let inputText = document.getElementById('inputText').value;
    inputText = pad(inputText);

    const data = new TextEncoder().encode(inputText);

    const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        key,
        { name: "AES-CBC" },
        false,
        ["encrypt"]
    );

    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-CBC", iv: iv },
        cryptoKey,
        data
    );

    const encryptedArray = new Uint8Array(encrypted);
    const base64String = btoa(String.fromCharCode(...encryptedArray));
    
    document.getElementById('outputText').value = base64String;
}

function pad(input) {
    let padded = input;
    const paddedLength = 16 - (input.length % 16);
    if (paddedLength !== 0) {
        padded += String.fromCharCode(0).repeat(paddedLength);
    }
    return padded;
}
