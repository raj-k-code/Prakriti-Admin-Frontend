import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../model/admin'
import { Nursury } from '../model/nursury';
import { AdminService } from '../service/admin.service';
import { NursuryService } from '../service/nursury.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  // user: User = new User("", "", "", "", "");
  // gardener: Gardener = new Gardener("", "", "", "", "", "", "",);
  admin:Admin = new Admin ("","");
  nursury:Nursury = new Nursury("","","","","","","","");

  constructor(private toaster: ToastrService, private adminService:AdminService,  private router: Router, private nursurySercice:NursuryService) {
    // this.toaster.success("Login Successfully", "Success")
  }

  ngOnInit(): void {
  }
 
  public login(n:number) {
    if (n==1) {
      this.adminService.signIn(this.admin).subscribe(data => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('adminId', data._id);
        this.toaster.success("Login Successfully", "Success");
        // sessionStorage.removeItem('number');
        this.router.navigate(['home']);

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
      // this.nu.gardenerEmail = this.user.userEmail;
      // this.gardener.gardenerPassword = this.user.userPassword;
      this.nursury.nurseryOwnerEmail=this.admin.email;
      this.nursury.nurseryOwnerPassword=this.admin.password

      this.nursurySercice.signIn(this.nursury).subscribe(data => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('nursuryId', data.data._id);
        this.toaster.success("Login Successfully", "Success");
        // sessionStorage.removeItem('number');
        this.router.navigate(['home']);

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
  }

  
}

