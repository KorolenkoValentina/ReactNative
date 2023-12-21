import { makeObservable, observable, action, runInAction, computed} from 'mobx'

class OrderStore{

  @observable orders
  constructor(){
    makeObservable(this)
    this.orders=[]
    
  }

  @action setOrders(orderItem){
    const existingOrder = this.orders.find((item) => item.id === orderItem.id);

      if (existingOrder) {
        existingOrder.quantity += 1;
        } else {
        runInAction(() => {
          this.orders = [...this.orders, { ...orderItem, quantity: 1 }];
      });
    }
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

    const totalAmount = rounding (this.orders.reduce(
      (total, item) => total + parseFloat(item.newPrice.replace('$', '')) * item.quantity,
        0)
    );
    const totalDiscount = rounding (this.orders.reduce(
      (total, item) =>
      total +
      (parseFloat(item.oldPrice.replace('$', '')) - parseFloat(item.newPrice.replace('$', ''))) * item.quantity,
      0)
    );
    return { totalAmount, totalDiscount };
  }
}

export default new OrderStore()