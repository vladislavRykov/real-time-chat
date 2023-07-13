import tinycolor2 from 'tinycolor2';

const getCorrectInx = (charCode: number) => {
  return charCode > 255 ? 255 : charCode < 0 ? 0 : charCode;
};

export const getAvatarColorFromHash = (hash: string) => {
  const [r, g, b] = hash
    .substring(0, 3)
    .split('')
    .map((char) => getCorrectInx(char.charCodeAt(0)));
  const color = tinycolor2({ r, g, b }).toHexString();
  const colorLighten = tinycolor2({ r, g, b }).lighten(30).toHexString();
  return { colorLighten, color };
};
