import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profileImage: any

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('image')) {
      this.profileImage = sessionStorage.getItem('image')
    }
    else
      this.profileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyw551VPZXNStb2o_1PS7LJpIVrR-qbwqyDuBj6m4Xa3ePEE9DqQVB2_U9JsMoPKRrhHE&usqp=CAU"
  }

  public signOut() {
    if (confirm("Are You Sure ?")) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
  }

  defaultImage() {
    sessionStorage.setItem('image', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyw551VPZXNStb2o_1PS7LJpIVrR-qbwqyDuBj6m4Xa3ePEE9DqQVB2_U9JsMoPKRrhHE&usqp=CAU");
  }

}
