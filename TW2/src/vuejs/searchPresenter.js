import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData";

function SearchPresenter(props){
    if (!props.model.searchResultsPromiseState.promise) props.model.doSearch();

    return (<div><SearchFormView dishTypeOptions = {["starter", "main course","dessert"]} 
                                 setSearchText = {searchTextACB} 
                                 setSearchDishType = {searchDishTypeACB}
                                 searchNow = {searchACB}/>

     {promiseNoData(props.model.searchResultsPromiseState) || (<SearchResultsView searchResults={props.model.searchResultsPromiseState.data}
                                                                                  searchResultChosen = {searchResultACB}/>)}
        </div>
    );
    function searchTextACB(text){
        props.model.setSearchQuery(text);
    }

    function searchDishTypeACB(type){
        props.model.setSearchType(type);
    }

    function searchACB(){
        props.model.doSearch(props.model.searchParams);
    }

    function searchResultACB(dish){
        props.model.setCurrentDish(dish.id);
    }

}

export default SearchPresenter;

