import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gardener } from 'src/app/model/gardener';
import { GardenerService } from 'src/app/service/gardener.service';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-gardener',
  templateUrl: './gardener.component.html',
  styleUrls: ['./gardener.component.css']
})
export class GardenerComponent implements OnInit {

  gardenerList: Gardener[] = [];
  gardener = new Gardener("", "", "", "", "", "", "", "", "", "", "");
  starRating: any[] = [];
  index: any

  constructor(private spinner: NgxSpinnerService, private service: GardenerService, private toaster: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();

    this.service.gardenerList().subscribe(data => {
      if (data.length > 0) {
        for (let gardener in data) {
          var total = 0;
          for (let rating of data[gardener].gardenerRating) {
            total = total + rating.rate;
          }
          this.starRating[gardener] = total / 5;
          console.log(this.starRating[gardener]);
        }
        this.gardenerList = data
      }
      this.spinner.hide();

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

  public blockUser(gardenerId: any) {
    if (confirm("Are sure you want block this gardener")) {
      if (sessionStorage.getItem('number') == "1" && sessionStorage.getItem('token')) {
        this.service.blockGardener(gardenerId).subscribe(data => {
          console.log(data);
          if (data.message) {
            this.toaster.error("Gardener Not Blocked");
          }
          else if (data.failed) {
            this.toaster.info("Blocked But Didn't Notify The Gardener");
          }
          else {
            this.toaster.success("Gardener Blocked", "Success");
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

  public UnBlockUser(gardenerId: any) {
    if (sessionStorage.getItem('number') == "1" && sessionStorage.getItem('token')) {
      this.service.unBlockGardener(gardenerId).subscribe(data => {
        console.log(data);

        if (data.message) {
          this.toaster.error("Gardener Not Unblocked");
        }
        else if (data.failed) {
          this.toaster.info("Unblocked But Didn't Notify The Gardener");
        }
        else {
          this.toaster.success("Gardener Unblocked", "Success");
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

  public viewProfile(gardenerData: Gardener, i: any) {
    this.gardener = gardenerData
    this.index = i
  }

}
