export class Inventory {
  inventoryMap: Map<any, boolean>;
  constructor() {
    this.inventoryMap = new Map();
  }

  has(key: string) {
    return Boolean(this.inventoryMap.has(key));
  }

  add(key: string) {
    if (!key) {
      console.warn("Trying to add falsy key to inventory", key);
      return;
    }
    this.inventoryMap.set(key, true);
    console.log(this.inventoryMap);
  }
}
