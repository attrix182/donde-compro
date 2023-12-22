import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  /*
  [{
    "marca": "COCA COLA",
    "id": "7790895067556",
    "precioMax": 1575,
    "precioMin": 1007.7,
    "nombre": "Coca Cola sin Azucar 1.5 Lt",
    "presentacion": "1.5 lt",
    "cantSucursalesDisponible": 10
},
{
    "marca": "FANTA",
    "id": "7790895000836",
    "precioMax": 760,
    "precioMin": 538,
    "nombre": "Gaseosa Naranja Fanta 500 Cc",
    "presentacion": "500.0 cc",
    "cantSucursalesDisponible": 8
}] */
  cart$: BehaviorSubject<any> = new BehaviorSubject([]);
  cart: any = [];
  constructor() {}

  addToCart(product: any) {
    this.cart.push(product);
    this.cart$.next(this.cart);
  }

  getCart() {
    return this.cart$.asObservable();
  }

  clearCart() {
    this.cart = [];
    this.cart$.next(this.cart);
  }

  removeFromCart(product: any) {
    this.cart = this.cart$.value.filter((item: any) => item.id !== product.id);
    this.cart$.next(this.cart);
    console.log(this.cart);
  }

  calculateCarts(options: any[]): any {
    options.reduce((accumulator: any, item) => {
      const existingItem: any = accumulator.find((x: any) => x.sucursalId === item.sucursalId);
      if (existingItem) {
        existingItem.tot1alPrice += item.precio;
      } else {
        accumulator.push({
          sucursal: item.sucursal,
          sucursalId: item.sucursalId,
          totalPrice: item.precio
        });
      }
    });
  }
}
