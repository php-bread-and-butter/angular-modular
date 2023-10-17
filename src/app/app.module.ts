import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/shared/jwt-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    NavigationItem,
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
