import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { QueryService } from 'src/app/service/query.service';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.css']
})
export class QueryListComponent implements OnInit {
  queryList: any;
  page: any;
  sendEmail: any;
  message: any;
  queryId: any;

  constructor(private spinner: NgxSpinnerService, private queryService: QueryService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.queryService.queryList().subscribe(data => {
      if (data.length > 0)
        this.queryList = data
      console.log(data);
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

  rejectQuery(queryId: any, email: any) {
    if (confirm("Are You Sure ?")) {
      this.queryService.deleteQuery(queryId, email).subscribe(data => {
        if (data.Delete) {
          this.toaster.success("Deleted Successfully.")
          this.ngOnInit();
        }
        else {
          this.toaster.error("Not Deleted");
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

  public setEmail(email: any, queryId: any) {
    this.sendEmail = email;
    this.queryId = queryId;
  }

  public sendResponse() {
    this.queryService.sendResponse(this.sendEmail, this.message, this.queryId).subscribe(data => {
      if (data.success) {
        this.toaster.success("Response Sent Successfully");
        this.ngOnInit()
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
