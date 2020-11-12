const MAX_RGB = 255;
const RED = 0;
const GREEN = 1;
const BLUE = 2;
const HEX = 16;
const DEC = 10;

export function calculatedLightnessColor(color: string, value: number) {
  if (value > 1 || value < -1) {
    return color;
  }
  const hsl = convertRGBToHSL(color.substring(1, 3), color.substring(3, 5), color.substring(5, 7));
  return convertHSLToRGB(hsl.h, hsl.s, hsl.l + value);
}

function convertRGBToHSL(r: string, g: string, b: string) {
  const normalizedDecColorsRGB = [convertToDec(r), convertToDec(g), convertToDec(b)];
  const xMin = Math.min(...normalizedDecColorsRGB);
  const xMax = Math.max(...normalizedDecColorsRGB);
  const delta = xMax - xMin;
  let l = (xMax + xMin) / 2;
  let h;
  let s;

  if (delta === 0) {
    s = 0;
    h = 0;
  } else {
    s = delta / (1 - Math.abs(2 * l - 1));
  }
  if (xMax === normalizedDecColorsRGB[RED]) {
    h = 60 * (((normalizedDecColorsRGB[GREEN] - normalizedDecColorsRGB[BLUE]) / delta) % 6);
  } else if (xMax === normalizedDecColorsRGB[GREEN]) {
    h = 60 * (((normalizedDecColorsRGB[BLUE] - normalizedDecColorsRGB[RED]) / delta) + 2);
  } else if (xMax === normalizedDecColorsRGB[BLUE]) {
    h = 60 * (((normalizedDecColorsRGB[RED] - normalizedDecColorsRGB[GREEN]) / delta) + 4);
  }
  return { h, s, l };
}

function convertHSLToRGB(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = l - c / 2;
  let rgb_params = [0, 0, 0];
  if (h >= 0 && h < 60) {
    rgb_params = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    rgb_params = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    rgb_params = [0, c, x];
  } else if (h >= 180 && h < 240) {
    rgb_params = [0, x, c];
  } else if (h >= 240 && h < 300) {
    rgb_params = [x, 0, c];
  } else if (h >= 300 && h < 360) {
    rgb_params = [c, 0, x];
  }
  const red = (denormalizeValue(rgb_params[RED], m)).toString(HEX);
  const green = (denormalizeValue(rgb_params[GREEN], m)).toString(HEX);
  const blue = (denormalizeValue(rgb_params[BLUE], m)).toString(HEX);

  return `#${red}${green}${blue}`;
}

function convertToDec(value: string) {
  return parseInt(value, HEX) / MAX_RGB;
}

function denormalizeValue(value: number, m: number) {
  return Math.round((value + m) * MAX_RGB);
}
