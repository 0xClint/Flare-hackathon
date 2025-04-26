export const shortenAddress = (address, length = 4) => {
  if (!address || address?.length < length * 2 + 2) {
    return "";
  }

  const start = address.slice(0, length);
  const end = address.slice(-length);

  return `${start}...${end}`;
};

export const reduceBigNumber = (rdnStr) => {
  const padded = rdnStr.padStart(78, "0");
  const chunks = [];

  for (let i = 0; i < 6; i++) {
    const chunk = padded.slice(i * 13, (i + 1) * 13);
    chunks.push(chunk);
  }

  return chunks;
};

export const applyMod = (num, mod = 5) => {
  return Number(BigInt(num) % BigInt(mod));
};

export const getRandomInteger = (length) => {
  return Math.floor(Math.random() * length);
};
