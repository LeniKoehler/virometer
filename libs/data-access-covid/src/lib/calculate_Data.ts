/**
 * checks if the given value is a number
 * @param value the value to check
 */
export function isNumber(value) {

    return !isNaN(value);

}

//the umlaute to replace
const umlautMap = {
    '\u00dc': 'UE',
    '\u00c4': 'AE',
    '\u00d6': 'OE',
    '\u00fc': 'ue',
    '\u00e4': 'ae',
    '\u00f6': 'oe',
    '\u00df': 'ss',
}

/**
 * replaces whitspaces with underscores and umlaute with their double-letter counterparts e.g. ä -> ae
 * @param str the string to clear
 */
export function cleanString(str: string) {

    //remove Umlaute
    let myString = str
        .replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, (a) => {
            const big = umlautMap[a.slice(0, 1)];
            return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1);
        })
        .replace(new RegExp('[' + Object.keys(umlautMap).join('|') + ']', "g"),
            (a) => umlautMap[a]
        );

    //remove whiteSpaces
    myString = myString.replace(/\s/g, "_");

    return myString;
}