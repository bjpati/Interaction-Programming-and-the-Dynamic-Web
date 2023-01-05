function DetailsView(props){
    return (
        
        <div>  <button disabled = {props.isDishInMenu} 
                    onClick={addToMenuACB}>Add to menu!</button>
            <button onClick={goToDishesACB}>Cancel</button>

           
            <div class= "details">
                Price: {props.dishData.pricePerServing} <br></br>
                for {props.guests} guests: {(props.dishData.pricePerServing * props.guests).toFixed(2)} <br></br></div>
                <br></br>
                <img src={props.dishData.image} height="100"/>
            <div>
                {props.dishData.extendedIngredients.map(doRanderingACB)}
            </div>

            <div class= "details">{props.dishData.instructions}</div>

            <a href= {props.dishData.sourceUrl}>More Information</a>
        </div>
    )

    function addToMenuACB(){
        props.dishAdd();
        window.location.hash = "#search";
    }

    function goToDishesACB(){
        window.location.hash = "#search";
    }

    function doRanderingACB(dishDetails){
        return <li>{dishDetails.name}{(dishDetails.amount).toFixed(2)}{dishDetails.unit}</li>
        
    }


}



export default DetailsView;