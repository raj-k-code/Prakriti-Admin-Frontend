import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { AdminService } from 'src/app/service/admin.service';
import { ProductService } from 'src/app/service/product.service';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productList: any[] = []
  nurseryOwnerId: any;
  page: any = 1;
  product = new Product("", "", "", "", "", "", "", "", "");
  starRating: any;
  categoryList: Category[] = [];
  showImage: any;
  productEdit = new Product("", "", "", "", "", "", "", "", "");

  constructor(private spinner: NgxSpinnerService, private service: ProductService, private toaster: ToastrService, private activatedRoute: ActivatedRoute, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.service.viewProductList(sessionStorage.getItem('userId')).subscribe(data => {

      this.productList = data
      console.log(this.productList)
      this.spinner.hide();
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          this.toaster.info("No Products Found", "Sorry");
        }
        else if (err.status == 500) {
          this.toaster.error("Internal Server Error", "Error");

        }
        else if (err.status == 400) {
          this.toaster.error("Bad Request", "Error");

        }
      }
    });

    this.adminService.categoryList().subscribe(data => {
      if (data.length > 0) {
        this.categoryList = data
        console.log(this.categoryList);
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

  viewProduct(productData: Product, whichOne: any) {


    if (whichOne == true) {
      var total = 0;
      for (let rating of productData.productRating) {
        total = total + rating.rate;
      }
      this.starRating = total / 5;

      this.showImage = productData.productImage

      this.product = productData;
      console.log(this.product)
    }
    else {
      this.productEdit.oldImage = productData.productImage
      this.showImage = productData.productImage
      this.productEdit = productData
      console.log(this.productEdit)
    }
  }

  public onSelect(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.showImage = event.target.result;
      };
      this.product.productImage = e.target.files[0];
      this.productEdit.productImage = e.target.files[0];
    }
  }

  public addNewProduct() {
    console.log(this.product)
    this.product.createdBy = sessionStorage.getItem('userId');

    const formData = new FormData();
    formData.append('productName', this.product.productName);
    formData.append('categoryName', this.product.categoryName);
    formData.append('productPrice', this.product.productPrice);
    formData.append('productDescription', this.product.productDescription);
    formData.append('createdBy', this.product.createdBy);
    formData.append('productImage', this.product.productImage);

    this.service.addProduct(formData).subscribe(data => {
      if (data._id) {
        this.toaster.success("Product Added Successfully", "Success")
        this.ngOnInit();
      }
      else {
        this.toaster.error("Product Not Added", "Error")
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
    this.product._id = "";
    this.product.categoryName = ""
    this.product.createdBy = ""
    this.product.oldImage = ""
    this.product.productDescription = ""
    this.product.productImage = ""
    this.product.productName = ""
    this.product.productPrice = ""
    this.product.productRating = ""


  }

  public deleteProduct(productId: any, pageNo: any, index: any) {
    if (confirm("Are You Sure ?")) {
      this.service.deleteProduct(productId).subscribe(data => {
        if (data.Delete) {
          this.toaster.success("Producct Deleted", "Success")

          index = (pageNo - 1) * 8 + (index)

          this.productList.splice(index, 1);
        }
        else {
          this.toaster.error("Product Not Deleted", "Error")
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
    console.log(this.productEdit);
    this.productEdit.createdBy = sessionStorage.getItem('userId');

    const formData = new FormData();
    formData.append('productName', this.productEdit.productName);
    formData.append('categoryName', this.productEdit.categoryName);
    formData.append('productPrice', this.productEdit.productPrice);
    formData.append('productDescription', this.productEdit.productDescription);
    formData.append('createdBy', this.productEdit.createdBy);
    formData.append('productImage', this.productEdit.productImage);
    formData.append('oldImage', this.productEdit.oldImage);
    formData.append('productId', this.productEdit._id);



    this.service.editProduct(formData).subscribe(data => {
      if (data.success) {
        this.toaster.success("Product Updated Successfully", "Success");
        this.ngOnInit();
      }
      else {
        this.toaster.error("Product Not Updated", "Error")
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
