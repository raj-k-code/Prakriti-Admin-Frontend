import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Gardener } from 'src/app/model/gardener';
import { GardenerService } from 'src/app/service/gardener.service';

@Component({
  selector: 'app-gardener-profile',
  templateUrl: './gardener-profile.component.html',
  styleUrls: ['./gardener-profile.component.css']
})
export class GardenerProfileComponent implements OnInit {
  gardenerData = new Gardener("", "", "", "", "", "", "", "", "", "", "");
  GardenerId: any;
  starRating: any;
  addStar: any = 0;
  newReview: any;
  oldRate: any



  gardenerRating: any;


  constructor(private spinner: NgxSpinnerService, private toaster: ToastrService, private gardenerService: GardenerService, private activate: ActivatedRoute, private router: Router) {
    this.GardenerId = activate.snapshot.paramMap.get('id');
    spinner.show();
  }

  ngOnInit(): void {
    this.gardenerService.viewProfile(this.GardenerId).subscribe(data => {
      if (data.gardenerEmail) {
        this.gardenerData = data;
        var rmIndex;

        this.gardenerRating = this.gardenerData.gardenerRating
        let total = 0;
        for (let rate in this.gardenerRating) {
          total += this.gardenerRating[rate].rate;
          console.log(total + "========inside loop");

        }


        this.starRating = total / this.gardenerRating.length;
      }
      this.spinner.hide();

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
