import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TypingService } from '../../services/typing.service';
import { TextSnippet } from '../../models/models';

@Component({
  selector: 'app-typing-test',
  templateUrl: './typing-test.component.html',
  styleUrls: ['./typing-test.component.css']
})
export class TypingTestComponent implements OnInit, OnDestroy {

  playerName = '';
  difficulty = 'EASY';
  snippet: TextSnippet | null = null;
  snippetChars: string[] = [];
  loading = true;

  userInput = '';
  testStarted = false;
  testFinished = false;

  wpm = 0;
  accuracy = 100;
  timeLeft = 60;
  correctChars = 0;
  totalChars = 0;

  private timer: any;
  private startTime: Date | null = null;

  constructor(private typingService: TypingService, private router: Router) {}

  ngOnInit(): void {
    this.playerName = sessionStorage.getItem('playerName') || 'Player';
    this.difficulty  = sessionStorage.getItem('difficulty') || 'EASY';
    this.loadSnippet();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  loadSnippet(): void {
    this.loading = true;
    this.typingService.getRandomByDifficulty(this.difficulty).subscribe({
      next: (data) => {
        this.snippet = data;
        this.snippetChars = data.content.split('');
        this.totalChars = data.content.length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  startTest(): void {
    this.testStarted = true;
    this.startTime = new Date();
    this.userInput = '';
    this.timeLeft = 60;

    this.timer = setInterval(() => {
      this.timeLeft--;
      this.calculateStats();
      if (this.timeLeft <= 0) {
        this.finishTest();
      }
    }, 1000);
  }

  onInput(): void {
    if (!this.testStarted || this.testFinished) return;
    this.calculateStats();

    // Auto-finish when user types the full text
    if (this.snippet && this.userInput.length >= this.snippet.content.length) {
      this.finishTest();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    // Prevent Tab key from moving focus
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  }

  calculateStats(): void {
    if (!this.snippet || !this.startTime) return;

    const typed = this.userInput;
    const original = this.snippet.content;

    // Calculate correct characters
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === original[i]) correct++;
    }
    this.correctChars = correct;

    // Accuracy
    if (typed.length > 0) {
      this.accuracy = Math.round((correct / typed.length) * 100);
    }

    // WPM = (characters typed / 5) / minutes elapsed
    const elapsedMinutes = (60 - this.timeLeft) / 60;
    if (elapsedMinutes > 0) {
      this.wpm = Math.round((typed.length / 5) / elapsedMinutes);
    }
  }

  finishTest(): void {
    this.clearTimer();
    this.testFinished = true;
    this.calculateStats();

    // Save result and navigate to results
    const result = {
      playerName: this.playerName,
      wpm: this.wpm,
      accuracy: this.accuracy,
      difficulty: this.difficulty
    };

    this.typingService.saveResult(result).subscribe({
      next: (saved) => {
        sessionStorage.setItem('lastResult', JSON.stringify(saved));
        this.router.navigate(['/results']);
      },
      error: () => {
        sessionStorage.setItem('lastResult', JSON.stringify(result));
        this.router.navigate(['/results']);
      }
    });
  }

  resetTest(): void {
    this.clearTimer();
    this.testStarted = false;
    this.testFinished = false;
    this.userInput = '';
    this.wpm = 0;
    this.accuracy = 100;
    this.timeLeft = 60;
    this.correctChars = 0;
    this.loadSnippet();
  }

  goHome(): void {
    this.clearTimer();
    this.router.navigate(['/']);
  }

  getCharClass(index: number): string {
    if (index === this.userInput.length) return 'char-current';
    if (index < this.userInput.length) {
      return this.userInput[index] === this.snippetChars[index] ? 'char-correct' : 'char-wrong';
    }
    return 'char-default';
  }

  get difficultyClass(): string {
    const map: { [key: string]: string } = {
      EASY: 'badge-easy', MEDIUM: 'badge-medium', HARD: 'badge-hard'
    };
    return map[this.difficulty] || 'badge-easy';
  }

  get accuracyColor(): string {
    if (this.accuracy >= 95) return 'text-green';
    if (this.accuracy >= 80) return 'text-yellow';
    return 'text-red';
  }

  get timerColor(): string {
    if (this.timeLeft > 30) return 'text-green';
    if (this.timeLeft > 10) return 'text-yellow';
    return 'text-red';
  }

  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
