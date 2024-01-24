import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenucartComponent } from './components/menucart/menucart.component';
import { HttpClientModule } from  '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './components/cart/cart.component';
import { HammerModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MenucartComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule,
    MatButtonModule,
    MatDialogModule, BrowserAnimationsModule,  HammerModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right',
    preventDuplicates: true,}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
