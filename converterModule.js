const fs = require('fs');

let textFromFile;
let textFileAsArray = [];
let setUp = true;
let convertedText;
let family = false;

const peopleTags = ['<people>', '</people>'];
const personTags = ['<person>','</person>'];
const nameTags = ['<firstname>', '</firstname>', '<lastname>', '</lastname>'];
const phoneTags = ['<phone>', '</phone>', '<mobile>', '</mobile>', '<home>', '</home>'];
const addressTags = ['<address>', '</address>', '<street>', '</street>', '<city>', '</city>', '<zipcode>', '</zipcode>'];
const familyTags = ['<family>', '</family>', '<name>', '</name>', '<born>', '</born>'];

const init = () => {
  cleanData();
  readFile();
  splittingTextFile();
  getTagsAndArgs();
}

//Clean data from last run
const cleanData = () => {
  convertedText = '';
  textFromFile = '';
  textFileAsArray.length = 0;
  setUp = true;
  family = false;
}

//Get the text file
const readFile = () => {
  try {
    const data = fs.readFileSync('./client/src/assets/uploads/konvertera.txt', 'utf8')
    textFromFile = data;
    console.log('Converting to XML')
  } catch (err) {
    console.error(err)
  }
}

/**
 * Split and clean the textfile into array of strings
 */
const splittingTextFile = () => {
  //Split the text file to an array  at each linebreak
  let arr = textFromFile.split('\r')
  //Remove new-lite statement in each string and push it to new array
  for(let i = 0; i < arr.length; i++){
    textFileAsArray.push(arr[i].replace('\n', ''));
  }
}

/**
 * Split the strings to get tags and args and sends to the xml string builder
 */
const getTagsAndArgs = () => {
  //For each string in the array, split to get the tags and args
  for(let i = 0; i < textFileAsArray.length; i++){
    let [tag, ...args] = textFileAsArray[i].split('|');
    //Send the tags and args to the xml string builder
    xmlStringBuilder(tag, args);
  }
  //When array/file is finished, send an exit tag to "close" the xml
  xmlStringBuilder('Exit')
  //When finsished, send the build xml string to the file-writer
  setTimeout(() => writeTheFile(convertedText), 1500);
}

/**
 * Takes xml strings from the builder and adds to final string
 * @param {xml string} input 
 */
 const buildAString = (input) => {
  convertedText = convertedText.concat(input)
}

/**
 * Takes the xml-converted string and writes it to a file
 * @param {Converted string} convertedText 
 */
const writeTheFile = (convertedText) => {
  fs.writeFile('./client/src/assets/exports/konverterad.xml', convertedText, {flag: 'w'}, (err) => {
    if (err) throw err;
    console.log('XML file is written')
  })
}

const xmlStringBuilder = (tag, ...args) => {
  //If tag is P - F - Exit and Family true, close </family> and set family to false
  if((tag === 'P' && family) || (tag === 'F' && family) || (tag === 'Exit' && family)){
    buildAString(`\n\t\t${familyTags[1]}`)
    family =!family
  }
  //Set family tag to true
  if(tag === 'F'){
    family = !family;
  }
  switch(tag) {
    case 'P':
      if(setUp){
        //Start with <people> and <person>
        buildAString(`${peopleTags[0]}\n\t${personTags[0]}\n\t\t${nameTags[0]}${args[0][0]}${nameTags[1]}\n\t\t${nameTags[2]}${args[0][1]}${nameTags[3]}`);
        setUp = false;
      } else {
        //If seconds or later P-tag end the last </person> and start a new <person>
        buildAString(`\n\t${personTags[1]}\n\t${personTags[0]}\n\t\t${nameTags[0]}${args[0][0]}${nameTags[1]}\n\t\t${nameTags[2]}${args[0][1]}${nameTags[3]}`);
      }
      break;

    case 'T':
      if(family) {
        //Case its family add a little more indenting
        buildAString(`\n\t\t\t${phoneTags[0]}\n\t\t\t\t${phoneTags[2]}${args[0][0]}${phoneTags[3]}\n\t\t\t\t${phoneTags[4]}${args[0][1]}${phoneTags[5]}\n\t\t\t${phoneTags[1]}`);
      } else {
        buildAString(`\n\t\t${phoneTags[0]}\n\t\t\t${phoneTags[2]}${args[0][0]}${phoneTags[3]}\n\t\t\t${phoneTags[4]}${args[0][1]}${phoneTags[5]}\n\t\t${phoneTags[1]}`);
      }
      break;

    case 'A':
      if(family) {
        //Case its family add a little more indenting
        buildAString(`\n\t\t\t${addressTags[0]}\n\t\t\t\t${addressTags[2]}${args[0][0]}${addressTags[3]}\n\t\t\t\t${addressTags[4]}${args[0][1]}${addressTags[5]}\n\t\t\t\t${addressTags[6]}${args[0][2]}${addressTags[7]}\n\t\t\t${addressTags[1]}`);
      } else {
        buildAString(`\n\t\t${addressTags[0]}\n\t\t\t${addressTags[2]}${args[0][0]}${addressTags[3]}\n\t\t\t${addressTags[4]}${args[0][1]}${addressTags[5]}\n\t\t\t${addressTags[6]}${args[0][2]}${addressTags[7]}\n\t\t${addressTags[1]}`);
      }
      break;

    case 'F':
      buildAString(`\n\t\t${familyTags[0]}\n\t\t\t${familyTags[2]}${args[0][0]}${familyTags[3]}\n\t\t\t${familyTags[4]}${args[0][1]}${familyTags[5]}`);
      break;

    case 'Exit':
      buildAString(`\n\t${personTags[1]}\n${peopleTags[1]}`);
      break; 
  }
}
  
exports.init = {init};