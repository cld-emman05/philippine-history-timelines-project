import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { MainTimelineComponent } from './main-timeline/main-timeline.component';
import { FamousTagsComponent } from "./famous-tags/famous-tags.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AddArticleComponent } from './dashboard/modals/add-article/add-article.component';
import { DeleteArticleComponent} from './dashboard/modals/delete-article/delete-article.component';
import { AddEventComponent } from './dashboard/modals/add-event/add-event.component';
import { DeleteEventComponent} from './dashboard/modals/delete-event/delete-event.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, data: {title: 'Dashboard'}},
  {path: 'add-article', component: AddArticleComponent, data: {title: 'Add Article'}},
  {path: 'del-article', component: DeleteArticleComponent, data: {title: 'Delete Article'}},
  {path: 'add-event', component: AddEventComponent, data: {title: 'AddEvent'}},
  {path: 'del-event', component: DeleteEventComponent, data: {title: 'Delete Event'}},
  {path: 'main-timeline', component: MainTimelineComponent, data: {title: 'Main Timeline'}},
  {path: 'famous-tags', component: FamousTagsComponent, data: {title: 'Famous Tags'}},
  {path: '**', component: PageNotFoundComponent, data: {title: '404'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
