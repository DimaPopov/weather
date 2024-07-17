
export const translateLetter = (text) => {
  const alphabet = {
    'a': 'а', 'b': 'б', 'c': 'ц', 'd': 'д', 'e': 'е', 'f': 'ф', 'g': 'г',
    'h': 'х', 'i': 'и', 'j': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н',
    'o': 'о', 'p': 'п', 'q': 'к', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у',
    'v': 'в', 'w': 'в', 'x': 'кс', 'y': 'ы', 'z': 'з',
    ' ': ' ',
  };

  let translatedText = '';

  text = text.replace('sh', 'ш');
  text = text.replace('ch', 'ч');

  for (let i = 0; i < text.length; i++) {
    const letter = text[i].toLowerCase();
    translatedText += alphabet[letter] || letter;
  }

  return translatedText;
}
