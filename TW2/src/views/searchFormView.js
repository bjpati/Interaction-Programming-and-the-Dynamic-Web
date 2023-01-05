function SearchFormView(props){
    return (
     <div> 
        <input onChange={onInputACB} placeholder="pizza">

        </input>

        <select onChange={chooseDishTypeACB}>
            <option value="" >Choose:</option>
           {props.dishTypeOptions.map(arrayRenderingACB)}
        </select>

        <button onClick={onSearchACB}>Search!</button>
    </div>
    )
    
    function arrayRenderingACB(option){
        return <option>{option}</option>

    }

    //2.5 Custom Events from change native events. unsure about the parameter.
    function onInputACB(evt){
        //console.log(evt.target.value);
        props.setSearchText(evt.target.value);

    }
    //2.5 Custom Events from change native events. unsure about the parameter.
    function chooseDishTypeACB(evt){
        if (evt.target.value === "Choose:"){
            return "";
        }
        //console.log(evt.target.value);
        props.setSearchDishType(evt.target.value);
    }
    //2.5 Custom Events from change native events. unsure about the parameter.
    function onSearchACB(){
        props.searchNow();
    }



}
 
export default SearchFormView;