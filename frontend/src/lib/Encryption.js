export function makeKeys() {
  return window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048, //can be 1024, 2048, or 4096
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"],
  );
}

export function encryptData(keys, data) {
  const textEncoded = new TextEncoder().encode(data);
  return crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    keys.publicKey,
    textEncoded,
  );
}

export async function decryptData(data, keys) {
  return await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    keys.privateKey,
    data,
  );
}
