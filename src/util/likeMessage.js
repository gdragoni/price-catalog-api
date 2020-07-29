const { like } = require("../controller/Product");

const likeMessage = (likes, userLiked) => {
    if(userLiked && likes && likes.length == 2) {
        return `Você e outra pessoa curtiu esse produto`;
    } else if(userLiked && likes && likes.length == 1) {
        return "Você curtiu esse produto";
    } else if(userLiked && likes && likes.length > 2) {
        return `Você e outros ${likes.length-1} curtiram esse produto`;
    } else if(!userLiked && likes && likes.length > 1) {
        return `${likes.length} curtiram esse produto`;
    } else if(!userLiked && likes && likes.length == 1) {
        return `1 pessoa curtiu esse produto`;
    } else if(likes.length == 0) {
        return "Ninguém curtiu esse produto ainda";
    }
    return "Ninguém curtiu esse produto ainda";
}

module.exports = likeMessage;