import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent {

  constructor(public authService: AuthService) { }

}
