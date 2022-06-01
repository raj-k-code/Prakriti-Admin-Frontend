import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {
  profileImage: any
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('image')) {
      this.profileImage = sessionStorage.getItem('image')
    }
    else
      this.profileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyw551VPZXNStb2o_1PS7LJpIVrR-qbwqyDuBj6m4Xa3ePEE9DqQVB2_U9JsMoPKRrhHE&usqp=CAU"


  }

  // goToHome() {
  //   this.router.navigate(['admin']);
  // }
  // raj

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
