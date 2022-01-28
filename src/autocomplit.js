// module.exports = {
    
    // createAutoComplete(arr) {
    //     return (str = '') => {
    //         const processedStr = str.trim().toLowerCase();
    //         if (processedStr.length > 0) {
    //             return arr.filter(el => el.slice(0, processedStr.length).toLowerCase() === processedStr);
    //         }
    //         return [];
    //     };
    // },

    // дерево построено в нижнем регистре поэтому для его например 'AL' и 'Al' один и тот же узел и первые два теста на перфоманс не проходит 
    // т.к. сначало в массиве будут все слова ниже найденного узла например al... а патом  Aabenraa
    //  а должно быть AL.., Aabenraa, Al.. . Не придумал как решить эту проблему.
    //'AL-khashā upper', 'Al-Hamdaniya', 'Al-Masayel', 'Al-Medy Village', 'Aabenraa' ---prefix tree -false
    //'AL-khashā upper', 'Aabenraa', 'Al-Hamdaniya', 'Al-Masayel', 'Al-Medy Village'  ---filter -true
    
    // class Node {
    //     constructor() {
    //         this.keys = new Map();
    //         this.end = false;
    //         this.word = null;
    //         this.howManyWords = 0;
    //     }
    //     setEnd(fullWord) {
    //         this.end = true;
    //         this.word = fullWord;
    //         this.howManyWords += 1;
    //     }
    //     isEnd() {
    //         return this.end;
    //     }
    // }
    
    
    // createAutoComplete: function(arr) {
    //     const root = new Node();

    //     const addToTree = function(input, node, fullWord) {
    //         if (input.length === 0) {
    //             node.setEnd(fullWord);
    //             return;
    //         } else if (!node.keys.has(input[0])) {
    //             node.keys.set(input[0], new Node());
    //             return addToTree(input.substr(1), node.keys.get(input[0]), fullWord);
    //         } else {
    //             return addToTree(input.substr(1), node.keys.get(input[0]), fullWord);
    //         }
    //     };
        
    //     arr.forEach(word => {
    //         const lowerCaseWord = word.toLowerCase().trim();
    //         addToTree(lowerCaseWord, root, word);
    //     });

    //     return (str = '') => {
    //         const innerTrimedLowerStr = str.trim().toLowerCase();
    
    //         const findSuitableWords = (str) => {
    //             if (str.length === 0) return [];
    //             const lastNode = findNodeOfTheFinalLetter(str);
    //             if (lastNode === null)  return [];
          
    //             return findWordsBelowNode(lastNode);
    //         };

    //         const findNodeOfTheFinalLetter = function(word) {
    //             let node = root;
    //             while (word.length > 0) {
    //                 if (!node.keys.has(word[0])) {
    //                     return null;
    //                 } else {
    //                     node = node.keys.get(word[0]);
    //                     word = word.substr(1);
    //                 }
    //             }
                
    //             return node;
    //         };
            
    //         const findWordsBelowNode = function(currentNode) {
    //             const words = new Array();
    //             const search = function(node) {
    //                 if (node.isEnd()) {
    //                     let i = node.howManyWords;
    //                     while (i > 0) {
    //                         words.push(node.word);
    //                         i--;
    //                     }
    //                 }
    //                 if (node.keys.size !== 0) {
    //                     // const keys = Array.from(node.keys.keys()).sort();
    //                     const keys = node.keys.keys();
    //                     for (let letter of keys) {
    //                         search(node.keys.get(letter));
    //                     }
    //                 } 
    //             };
    //             search(currentNode);

    //             return words.length > 0 ? words : [];
    //         };
          
    //         return findSuitableWords(innerTrimedLowerStr);
    //     };
    // }


    // Асинхронный вариант

    // createAutoComplete(arr) {

    //     const asyncSerch = async (serchStr, arr, sizeOfChunk) => {
    //         const procesedStr = serchStr.trim().toLowerCase();
    //         console.time('timer');
    //         const rest = arr.length % sizeOfChunk;
          
    //         let res = [];
          
    //         if (sizeOfChunk > arr.length) {
    //           const currentRes = arr.filter((word) => procesedStr === word.slice(0, procesedStr.length).toLowerCase())
    //           res.push(...currentRes);
    //           console.timeEnd('timer');
    //           return res;
    //         }
          
    //         const abstrackArr = new Array(Math.floor(arr.length / sizeOfChunk)).fill(null);
          
    //         abstrackArr.reduce((prom, item, i) => {
    //           const currentIndex = i * sizeOfChunk;
    //           const currentChunk =  arr.slice(currentIndex, currentIndex + sizeOfChunk);
    //           prom.then(() => {
    //             const currentRes = currentChunk.filter((word) => procesedStr === word.substring(0, procesedStr.length).toLowerCase())
    //             res.push(...currentRes);
    //           })
    //           return prom;
    //         }, Promise.resolve());
          
    //         console.timeEnd('timer');
    //         return res;
    //       }

    //     return (str = '') => {
    //         const processedStr = str.trim().toLowerCase();
            
    //         asyncSerch(str, arr, 100000)
    //     };
    // }
// };

export function createEngine(arr) {
    return (str = '') => {
        const processedStr = str.trim().toLowerCase();
        if (processedStr.length > 0) {
            return arr.filter(el => el.slice(0, processedStr.length).toLowerCase() === processedStr);
        }
        return [];
    };
}