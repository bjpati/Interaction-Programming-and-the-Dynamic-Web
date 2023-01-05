if (!["#search, #summary", "#details"].find(findHashCB))
        window.location.hash = "#search";

function findHashCB(){
    window.location.hash;
}