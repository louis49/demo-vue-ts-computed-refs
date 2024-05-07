import { computed, ComputedRef, UnwrapNestedRefs } from "vue";

interface ConcreteTest {
    val: ComputedRef<string>;
}

interface Store {
    registers: ConcreteTest[];
}

class StoreManager {
    public store: UnwrapNestedRefs<Store> = {
        registers: []
    };

    addRegisters(){
        const val = computed(() => { return "0xaa" });
        this.store.registers.push({ val });
    }
}
