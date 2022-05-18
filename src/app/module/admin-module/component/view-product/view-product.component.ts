import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NurseryService } from 'src/app/service/nursery.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productList: any[] = []
  nurseryOwnerId: any;
  page: any;
  product: any;
  starRating: any
  constructor(private service: NurseryService, private toaster: ToastrService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.nurseryOwnerId = activatedRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.service.viewProductList(this.nurseryOwnerId).subscribe(data => {
      this.productList = data
      console.log(this.productList)
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          this.toaster.info("No Products Found", "Sorry");
        }
        else if (err.status == 500) {
          this.toaster.error("Internal Server Error", "Error");

        }
        else if (err.status == 400) {
          this.toaster.error("Bad Request", "Error");

        }
      }
    });
  }

  viewProduct(productId: any) {
    this.service.productById(productId).subscribe(data => {
      console.log(data);
      var total = 0;
      if (data._id) {
        for (let rating of data.productRating) {
          total = total + rating.rate;
        }

        this.starRating = total / 5;

        this.product = data;
        console.log(this.product);
      }
      else {
        this.toaster.info("This Is Product Not Found", "Sorry");
      }
    }, err => {

    });
  }
}
