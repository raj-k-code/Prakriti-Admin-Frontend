import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NurseryService } from 'src/app/service/nursery.service';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderData: any;
  totalProduct: any;

  constructor(private spinner: NgxSpinnerService, private service: NurseryService, private toaster: ToastrService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.spinner.show();

    var userId = this.activated.snapshot.paramMap.get('id');
    this.service.viewOrderHistory(userId).subscribe(data => {
      this.orderData = data
      for (let order of this.orderData) {
        for (let product of order.productList) {
          console.log(product.qty);
        }
      }
      console.log(this.orderData);
      if (this.orderData.message)
        this.toaster.info("Order History Is Empty");

      this.spinner.hide()
    }, err => {
    });
  }
}
