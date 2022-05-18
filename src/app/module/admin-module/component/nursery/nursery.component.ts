import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Nursury } from 'src/app/model/nursury';
import { NurseryService } from 'src/app/service/nursery.service';

@Component({
  selector: 'app-nursery',
  templateUrl: './nursery.component.html',
  styleUrls: ['./nursery.component.css']
})
export class NurseryComponent implements OnInit {

  nurseryList: Nursury[] = [];
  nursery = new Nursury("", "", "", "", "", "", "", "", "", "");

  constructor(private service: NurseryService, private toaster: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.service.nursuryList().subscribe(data => {
      if (data.length > 0) {

        this.nurseryList = data
      }

    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          this.toaster.error("Invalid User", "Error");
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

  public blockUser(nurseryId: any) {
    if (confirm("Are sure you want block this gardener")) {
      if (sessionStorage.getItem('number') == "1" && sessionStorage.getItem('token')) {
        this.service.blockNursery(nurseryId).subscribe(data => {
          console.log(data);
          if (data.message) {
            this.toaster.error("Nursery Not Blocked");
          }
          else if (data.failed) {
            this.toaster.info("Blocked But Didn't Notify The Nursery");
          }
          else {
            this.toaster.success("Nursery Blocked", "Success");
            this.ngOnInit();
          }
        }, err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.toaster.error("Invalid User", "Error");
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
      else {
        this.router.navigate(['/']);
      }
    }
  }

  public UnBlockUser(nurseryId: any) {
    if (sessionStorage.getItem('number') == "1" && sessionStorage.getItem('token')) {
      this.service.unBlockNursery(nurseryId).subscribe(data => {
        console.log(data);

        if (data.message) {
          this.toaster.error("Nursery Not Unblocked");
        }
        else if (data.failed) {
          this.toaster.info("Unblocked But Didn't Notify The Nursery");
        }
        else {
          this.toaster.success("Nursery Unblocked", "Success");
          this.ngOnInit();
        }
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.toaster.error("Invalid User", "Error");
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
    else {
      this.router.navigate(['/']);
    }
  }

  public viewProfile(nurseryData: Nursury) {
    this.nursery = nurseryData;
  }
}
