import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass'],
})
export class NavBarComponent {
  public showCartBool: boolean = false;
  public queryParams: Params;

  constructor(
    public translateService: TranslateService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe((params) => {
      this.queryParams = params
    })
    translateService.addLangs(['nl', 'en']);
    translateService.setDefaultLang('nl');
  }

  public showCart() {
    this.showCartBool = !this.showCartBool;
  }
  public goToHome() {
    this.router.navigate(['']
    );
  }
}
