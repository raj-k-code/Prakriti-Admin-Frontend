import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/model/category';
import { AdminService } from 'src/app/service/admin.service';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryList: Category[] = [];
  category = new Category("", "", "", "", "");
  categoryEdit = new Category("", "", "", "", "");

  showImage: any;
  editShowImage: any;

  constructor(private spinner: NgxSpinnerService, private service: AdminService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.categoryList().subscribe(data => {
      if (data.length > 0) {
        this.categoryList = data
        console.log(this.categoryList);
      }
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


  public onSelect(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.showImage = event.target.result;
      };
      this.category.categoryImage = e.target.files[0];
      this.categoryEdit.categoryImage = e.target.files[0];
    }
  }

  public addNewCategory() {

    const formData = new FormData();
    formData.append('categoryImage', this.category.categoryImage);
    formData.append('categoryName', this.category.categoryName);

    this.service.addCategory(formData).subscribe(data => {
      if (data._id) {
        this.toaster.success("Category Added Successfully", "Success")
        this.ngOnInit();
      }
      else {
        this.toaster.error("Category Not Added", "Error")
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

  setBlanck() {
    this.showImage = "";
    this.category.categoryName = ""
    this.categoryEdit.categoryImage = "";
    this.categoryEdit.categoryName = "";
  }

  public deleteCategory(categoryId: any, index: any) {
    if (confirm("Are You Sure")) {
      this.service.deleteCategory(categoryId).subscribe(data => {
        if (data.Delete) {
          this.toaster.success("Category Deleted", "Success")
          this.categoryList.splice(index, 1);
        }
        else {
          this.toaster.error("Category Not Deleted", "Error")
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

  public editCategory() {

    console.log(this.categoryEdit);
    const formData = new FormData();
    formData.append('categoryImage', this.categoryEdit.categoryImage);
    formData.append('categoryName', this.categoryEdit.categoryName);
    formData.append('categeryId', this.categoryEdit._id);
    formData.append('oldImage', this.categoryEdit.oldImage);


    this.service.editCategory(formData).subscribe(data => {
      if (data.success) {
        this.toaster.success("Category Updated Successfully", "Success");
        this.ngOnInit();
      }
      else {
        this.toaster.error("Category Not Updated", "Error")
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


  public viewCategory(categoryData: Category) {
    this.categoryEdit = categoryData;
    this.showImage = this.categoryEdit.categoryImage
    this.categoryEdit.oldImage = this.categoryEdit.categoryImage
  }

}
