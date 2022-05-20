import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: User[] = [];
  user = new User("", "", "", "", "", "", "", "", "");
  page: any

  constructor(private spinner: NgxSpinnerService, private service: UserService, private toaster: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();

    this.service.userList().subscribe(data => {
      if (data.length > 0)
        this.userList = data
      console.log(data);
      this.spinner.hide()
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

  public blockUser(userId: any) {
    if (confirm("Are sure you want block this user")) {
      if (sessionStorage.getItem('number') == "1" && sessionStorage.getItem('token')) {
        this.service.blockUser(userId).subscribe(data => {
          console.log(data);
          if (data.message) {
            this.toaster.error("User Not Blocked");
          }
          else if (data.failed) {
            this.toaster.info("Blocked But Didn't Notify The User");
          }
          else {
            this.toaster.success("User Blocked", "Success");
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

  public UnBlockUser(userId: any) {
    if (sessionStorage.getItem('number') == "1" && sessionStorage.getItem('token')) {
      this.service.unBlockUser(userId).subscribe(data => {
        console.log(data);

        if (data.message) {
          this.toaster.error("User Not Unblocked");
        }
        else if (data.failed) {
          this.toaster.info("Unblocked But Didn't Notify The User");
        }
        else {
          this.toaster.success("User Unblocked", "Success");
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

  public viewProfile(userData: User) {
    this.user = userData
  }

}
