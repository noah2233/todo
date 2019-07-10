import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { TodoModule } from './todo/todo.module';

// Ng2PageScroll
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { TodoData } from './todo-data';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TodoModule,
    Ng2PageScrollModule.forRoot(),
    HttpClientInMemoryWebApiModule.forRoot(TodoData),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
