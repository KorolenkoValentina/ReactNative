import { makeObservable, observable, action, runInAction, computed} from 'mobx'

class OrderStore{

  @observable orders
  constructor(){
    makeObservable(this)
    this.orders=[]
    
  }
  @action setOrders(orderItem) {
    const existingOrder = this.orders.find((item) => item.id === orderItem.id && item.selectedSize === orderItem.selectedSize);
  
    if (existingOrder) {
      existingOrder.quantity += 1;
    } else {
      runInAction(() => {
        this.orders = [...this.orders, { ...orderItem, quantity: 1}];
      });
    }
  }
  
  getPriceForSize(item) {
    const basePrice = item.selectedSize === 42 ? (item.size42 || '0') : (item.newPrice || '0');
    const toppingsPrice = (item.selectedToppings || []).reduce((toppingTotal, topping) => {
      const toppingPrice = topping.price || '0';
      return toppingTotal + parseFloat(toppingPrice.replace('$', ''));
    }, 0);
  
    return (parseFloat(basePrice.replace('$', '')) + toppingsPrice).toFixed(2);
  }


  
  @computed get totalItems() {
    return this.orders.reduce((total, item) => total + item.quantity, 0);
  }
  

  @action removeOrder(orderItem) {
    this.orders = this.orders.filter((item) => item !== orderItem);
  }
   

  @action clearOrders() {
    this.orders = [];
  }

  @action confirmOrder() {
    this.clearOrders();
  }


  @action increaseQuantity(orderItem) {
    orderItem.quantity += 1;
    this.orders = [...this.orders];
  }
  
  @action decreaseQuantity(orderItem) {
    if (orderItem.quantity > 1) {
      orderItem.quantity -= 1;
      this.orders = [...this.orders];
    }
  }


  @action calculateTotal() {
    
    const rounding = (value) => value.toFixed(2);
  
    const totalAmount = rounding(
      this.orders.reduce((total, item) => {
        const basePrice = item.selectedSize === 42
          ? parseFloat(item.size42.replace('$', ''))
          : parseFloat(item.newPrice.replace('$', ''));
  
        const toppingsPrice =  Array.isArray(item.selectedToppings)
          ?item.selectedToppings.reduce((toppingTotal, topping) => {
          const toppingPrice = topping.price || '0';
          return toppingTotal + parseFloat(toppingPrice.replace('$', ''));
        }, 0)
        :0;
  
        return total + (basePrice + toppingsPrice) * item.quantity;
      }, 0)
    );

  
    const totalDiscount = rounding(
      this.orders.reduce(
        (total, item) =>
          total +
          (parseFloat(item.oldPrice.replace('$', '')) - parseFloat(item.newPrice.replace('$', ''))) * item.quantity,
        0
      )
    );
  
    return { totalAmount, totalDiscount };
  }
  
  
}

export default new OrderStore()