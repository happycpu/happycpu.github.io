async function encryptText() {
    const key = new Uint8Array([0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30, 0x31, 0x32, 0x33, 0x34, 0x36, 0x38]);
    const iv = new Uint8Array([0x65, 0x66, 0x71, 0x64, 0x61, 0x73, 0x64, 0x66, 0x33, 0x34, 0x7A, 0x78, 0x65, 0x72, 0x66, 0x65]);
    
    const inputText = document.getElementById('inputText').value;
    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);

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
