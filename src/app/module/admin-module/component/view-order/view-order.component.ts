import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  status = "";
  newStatus: any = "";
  orderData: any[] = [];

  constructor(private spnner: NgxSpinnerService, private adminService: AdminService, private router: Router, private toaster: ToastrService) {
    spnner.show();
  }

  ngOnInit(): void {
    this.orderType();
  }

  public orderType() {
    this.adminService.allOrders(this.status).subscribe(data => {
      this.orderData = data

      console.log(this.orderData)

      this.spnner.hide()
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 500) {
          this.toaster.error("Internal Server Error", "Error");
        }
        else if (err.status == 400) {
          this.toaster.error("Bad Request", "Error");
        }
      }
    });
  }

  setStatus(e: any, id: string) {
    this.newStatus = e.target.value
    this.adminService.changeStatus(this.newStatus, id).subscribe(data => {
      if (data.success) {
        this.toaster.success("Status Changed Successfully");
      }
      else
        this.toaster.error("Not Changed...");

    }, err => {
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status == 500) {
          this.toaster.error("Internal Server Error", "Error");
        }
        else if (err.status == 400) {
          this.toaster.error("Bad Request", "Error");
        }
      }
    });
  }

  viewOrderById(orderId: any) {
    this.router.navigate(["all-orders/view-order-by-id/" + orderId]);
  }

}
