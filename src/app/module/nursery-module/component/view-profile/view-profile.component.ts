import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Nursury } from 'src/app/model/nursury';
import { NurseryService } from 'src/app/service/nursery.service';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  nursery = new Nursury("", "", "", "", "", "", "", "", "", "");

  id: any = sessionStorage.getItem('userId');

  number = sessionStorage.getItem('number');

  name: any;
  nurseryName: any;
  email: any;
  mobile: any;
  address: any;
  image: any;
  showImage: any;


  constructor(private spinner: NgxSpinnerService, private service: NurseryService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.service.viewProfile(sessionStorage.getItem('userId')).subscribe(data => {
      if (data._id) {
        this.name = data.nurseryOwnerName;
        this.email = data.nurseryOwnerEmail;
        this.mobile = data.nurseryOwnerMobile;
        this.address = data.nurseryAddress;
        this.image = data.Image
        this.showImage = data.Image;
        this.nurseryName = data.nurseryName

      }
      this.spinner.hide()
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

  public onSelect(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.showImage = event.target.result;
      };
      this.image = e.target.files[0];
    }
  }

  public updateProfile() {
    const formData = new FormData();
    formData.append('nurseryName', this.name);
    formData.append('nurseryOwnerName', this.nurseryName);
    formData.append('nurseryOwnerMobile', this.mobile);
    formData.append('nurseryAddress', this.address);
    formData.append('nurseryownerId', this.id);
    formData.append('Image', this.image);

    this.service.updateProfile(formData).subscribe(data => {
      if (data.success) {
        this.toaster.success("Profile Updated", "Success");
        this.ngOnInit();
      }
      else {
        this.toaster.error("Not Upadated");
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

}
