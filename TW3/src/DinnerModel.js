import resolvePromise from "./resolvePromise";
import { searchDishes } from "./dishSource";
import {getDishDetails} from "./dishSource";

/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graohics or interaction
*/
class DinnerModel{
    constructor(nrGuests=2, dishArray=[], currentDish){
        this.observers = [];
        this.setNumberOfGuests(nrGuests);
        this.dishes= dishArray;
        this.searchResultsPromiseState = {};
        this.searchParams = {};
        this.currentDishPromiseState ={};
    }
    setNumberOfGuests(nr){
        // if() and throw exercise
        
        // TODO throw an error if the argument is smaller than 1 or not an integer
        // the error message must be exactly "number of guests not a positive integer"
        // to check for integer: test at the console Number.isInteger(3.14)
        if (nr < 1 || !Number.isInteger(nr)){
             throw ("number of guests not a positive integer");
         }

        // TODO if the argument is a valid number of guests, store it in this.numberOfGuests
        if (Number.isInteger(nr)){
            if (nr !== this.numberOfGuests){
                this.numberOfGuests = nr;
                this.notifyObservers({numberOfPeople: nr});
            }
            return "number of guests is a positive integer";
        }

        

        
        // when this is done the TW1.1 DinnerModel "can set the number of guests" should pass
        // also "number of guests is a positive integer"
    }
    addToMenu(dishToAdd){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the previous value
        if (this.dishes.find(isDishOnMenuCB)){
            return;
        }

        function isDishOnMenuCB(dish){
            return dish.id === dishToAdd.id;
        }

        this.dishes= [...this.dishes, dishToAdd];
        this.notifyObservers({addDish: dishToAdd});
    }
    
    
    removeFromMenu(dishToRemove){
        // callback exercise! Also return keyword exercise
        function hasSameIdCB(dish){
            // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
            if (dish.id !== dishToRemove.id)
                return true;
            else
                return false;
        }
        // the test "can remove dishes" should pass

        if (this.dishes.find(dishRemoveCB)){
            this.dishes= this.dishes.filter(hasSameIdCB);
            this.notifyObservers({removeDish:dishToRemove});
        }

        function dishRemoveCB(dish){
            return dish.id === dishToRemove.id;
        }
    }
    /* 
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data, 
       but we take a more relaxed, "Application state" approach. 
       So we store also abstract data that will influence the application status.
     */
    setCurrentDish(id){
        function notifyACB(){
            this.notifyObservers();
        }
        
        if (id !== false && id !== this.currentDish){
            this.currentDish=id;
            this.notifyObservers({currentDishID: id});
            resolvePromise(getDishDetails(id),this.currentDishPromiseState, notifyACB.bind(this));
        }

        
       
    }

    setSearchQuery(q){
        this.searchParams.query = q;
    }

    setSearchType(t){
        this.searchParams.type = t;
    }

    doSearch(queryAndType){

        function notifyACB(){
            this.notifyObservers();
        }
        
        resolvePromise(searchDishes(queryAndType),this.searchResultsPromiseState, notifyACB.bind(this));

        

    }

    addObserver(callback){
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback){
        this.observers= this.observers.filter(callbacksCheakCB);
        function callbacksCheakCB(CB) {
            CB !== callback;
        
        }
    }

    

    notifyObservers(payload){
        try { this.observers.forEach(function invokeObserverCB(obs){obs(payload);})
    }

        catch(err){console.error(err); }
    }


}

export default DinnerModel;
