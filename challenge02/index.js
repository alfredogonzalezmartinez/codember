const encryptedMessage =
  "11610497110107115 102111114 11210897121105110103 9911110010110998101114 11210810197115101 11510497114101";

const wordSeparator = " ";
const lowercaseLetterAsciiCode = /9[7-9]|1[0-1][0-9]|12[0-7]/g;

const message = encryptedMessage
  .split(wordSeparator)
  .map((word) => word.match(lowercaseLetterAsciiCode))
  .map((word) => String.fromCharCode(...word))
  .join(" ");

console.log(message);
