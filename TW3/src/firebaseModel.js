import DinnerModel from "../src/DinnerModel";
import firebaseConfig from "../src/firebaseConfig";
import { getDishDetails } from "./dishSource";
// Add relevant imports here 
// TODO

//this.observers = [];
firebase.initializeApp(firebaseConfig)
const REF="DinnerModel99";

//firebase.database().ref(REF+"/test").set("hhajjjjh");

function observerRecap(model){
    function addingObserverCB (payload){
        console.log(payload)
    }
    model.addObserver(addingObserverCB);  

}
function firebaseModelPromise() {
    function makeBigPromiseACB(firebaseData) {
    
        function makeDishPromiseCB(dishId){
            return getDishDetails(dishId);
        }

        function createModelACB(dishArray){
            let guestsNumber = 2;
            if (firebaseData.val()){
                guestsNumber= firebaseData.val().numberOfGuests;
            }

            return new DinnerModel(guestsNumber,dishArray);
        }

        let dishArray = [];
        if (firebaseData.val()?.allDishes){
            dishArray = firebaseData.val().allDishes;
        }

        const dishPromiseArray= Object.keys(dishArray).map(makeDishPromiseCB);

        return (Promise.all(dishPromiseArray).then(createModelACB))

    }
    return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

function updateFirebaseFromModel(model) {
    function uppdateObserverFirebaseCB (payload){
        console.log(payload)

        if(payload && payload.numberOfPeople){
        firebase.database().ref(REF+"/numberOfGuests").set(model.numberOfGuests); 
        }

        if(payload && payload.currentDishID){
            firebase.database().ref(REF+"/currentDish").set(model.currentDish); 
            }

        if(payload && payload.addDish){
            firebase.database().ref(REF+"/allDishes/"+payload.addDish.id).set(payload.addDish.title); 
            }

        if(payload && payload.removeDish){
                firebase.database().ref(REF+"/allDishes/"+payload.removeDish.id).set(null); 
            }
    }
    model.addObserver(uppdateObserverFirebaseCB);
   
    //TODO
    return;
}

function updateModelFromFirebase(model) {
    firebase.database().ref(REF+"/numberOfGuests").on("value", guestsChangedInFirebaseACB);
    firebase.database().ref(REF+"/currentDish").on("value", currentDishRemovedFromFirebaseACB);
    firebase.database().ref(REF+"/allDishes").on("child_added", dishesAddenInFirebaseACB)
    firebase.database().ref(REF+"/allDishes").on("child_removed", dishesRemoveInFirebaseACB)

   function guestsChangedInFirebaseACB(firebaseData){ 
       model.setNumberOfGuests(firebaseData.val());
   }

   function currentDishRemovedFromFirebaseACB(firebaseData){ 
       model.setCurrentDish(firebaseData.val());
    }

    function dishesAddenInFirebaseACB(firebaseData){
        function checkIdACB(dish){
            return dish.id === +firebaseData.key;
        }
        function addDishToMenuCB(dish){
            model.addToMenu(dish);
        } 

        let dishArray = [];
        dishArray = model.dishes.filter(checkIdACB);
            if (dishArray.length === 0){
                getDishDetails(+firebaseData.key).then(addDishToMenuCB);
            }
    }

    function dishesRemoveInFirebaseACB(firebaseData){
        model.removeFromMenu({id: +firebaseData.key});
    }

    return;
}


// Remember to uncomment the following line:
export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};
//export default firebase.initialize;

