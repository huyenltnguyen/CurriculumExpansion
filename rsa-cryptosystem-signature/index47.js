const firstPrime = 2;
const secondPrime = 5;
const N = firstPrime * secondPrime;
const phiOfN = (firstPrime - 1) * (secondPrime - 1);
let publicKey = 0;

function hashTheMessage(message) {
  let hashValue = 0;
  for (let i = 0, msgLength = message.length; i < msgLength; ++i) {
    hashValue += message.charCodeAt(i);
  }
  return hashValue % N;
}

function isCoPrime(smallerNum, largerNum) {
  for (let i = 2; i <= smallerNum; ++i) {
    if (smallerNum % i === 0 && largerNum % i === 0) {
      return false;
    }
  }
  return true;
}

function generatePrivateKey() {
  for (let privateKey = 2; privateKey < phiOfN; ++privateKey) {
    if (isCoPrime(privateKey, N) && isCoPrime(privateKey, phiOfN)) {
      return privateKey;
    }
  }

  console.log("Private key can't be generated.");
  return 0;
}

function generatePublicKey(privateKey) {
  while (privateKey) {
    if ((publicKey * privateKey) % phiOfN === 1 && privateKey !== publicKey) {
      return;
    }
    ++publicKey;
  }

  console.log("Public key can't be generated.");
}

function generateSignature(hashValue, privateKey) {
  return Math.pow(hashValue, privateKey) % N;
}

function decryptSignature(digitalSignature) {
  return Math.pow(digitalSignature, publicKey) % N;
}

function sendMsgToBob(message) {
  const privateKey = generatePrivateKey();
  generatePublicKey(privateKey);
  const hashValue = hashTheMessage(message);
  const generatedSignature = generateSignature(hashValue, privateKey);
}

function sendAndVerify(digitalSignature, message) {
  const hashValue = hashTheMessage(message);
  /*
  Do you remember that Alice's signature was the encrypted hash value of message?

  So when Bob decrypts the signature using Alice's public key, he should get the original hash value of the message.

  Call the `decryptSignature()` function and pass it `digitalSignature` as an argument.
  Store the returned value as a constant named `decryptedSignature`.
*/
}
