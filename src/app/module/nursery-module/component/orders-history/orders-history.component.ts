import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NurseryService } from 'src/app/service/nursery.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {

  orderData: any[] = [];

  constructor(private spnner: NgxSpinnerService, private nurseryService: NurseryService, private router: Router, private toaster: ToastrService) {
    spnner.show();
  }

  ngOnInit(): void {

    this.nurseryService.orderHistory().subscribe(data => {
      this.orderData = data

      console.log(this.orderData)

      this.spnner.hide()
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

}
