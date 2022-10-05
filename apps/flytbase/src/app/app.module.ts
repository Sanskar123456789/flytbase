import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AgmCoreModule } from '@agm/core';
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: 
  [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
    ,InputNumberModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    SliderModule,
    FileUploadModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
