import { API_KEY, BASE_URL } from "./apiConfig";

function treatHTTPResponseACB(response){
    if(!response.ok) throw new Error("API problem "+response.status);
        return response.json();
    }

function transformSearchResultACB(data){
    return data.results;
}
    
function getDishDetails(id){
    return fetch(BASE_URL+'recipes/'+id+'/information',
                {  // object literal
        "method": "GET",              // HTTP method
        "headers": {                  // HTTP headers, also object literal
        'X-Mashape-Key': API_KEY,
        "x-rapidapi-host": 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        } // end of headers object
    }/* end of second fetch parameter, object */
    )
    .then(treatHTTPResponseACB); // lagt till den raden...
    }

function searchDishes(params){
    return fetch(BASE_URL+'recipes/search?' + new URLSearchParams(params),
    {  // object literal
"method": "GET",              // HTTP method
"headers": {                  // HTTP headers, also object literal
'X-Mashape-Key': API_KEY,
"x-rapidapi-host": 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
} // end of headers object
}/* end of second fetch parameter, object */
)
.then(treatHTTPResponseACB).then(transformSearchResultACB);
}

export {getDishDetails, searchDishes};