import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainTimelineComponent } from './main-timeline/main-timeline.component';
import { FamousTagsComponent } from './famous-tags/famous-tags.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddArticleComponent } from './dashboard/modals/add-article/add-article.component';
import { AddEventComponent } from './dashboard/modals/add-event/add-event.component';
import { ReactiveFormsModule } from "@angular/forms";
import { EditEventComponent } from './dashboard/modals/edit-event/edit-event.component';
import { TextareaAutoresizeDirective } from './textarea-autoresize.directive';
import { MzdTimelineModule } from 'ngx-mzd-timeline';
import { HorizontalComponent } from './main-timeline/horizontal/horizontal.component';
import { VerticalComponent } from './main-timeline/vertical/vertical.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainTimelineComponent,
    FamousTagsComponent,
    PageNotFoundComponent,
    AddArticleComponent,
    AddEventComponent,
    EditEventComponent,
    TextareaAutoresizeDirective,
    HorizontalComponent,
    VerticalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    MzdTimelineModule,
  ],
  providers: [
    Title
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
