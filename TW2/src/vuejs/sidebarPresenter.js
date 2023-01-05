import SidebarView from "../views/sidebarView.js";

export default
function sidebar(props){
    return <SidebarView number={props.model.numberOfGuests} 
                        onNumberChange ={onNumberChangeACB}
                        dishes = {props.model.dishes}
                        removeDish = {onRemoveDishACB}
                        currentDish = {onSetCurrentDishACB}
    
        />
          
        function onNumberChangeACB (number){
            props.model.setNumberOfGuests(number)
          }
          
        function onRemoveDishACB(dish){
            props.model.removeFromMenu(dish)
        }

        function onSetCurrentDishACB(id){
            props.model.setCurrentDish(id)
        }

}
