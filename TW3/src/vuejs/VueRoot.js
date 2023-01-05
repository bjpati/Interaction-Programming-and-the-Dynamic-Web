// Add relevant imports here 
import App  from "../views/app.js";
import { firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase } from "../firebaseModel";
import resolvePromise from "../resolvePromise.js";
import promiseNoData from "../views/promiseNoData";

// Define the VueRoot component
const VueRoot = {
    props:["model"],
    data(){ return {rootModel: this.model, promiseState:{}};},
    created(){
        if(!this.promiseState.promise){
            resolvePromise(firebaseModelPromise(), this.promiseState, this.notifyACB);
        }
    },
    methods:{
        notifyACB(){
            if(this.promiseState.data){
                updateFirebaseFromModel(this.promiseState.data);
                updateModelFromFirebase(this.promiseState.data);
            }
        }
    },
    render(){ return (promiseNoData(this.promiseState) || <App model={this.promiseState.data} />); }
};

// Export the VueRoot component
export default VueRoot;