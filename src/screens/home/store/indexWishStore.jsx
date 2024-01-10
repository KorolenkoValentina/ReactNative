
import { makeObservable, observable, action, runInAction} from 'mobx'

class OrderWishStore{

  @observable orders
  @observable modalVisible;
  @observable lastLikedItem;
  
  constructor(){
    makeObservable(this)
    this.orders=[]
    this.modalVisible = false;
    this.lastLikedItem = null;
    
  }


  
  @action setOrdersWish(orderItem) {
    if (!this.orders.find((item) => item.id === orderItem.id && item.selectedSize === orderItem.selectedSize)) {
      runInAction(() => {
        this.orders.push(orderItem);
        this.lastLikedItem = orderItem;
        this.modalVisible = true;

        setTimeout(() => {
          runInAction(() => {
            this.modalVisible = false;
            this.lastLikedItem = null;
          });
        }, 2000);
      });
    }
  }

  @action removeOrderWish(orderItem) {
    this.orders = this.orders.filter((item) => item.id !== orderItem.id);
    if (this.lastLikedItem && this.lastLikedItem.id === orderItem.id && this.lastLikedItem.selectedSize === orderItem.selectedSize) {
       this.lastLikedItem = null;
    }
  }

  getPriceForSize(item) {
    return item.selectedSize === 42 ? item.size42 : item.newPrice;
  }

  
}
export default new OrderWishStore()