import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TypingTestComponent } from './components/typing-test/typing-test.component';
import { ResultsComponent } from './components/results/results.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

const routes: Routes = [
  { path: '',           component: HomeComponent },
  { path: 'test',       component: TypingTestComponent },
  { path: 'results',    component: ResultsComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '**',         redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
