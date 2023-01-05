import SearchFormView from "../views/searchFormView";
import SearchResultsView from "../views/searchResultsView";
import promiseNoData from "../views/promiseNoData";
import resolvePromise from "../resolvePromise";
import {searchDishes} from "../dishSource";

/*function SearchPresenter(props){
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

export default SearchPresenter;*/

const searchPresenter={   // ordinary JS object literal, can have methods like render()
    props: ["model"],
    data(){ return {message: this.model, setSearchQuery:"", setSearchType:"", searchResultsPromiseState:{}};},
    created(){resolvePromise(searchDishes({}),this.searchResultsPromiseState);},
    methods:{
            searchTextACB(text){
                this.setSearchQuery = text;
        },
    
            searchDishTypeACB(type){
                this.setSearchType = type;
        },
    
            searchACB(){
                //this.message.doSearch({query:this.setSearchQuery, type:this.setSearchType});
                resolvePromise(searchDishes({query:this.setSearchQuery, type:this.setSearchType}),this.searchResultsPromiseState);
        },
    
            searchResultACB(dish){
                this.message.setCurrentDish(dish.id);
        },

    },
    render(){
               /* re-use the TW2 functional component code, but replace props with this! 
               Do not forget to bind the callbacks!         
                          onSomeCustomEvent={someACB.bind(this)}
    */

                          return (<div><SearchFormView dishTypeOptions = {["starter", "main course","dessert"]} 
                                                       setSearchText = {this.searchTextACB} 
                                                       setSearchDishType = {this.searchDishTypeACB}
                                                       searchNow = {this.searchACB}/>
                      
                           {promiseNoData(this.searchResultsPromiseState) || (<SearchResultsView searchResults={this.searchResultsPromiseState.data}
                                                                                                        searchResultChosen = {this.searchResultACB}/>)}
                              </div>
                          );
                          
    },
    };
    export default searchPresenter;