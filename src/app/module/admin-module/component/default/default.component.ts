import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Nursury } from 'src/app/model/nursury';
import { NurseryService } from 'src/app/service/nursery.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  requestList: Nursury[] = []

  constructor(private service: NurseryService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.service.nursuryRequest().subscribe(data => {
      if (data.length > 0) {
        this.requestList = data
        console.log(this.requestList);
      }
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

  public approve(nursery: Nursury) {
    if (sessionStorage.getItem('number') == "1") {
      if (confirm("Are You Wanna Approve This Nursery")) {
        this.service.nursuryRequestApprove(nursery._id, nursery.nurseryOwnerEmail).subscribe(data => {
          if (data.success) {
            this.ngOnInit();
            this.toaster.success("Approved Successfully", "Success");
          }
          else
            this.toaster.error("Not Approved");
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
    }
  }

  public cancel(nursery: Nursury) {
    if (sessionStorage.getItem('number') == "1") {
      if (confirm("Are You Wanna Cancel This Nursery Request")) {
        this.service.nursuryRequestCancel(nursery._id, nursery.nurseryOwnerEmail).subscribe(data => {
          if (data.success) {
            this.ngOnInit();
            this.toaster.success("Cancel Successfully", "Success");
          }
          else
            this.toaster.info("Already Canceled")
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
    }
  }

}
