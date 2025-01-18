export function generateUniqueFilename(file: File) {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return `${uniqueSuffix}_${file.name}`;
}
