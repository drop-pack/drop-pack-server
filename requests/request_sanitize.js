const pathSanitizeSlashREGEXP = /[\/]/
const pathSanitizeDotREGEXP = /^[.]/


/**
 * Returns true if path doesnt contain illegal characters else it will return false
 *
 * @param {String} [path] The string to check
 * @api private
 * @return {Boolean}
 */

function sanitizePath(path) {

    if(pathSanitizeSlashREGEXP.test(path) === true || pathSanitizeDotREGEXP.test(path) === true){
        return false
    }
    else{
        return true
    }
}
module.exports={
    sanitizePath,
    pathSanitizeDotREGEXP,
    pathSanitizeSlashREGEXP
}