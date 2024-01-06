import { makeObservable, observable, action, runInAction} from 'mobx'

class OrderWishStore{

  @observable orders
  constructor(){
    makeObservable(this)
    this.orders=[]
    
  }


  @action setOrdersWish(orderItem) {
    if (!this.orders.find((item) => item.id === orderItem.id && item.selectedSize === orderItem.selectedSize)) {
      runInAction(() => {
        this.orders.push(orderItem);
      });
    }
  }
  

  @action removeOrderWish(orderItem) {
    this.orders = this.orders.filter((item) => item !== orderItem);
  }


  getPriceForSize(item) {
    return item.selectedSize === 42 ? item.size42 : item.newPrice;
  }
  
}

export default new OrderWishStore()
