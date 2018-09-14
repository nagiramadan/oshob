import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'shared/models/app-product';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  items: Product[] = [];
  itemsCount: number;
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  constructor(private productService: ProductService) {
    this.subscription = productService.getAll().subscribe(products => {
      this.products =  products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 }).then(items => (this.items = items));
    this.tableResource.count().then(count => (this.itemsCount = count));
  }

  filter(query: string) {
    const filteredProducts = query ? this.products.filter(item => item.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
    this.initializeTable(filteredProducts);
  }

  reloadItems(params) {
    if (!this.tableResource) {
      return;
    }
    this.tableResource.query(params).then(items => (this.items = items));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
