import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './app-product';

export class ShoppingCart {

  items: ShoppingCartItem[] = [];
  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {} ;
    for (const productId in itemsMap) {
      if (itemsMap.hasOwnProperty(productId)) {
        const item = itemsMap[productId];
        this.items.push(new ShoppingCartItem({...item, $key: productId }));
      }
    }
  }

  get totalPrice(): number {
    let totalPrice = 0;
    this.items.forEach(item => totalPrice += item.totalPrice);
    return totalPrice;
  }

  get totalItemCount() {
    let count = 0;
    for (const productId in this.itemsMap) {
      if (this.itemsMap.hasOwnProperty(productId)) {
        count += this.itemsMap[productId].quantity;
      }
    }
    return count;
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

}
