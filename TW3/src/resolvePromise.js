function resolvePromise(promiseToResolve, promiseState, notify){

        if(!promiseToResolve)
         return;
        promiseState.promise=promiseToResolve;
        promiseState.data= null; // UI update! The user does not keep seeing results from previous search 
        promiseState.error= null;
        if(notify)      // if a 3rd parameter was sent, we expect it to be a function (ACB)!
                notify();  // so we can call it to notify every time promise, data, or error change
        function saveDataACB(result){ 
                if(promiseState.promise !== promiseToResolve) return;
                promiseState.data = result;
                if(notify)
                        notify();
                
        } // triggers UI update because of changing state 

        function saveErrorACB(err) { 
                if(promiseState.promise !== promiseToResolve) return;
                promiseState.error = err; 
                if(notify)
                        notify();
        } // triggers UI update because of changing state 

        promiseToResolve.then(saveDataACB).catch(saveErrorACB);

     }
    export default resolvePromise;