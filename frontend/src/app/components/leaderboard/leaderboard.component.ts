import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypingService } from '../../services/typing.service';
import { TypingResult } from '../../models/models';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  results: TypingResult[] = [];
  loading = true;

  constructor(private typingService: TypingService, private router: Router) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    this.loading = true;
    this.typingService.getLeaderboard().subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  refresh(): void { this.loadLeaderboard(); }
  goTest(): void { this.router.navigate(['/test']); }

  getRankIcon(index: number): string {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  }

  getAccuracyClass(acc: number): string {
    if (acc >= 95) return 'text-green';
    if (acc >= 80) return 'text-yellow';
    return 'text-red';
  }

  getDiffClass(diff: string): string {
    const map: { [k: string]: string } = {
      EASY: 'badge-easy', MEDIUM: 'badge-medium', HARD: 'badge-hard'
    };
    return map[diff] || 'badge-easy';
  }

  formatDate(dateStr: string | undefined): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
