import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  public blogList(nurseryId: any) {
    let blogListApi = "http://localhost:3000/blog/blog-list-nurseryowner/" + nurseryId;
    return this.http.get<Blog[]>(blogListApi)
  }

  public addBlog(blogData: FormData) {
    let addBlogApi = "http://localhost:3000/blog/add";
    return this.http.post<any>(addBlogApi, blogData)
  }

  public blogDelete(blogId: any) {
    let blogDeleteApi = "http://localhost:3000/blog/delete";
    return this.http.post<any>(blogDeleteApi, { blogId: blogId })
  }

  public editBlog(blogData: FormData) {
    let editBlogApi = "http://localhost:3000/blog/edit";
    return this.http.post<any>(editBlogApi, blogData)
  }
}
