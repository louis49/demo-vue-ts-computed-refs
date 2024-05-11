import {computed, ComputedRef, reactive} from "vue";

/*
Problem Summary
I am encountering two primary issues in my Vue 3 and TypeScript project when working with ComputedRef from Vue's reactivity API in a class managing state:

TypeScript Compilation Error:

const result1 = parseInt(register.val, 16); // error TS2345: Argument of type 'ComputedRef<string>' is not assignable to parameter of type 'string'.
console.log(result1); // Ok : 170
Issue: This line throws a TypeScript error (TS2345) because parseInt expects a string as its parameter, but register.val, which is a ComputedRef<string>, is passed instead. The ComputedRef type does not directly expose its value; instead, its actual string value is wrapped inside and must be accessed via .value.
Runtime Issue (NaN Result):

const result2 = parseInt(register.val.value); // No compilation error
console.log(result2); // Outputs NaN
Issue: While the TypeScript error is resolved by correctly accessing the value property of the ComputedRef, the output at runtime is NaN. This issue suggests that the actual value held by register.val.value may not be in a format that parseInt can successfully parse.
 */

interface Register {
    id: string;
    val: ComputedRef<string>;
}

interface Store {
    registers: Register[];
}

class StoreManager {
    public store: Store = reactive({
        registers: []
    });

    addRegisters(){
        const cmp = {val : computed(() => { return "aa" }), id:"0"};
        const result0 = parseInt(cmp.val.value, 16); // No compilation error
        console.log(result0); // Ok : 170
        this.store.registers.push(cmp);
        storeManager.compute(storeManager.store.registers);
    }

    compute(registers : Register[]){
        const register = registers.find(reg => reg.id === "0");
        const result1 = parseInt(register.val, 16); // error TS2345: Argument of type 'ComputedRef<string>' is not assignable to parameter of type 'string'.
        console.log(result1); // Ok : 170

        const result2 = parseInt(register.val.value, 16); // No compilation error
        console.log(result2); // Ko : NaN
    }
}

const storeManager = new StoreManager();
export default storeManager;