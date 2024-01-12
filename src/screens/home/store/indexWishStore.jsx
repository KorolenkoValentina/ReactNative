
import { makeObservable, observable, action, runInAction} from 'mobx'

class OrderWishStore{

  @observable orders
  @observable modalVisible;
  @observable lastLikedItem;
  @observable isRemoveAction; 
  
  constructor(){
    makeObservable(this)
    this.orders=[]
    this.modalVisible = false;
    this.lastLikedItem = null;
    this.isRemoveAction = false;
  }

  isItemLiked(item) {
    return this.orders.some((wishItem) => wishItem.id === item.id && wishItem.selectedSize === item.selectedSize);
  }
  
  @action setOrdersWish(orderItem) {
    if (!this.isItemLiked(orderItem)) {
      runInAction(() => {
        this.orders.push(orderItem);
        this.lastLikedItem = orderItem;
        this.modalVisible = true;
        this.isRemoveAction = false;

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
      
    if (this.orders.find((item) => item.id === orderItem.id && item.selectedSize === orderItem.selectedSize)){
    runInAction(() => {
    this.lastLikedItem = orderItem;
    this.modalVisible = true;
    this.isRemoveAction = true;

    setTimeout(() => {
      runInAction(() => {
        this.modalVisible = false;
        this.lastLikedItem= null;
        this.orders = this.orders.filter((item) => item.id !== orderItem.id);
      });
    }, 2000);
  })
    }
  }

  
  @action removeOrderWishItem(orderItem) {
    this.orders  = this.orders.filter((item) => item.id !== orderItem.id);
  }

  getPriceForSize(item) {
    return item.selectedSize === 42 ? item.size42 : item.newPrice;
  }

  
}
export default new OrderWishStore()
