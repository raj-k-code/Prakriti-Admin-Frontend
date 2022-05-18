import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // goToHome() {
  //   this.router.navigate(['admin']);
  // }

  public signOut() {
    if (confirm("Are You Sure ?")) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
  }

}
