import promiseNoData from "../views/promiseNoData";
import DetailsView from "../views/detailsView";

function DetailsPresenter(props){
    return promiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData={props.model.currentDishPromiseState.data}
                                                                isDishInMenu={props.model.dishes.find(onDishIsInMenuCB)}
                                                                guests={props.model.numberOfGuests} 
                                                                dishAdd = {onAddDishACB}/>
    

    function onDishIsInMenuCB(dish){
        return props.model.currentDish === dish.id;
    }

    function onAddDishACB(){
       props.model.addToMenu(props.model.currentDishPromiseState.data)
    }

}

export default DetailsPresenter;