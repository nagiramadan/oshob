import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/app-product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category = '';
  cart$: Observable<ShoppingCart>;
  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().switchMap<Product[], ParamMap>(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(query => {
      this.category = query.get('category') || '';
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = this.category
        ? this.products.filter(product => product.category === this.category)
        : this.products;
  }

}
