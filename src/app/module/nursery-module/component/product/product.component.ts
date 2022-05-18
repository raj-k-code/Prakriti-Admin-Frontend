import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList: Product[] = [];
  product = new Product("", "", "", "", "", "", "");
  productEdit = new Product("", "", "", "", "", "", "");

  showImage: any;
  editShowImage: any;
  page: any;

  constructor(private service: ProductService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.service.viewProductList(sessionStorage.getItem('userId')).subscribe(data => {
      if (data.length > 0) {
        this.productList = data
        console.log(this.productList);
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


  // public onSelect(e: any) {
  //   if (e.target.files) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);
  //     reader.onload = (event: any) => {
  //       this.showImage = event.target.result;
  //     };
  //     this.product.productImage = e.target.files[0];
  //     this.productEdit.productImage = e.target.files[0];
  //   }
  // }

  // public addNewProduct() {

  //   const formData = new FormData();
  //   formData.append('categoryImage', this.category.categoryImage);
  //   formData.append('categoryName', this.category.categoryName);

  //   this.service.addCategory(formData).subscribe(data => {
  //     if (data._id) {
  //       this.toaster.success("Category Added Successfully", "Success")
  //       this.ngOnInit();
  //     }
  //     else {
  //       this.toaster.error("Category Not Added", "Error")
  //     }
  //   }, err => {
  //     if (err instanceof HttpErrorResponse) {
  //       if (err.status == 500) {
  //         this.toaster.error("Internal Server Error", "Error");

  //       }
  //       else if (err.status == 400) {
  //         this.toaster.error("Bad Request", "Error");

  //       }
  //     }
  //   });
  // }

  // setBlanck() {
  //   this.showImage = "";
  //   this.category.categoryName = ""
  //   this.categoryEdit.categoryImage = "";
  //   this.categoryEdit.categoryName = "";
  // }

  // public deleteCategory(categoryId: any, index: any) {
  //   if (confirm("Are You Sure")) {
  //     this.service.deleteCategory(categoryId).subscribe(data => {
  //       if (data.Delete) {
  //         this.toaster.success("Category Deleted", "Success")
  //         this.categoryList.splice(index, 1);
  //       }
  //       else {
  //         this.toaster.error("Category Not Deleted", "Error")
  //       }
  //     }, err => {
  //       if (err instanceof HttpErrorResponse) {
  //         if (err.status == 500) {
  //           this.toaster.error("Internal Server Error", "Error");

  //         }
  //         else if (err.status == 400) {
  //           this.toaster.error("Bad Request", "Error");

  //         }
  //       }
  //     });
  //   }
  // }

  // public editCategory() {

  //   console.log(this.categoryEdit);
  //   const formData = new FormData();
  //   formData.append('categoryImage', this.categoryEdit.categoryImage);
  //   formData.append('categoryName', this.categoryEdit.categoryName);
  //   formData.append('categeryId', this.categoryEdit._id);
  //   formData.append('oldImage', this.categoryEdit.oldImage);


  //   this.service.editCategory(formData).subscribe(data => {
  //     if (data.success) {
  //       this.toaster.success("Category Updated Successfully", "Success");
  //       this.ngOnInit();
  //     }
  //     else {
  //       this.toaster.error("Category Not Updated", "Error")
  //     }
  //   }, err => {
  //     if (err instanceof HttpErrorResponse) {
  //       if (err.status == 500) {
  //         this.toaster.error("Internal Server Error", "Error");

  //       }
  //       else if (err.status == 400) {
  //         this.toaster.error("Bad Request", "Error");

  //       }
  //     }
  //   });
  // }


  // public viewCategory(categoryData: Category) {
  //   this.categoryEdit = categoryData;
  //   this.showImage = this.categoryEdit.categoryImage
  //   this.categoryEdit.oldImage = this.categoryEdit.categoryImage
  // }

}
