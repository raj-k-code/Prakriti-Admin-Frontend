import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  public blogList(nurseryId: any) {
    let blogListApi = "https://prakritee.herokuapp.com/blog/blog-list-nurseryowner/" + nurseryId;
    return this.http.get<Blog[]>(blogListApi)
  }

  public addBlog(blogData: FormData) {
    let addBlogApi = "https://prakritee.herokuapp.com/blog/add";
    return this.http.post<any>(addBlogApi, blogData)
  }

  public blogDelete(blogId: any) {
    let blogDeleteApi = "https://prakritee.herokuapp.com/blog/delete";
    return this.http.post<any>(blogDeleteApi, { blogId: blogId })
  }

  public editBlog(blogData: FormData) {
    let editBlogApi = "https://prakritee.herokuapp.com/blog/edit";
    return this.http.post<any>(editBlogApi, blogData)
  }
}
