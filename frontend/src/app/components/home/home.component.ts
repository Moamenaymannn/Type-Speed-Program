import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  playerName = '';
  selectedDifficulty = 'EASY';

  difficulties = [
    { value: 'EASY', label: 'Easy', icon: '🟢', desc: '20-40 WPM' },
    { value: 'MEDIUM', label: 'Medium', icon: '🟡', desc: '40-70 WPM' },
    { value: 'HARD', label: 'Hard', icon: '🔴', desc: '70+ WPM' }
  ];

  constructor(private router: Router) { }

  startTest(): void {
    if (!this.playerName.trim()) return;
    // Store player info in sessionStorage so TypingTestComponent can read it
    sessionStorage.setItem('playerName', this.playerName.trim());
    sessionStorage.setItem('difficulty', this.selectedDifficulty);
    this.router.navigate(['/test']);
  }
}
