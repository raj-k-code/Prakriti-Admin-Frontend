import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-view-particular-odorder',
  templateUrl: './view-particular-odorder.component.html',
  styleUrls: ['./view-particular-odorder.component.css']
})
export class ViewParticularOdorderComponent implements OnInit {

  orderData: any;
  orderId: any;
  newStatus: any

  constructor(private adminService: AdminService, private toaster: ToastrService, private activated: ActivatedRoute) {
    this.orderId = activated.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.adminService.particularOrder(this.orderId).subscribe(data => {
      this.orderData = data
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

}
