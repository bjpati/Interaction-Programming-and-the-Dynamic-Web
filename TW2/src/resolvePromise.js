function resolvePromise(promiseToResolve, promiseState){
        if(!promiseToResolve)
         return;
        promiseState.promise=promiseToResolve;
        promiseState.data= null; // UI update! The user does not keep seeing results from previous search 
        promiseState.error= null;
        function saveDataACB(result){ promiseState.data= result;} // triggers UI update because of changing state 
        function saveErrorACB(err) { promiseState.error= err; } // triggers UI update because of changing state 
        promiseToResolve.then(saveDataACB).catch(saveErrorACB);

     }
    export default resolvePromise;