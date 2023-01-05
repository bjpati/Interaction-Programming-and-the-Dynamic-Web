import { dishType, sortDishes, menuPrice } from "../utilities.js";
function SidebarView(props) {
    return (
        //TW1.2 basic rendering 
        <div class="sidebar">
        <button disabled = {props.number === 1} 
        onClick = {onMinusClickACB}>
            -</button> 
        <span>{props.number}</span>
        <button  onClick = {onPlusClickACB}>+</button>
        <table>
            <tbody>
                {sortDishes(props.dishes).map(dishType_remove_setCB)}
                <tr>
                    <td></td>
                    <td>Total:</td>
                    <td></td>
                    <td class="TODO">{(menuPrice(props.dishes) * props.number).toFixed(2)}</td>
                </tr>
            </tbody>

           </table>
        
        </div>


);
        //TW1.5 Array rendering
        function dishType_remove_setCB (dish){
            return  ( <tr>
              <td><button  onClick={removeDishACB}>x</button></td>
                <td >
               <a href="#details" onClick={setDishACB}> {dish.title} </a> 
             </td>
             <td>{dishType(dish)}</td>
              <td class="TODO">{((dish.pricePerServing) * props.number).toFixed(2)}</td> 

            </tr>)  ;
                //Custom events
                function removeDishACB(){
                    props.removeDish(dish);
                }
                //Custom events
                function setDishACB(){
                    props.currentDish(dish);
                
                }
        }

        //Custom events
        function onMinusClickACB(){
                props.onNumberChange((props.number) - 1);  
                //console.log ("Minus button clicked");
            }
        //Custom events
        function onPlusClickACB(){
                props.onNumberChange((props.number) + 1);
                //console.log ("Plus button clicked");
            }    
        
}




export default SidebarView;