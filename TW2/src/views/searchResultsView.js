function SearchResultsView(props){
    
    return (
        <div>
            {props.searchResults.map(doArrayRenderingACB)}
        </div>
    )

    
    function doArrayRenderingACB(dish){
        function openDishACB(){
            props.openDishACB(dish);
        }
       return( <span onClick={openDishACB} class = "searchResult" >
            <img src={"https://spoonacular.com/recipeImages/" + dish.image} height= "100" onClick={openDishACB}/>
            <div onClick={openDishACB}>{dish.title}</div>
    </span>
    )
        function openDishACB(){
             //console.log("bashar");
            props.searchResultChosen(dish);
         }

    }
  

   
}


export default SearchResultsView;