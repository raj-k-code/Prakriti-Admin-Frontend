import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Blog } from 'src/app/model/blog';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogList: Blog[] = []
  // nurseryOwnerId: any;
  page: any = 1;
  blog = new Blog("", "", "", "", "", "", "", "");
  showImage: any;
  blogEdit = new Blog("", "", "", "", "", "", "", "");

  constructor(private spinner: NgxSpinnerService, private service: BlogService, private toaster: ToastrService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();

    this.service.blogList(sessionStorage.getItem('userId')).subscribe(data => {

      this.blogList = data
      console.log(this.blogList)
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
  }

  viewBlog(blogData: Blog, whichOne: any) {
    if (whichOne == true) {
      this.blog = blogData;
      console.log(this.blog)
    }
    else {
      this.blogEdit.oldImage = blogData.blogImage
      this.showImage = blogData.blogImage
      this.blogEdit = blogData
      console.log(this.blogEdit)
    }
  }

  public onSelect(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.showImage = event.target.result;
      };
      this.blog.blogImage = e.target.files[0];
      this.blogEdit.blogImage = e.target.files[0];
    }
  }

  public addNewBlog() {
    this.blog.createdBy = sessionStorage.getItem('userId');
    const formData = new FormData();
    formData.append('blogTitle', this.blog.blogTitle);
    formData.append('blogSubTitle', this.blog.blogSubTitle);
    formData.append('blogContent', this.blog.blogContent);
    formData.append('createdBy', this.blog.createdBy);
    formData.append('blogImage', this.blog.blogImage);

    this.service.addBlog(formData).subscribe(data => {
      if (data._id) {
        this.toaster.success("Blog Added Successfully", "Success")
        this.ngOnInit();
      }
      else {
        this.toaster.error("Blog Not Added", "Error")
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
    this.blog._id = "";
    this.blog.blogContent = ""
    this.blog.blogImage = ""
    this.blog.blogSubTitle = "";
    this.blog.blogTitle = ""
    this.blog.createdBy = "";
    this.showImage = ""
  }

  public deleteBlog(blogId: any, pageNo: any, index: any) {
    if (confirm("Are You Sure ?")) {
      this.service.blogDelete(blogId).subscribe(data => {
        if (data.Delete) {
          this.toaster.success("Blog Deleted", "Success")

          index = (pageNo - 1) * 8 + (index)

          this.blogList.splice(index, 1);
        }
        else {
          this.toaster.error("Blog Not Deleted", "Error")
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

  public editBlog() {
    this.blogEdit.createdBy = sessionStorage.getItem('userId');

    const formData = new FormData();
    formData.append('blogTitle', this.blogEdit.blogTitle);
    formData.append('blogSubTitle', this.blogEdit.blogSubTitle);
    formData.append('blogContent', this.blogEdit.blogContent);
    formData.append('createdBy', this.blogEdit.createdBy);
    formData.append('blogImage', this.blogEdit.blogImage);
    formData.append('oldImage', this.blogEdit.oldImage);
    formData.append('blogId', this.blogEdit._id);



    this.service.editBlog(formData).subscribe(data => {
      if (data.success) {
        this.toaster.success("Blog Updated Successfully", "Success");
        this.ngOnInit();
      }
      else {
        this.toaster.error("Blog Not Updated", "Error")
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
