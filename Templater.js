/**
 * CSE186 Assignment 3 - Basic
 */
class Templater {
  /**
   * Replace the contents of {{ }} tagged table header and data
   * elements in document with values found in the supplied JSON
   * @param {object} document
   * @param {string} json with propeties matching tags in document
   * @return {undefined}
   */
  byTag(document, json) {
    if (document == undefined || json == undefined) {
      return undefined;
    }
    const parsedElements = document.querySelectorAll('th, td'); // NodeList
    console.log(parsedElements);
    const dictionaryJson = JSON.parse(json); // converts JSON to dictionary
    const array = Array.from(parsedElements);
    array.forEach((element) => {
      let newstring = element.textContent;
      newstring = newstring.replace('{{', '');
      newstring = newstring.replace('}}', '');
      // Grabs the value from the Json which is now a dictionary
      const dictValue = dictionaryJson[newstring];
      element.textContent = dictValue; // Changes text into new dictionary value
    });
  }

  /**
   * Replace the contents of table header and data elements in
   * in document with id'd content found in the supplied JSON
   * @param {object} document
   * @param {string} json with propeties matching element ids in document
   * @return {undefined}
   */
  byId(document, json) {
    if (document == undefined || json == undefined) {
      return undefined;
    }
    const parsedElements = document.querySelectorAll('th, td');
    const dictionaryJson = JSON.parse(json);
    const array = Array.from(parsedElements);
    array.forEach((element) => {
      const dictValue = dictionaryJson[element.id];
      console.log(dictValue);
      element.textContent = dictValue;
    });
  }
}
// To satisfy linter rules
new Templater();
