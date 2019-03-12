
export const replaceAt = (string, index, replacement) => {
  return string.substr(0, index) + replacement+ string.substr(index + replacement.length);
}

export const replaceFromTo = (string, start, end, replacement) => {
  let newString = string;
  for (let index = start; index < end; index++) {    
    newString = replaceAt(newString, index, replacement);
  }
  return newString;
}