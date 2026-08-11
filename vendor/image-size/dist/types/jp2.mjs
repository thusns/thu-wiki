// lib/types/utils.ts
var decoder = new TextDecoder();
var toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
var getView = (input, offset) => new DataView(input.buffer, input.byteOffset + offset);
var readUInt32BE = (input, offset = 0) => getView(input, offset).getUint32(0, false);
function readBox(input, offset) {
  // Need full box header (size + type). Reject truncated headers.
  if (input.length - offset < 8) return;
  let boxSize = readUInt32BE(input, offset);
  // ISO BMFF: size 0 means the box extends to the end of the file.
  // Treating 0 as a literal length never advances callers and causes DoS
  // (CVE-2025-71329 / GHSA-5p2g-fcmc-qvqq, CVE-2025-71330).
  if (boxSize === 0) {
    boxSize = input.length - offset;
  }
  if (boxSize < 8) return;
  if (input.length - offset < boxSize) return;
  return {
    name: toUTF8String(input, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(input, boxName, currentOffset) {
  while (currentOffset < input.length) {
    const box = readBox(input, currentOffset);
    if (!box) break;
    if (box.name === boxName) return box;
    currentOffset += box.size;
  }
}

// lib/types/jp2.ts
var JP2 = {
  validate(input) {
    const boxType = toUTF8String(input, 4, 8);
    if (boxType !== "jP  ") return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    const brand = toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12);
    return brand === "jp2 ";
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

export { JP2 };
