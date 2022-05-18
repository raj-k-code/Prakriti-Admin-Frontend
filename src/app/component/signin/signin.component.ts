import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
// import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../model/admin'
import { Nursury } from '../../model/nursury';
import { AdminService } from '../../service/admin.service';
import { NursuryService } from '../../service/nursury.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  admin: Admin = new Admin("", "");
  nursury: Nursury = new Nursury("", "", "", "", "", "", "", "", "", "");
  forgotEmail: any;
  number: any;
  whichApi: any;

  constructor(private toaster: ToastrService, private socialService: SocialAuthService, private adminService: AdminService, private router: Router, private nursurySercice: NursuryService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        location.reload();
      }
    })
  }

  public login() {
    if (sessionStorage.getItem('number') == "1") {
      this.adminService.signIn(this.admin).subscribe(data => {
        if (data.status) {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('userId', data.data._id);
          sessionStorage.setItem('userImage', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyw551VPZXNStb2o_1PS7LJpIVrR-qbwqyDuBj6m4Xa3ePEE9DqQVB2_U9JsMoPKRrhHE&usqp=CAU");
          this.toaster.success("Login Successfully", "Success");
          this.router.navigate(['admin']);
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
    else if (sessionStorage.getItem('number') == "2") {
      this.nursury.nurseryOwnerEmail = this.admin.email;
      this.nursury.nurseryOwnerPassword = this.admin.password;

      this.nursurySercice.signIn(this.nursury).subscribe(data => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.data._id);
        this.toaster.success("Login Successfully", "Success");

        sessionStorage.setItem('userImage', data.data.Image);

        this.router.navigate(['nursery']);

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

  public forgotPassword() {
    if (sessionStorage.getItem('number') == "1") {
      this.adminService.forgotPassword(this.forgotEmail).subscribe(data => {

        if (data.message) {
          this.toaster.info("NO USER FOUND WITH THIS EMAIL", "SORRY");
        }
        else {
          this.toaster.success("Email Sent Successfully. Check Your Inbox ", "Success");
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
    else if (sessionStorage.getItem('number') == "2") {
      this.nursurySercice.forgotPassword(this.forgotEmail).subscribe(data => {

        if (data.message) {
          this.toaster.info("NO USER FOUND WITH THIS EMAIL", "SORRY");
        }
        else {
          this.toaster.success("Email Sent Successfully. Check Your Inbox ", "Success");
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
  }


  googleSignin() {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
    this.socialService.authState.subscribe(data => {
      console.log(data.email);

      if (sessionStorage.getItem('number') == "1") {
        this.adminService.signinWithGoogle(data.email).subscribe(data => {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('userId', data.data._id);
          this.toaster.success("Login Successfully", "Success", {
            positionClass: 'toast-top-center'
          });
          sessionStorage.setItem('userImage', data.Image);

          this.router.navigate(['admin']);

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
      else if (sessionStorage.getItem('number') == "2") {
        this.nursurySercice.signinWithGoogle(data.email).subscribe(data => {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('userId', data.data._id);
          this.toaster.success("Login Successfully", "Success");
          // sessionStorage.setItem('userImage', data.data.Image);

          this.router.navigate(['nursery']);

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

    })
  }

  continueToLogin() {
    console.log("heelll");
    sessionStorage.setItem("number", this.number);
    if (this.whichApi == "login")
      this.login();
    else if (this.whichApi == "forgotPassword")
      this.forgotPassword();
    else if (this.whichApi == "googleSignin")
      this.googleSignin();
  }

  setApi(api: any) {
    this.whichApi = api
  }

}

