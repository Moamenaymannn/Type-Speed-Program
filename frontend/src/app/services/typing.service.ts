import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TextSnippet, TypingResult } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypingService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get a random text snippet
  getRandomSnippet(): Observable<TextSnippet> {
    return this.http.get<TextSnippet>(`${this.apiUrl}/snippets/random`);
  }

  // Get a random snippet by difficulty
  getRandomByDifficulty(difficulty: string): Observable<TextSnippet> {
    return this.http.get<TextSnippet>(`${this.apiUrl}/snippets/random/by-difficulty?difficulty=${difficulty}`);
  }

  // Get all snippets
  getAllSnippets(): Observable<TextSnippet[]> {
    return this.http.get<TextSnippet[]>(`${this.apiUrl}/snippets`);
  }

  // Save a typing result
  saveResult(result: TypingResult): Observable<TypingResult> {
    return this.http.post<TypingResult>(`${this.apiUrl}/results`, result);
  }

  // Get top 10 leaderboard
  getLeaderboard(): Observable<TypingResult[]> {
    return this.http.get<TypingResult[]>(`${this.apiUrl}/results/leaderboard`);
  }

  // Get results for a specific player
  getPlayerResults(playerName: string): Observable<TypingResult[]> {
    return this.http.get<TypingResult[]>(`${this.apiUrl}/results?playerName=${playerName}`);
  }
}
