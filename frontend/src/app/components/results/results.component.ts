import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypingResult } from '../../models/models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  result: TypingResult | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const raw = sessionStorage.getItem('lastResult');
    if (raw) {
      this.result = JSON.parse(raw);
    } else {
      this.router.navigate(['/']);
    }
  }

  get resultIcon(): string {
    const wpm = this.result?.wpm || 0;
    if (wpm >= 80) return '🏆';
    if (wpm >= 60) return '🥈';
    if (wpm >= 40) return '🥉';
    return '⌨️';
  }

  get resultTitle(): string {
    const wpm = this.result?.wpm || 0;
    if (wpm >= 80) return 'Excellent! You\'re a Speed Typist!';
    if (wpm >= 60) return 'Great Job! You\'re Above Average!';
    if (wpm >= 40) return 'Good Work! Keep Practicing!';
    return 'Nice Try! Practice Makes Perfect!';
  }

  get performanceMessage(): string {
    const wpm = this.result?.wpm || 0;
    const acc = this.result?.accuracy || 0;
    if (wpm >= 80 && acc >= 95) return 'Outstanding performance! You demonstrate excellent speed and precision. You\'re well above the average typist.';
    if (wpm >= 60) return 'You\'re typing faster than most people. With a bit more practice you can reach expert level.';
    if (wpm >= 40) return 'You\'re at an average typing speed. Regular practice sessions will significantly improve your WPM.';
    return 'Keep practicing daily-even 10 minutes a day can boost your WPM dramatically within a few weeks.';
  }

  get tips(): string[] {
    const tips: string[] = [];
    if ((this.result?.accuracy || 0) < 90) tips.push('Focus on accuracy first-slow down and make fewer mistakes.');
    if ((this.result?.wpm || 0) < 40) tips.push('Practice with easy texts before moving to harder ones.');
    if ((this.result?.wpm || 0) >= 40) tips.push('Try a harder difficulty to challenge yourself further!');
    return tips;
  }

  get accuracyColor(): string {
    const acc = this.result?.accuracy || 0;
    if (acc >= 95) return 'text-green';
    if (acc >= 80) return 'text-yellow';
    return 'text-red';
  }

  get difficultyClass(): string {
    const map: { [key: string]: string } = {
      EASY: 'badge-easy', MEDIUM: 'badge-medium', HARD: 'badge-hard'
    };
    return map[this.result?.difficulty || ''] || 'badge-easy';
  }

  tryAgain(): void { this.router.navigate(['/test']); }
  viewLeaderboard(): void { this.router.navigate(['/leaderboard']); }
  goHome(): void { this.router.navigate(['/']); }
}
