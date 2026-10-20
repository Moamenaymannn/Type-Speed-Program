package com.typespeed.controller;

import com.typespeed.model.TypingResult;
import com.typespeed.service.TypingResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class TypingResultController {

          @Autowired
          private TypingResultService typingResultService;

          // POST /api/results - Save a new typing result
          @PostMapping
          public ResponseEntity<TypingResult> saveResult(@RequestBody TypingResult result) {
                    TypingResult saved = typingResultService.save(result);
                    return ResponseEntity.ok(saved);
          }

          // GET /api/results/leaderboard - Get top 10 scores
          @GetMapping("/leaderboard")
          public List<TypingResult> getLeaderboard() {
                    return typingResultService.getTopScores();
          }

          // GET /api/results?playerName=John - Get scores by player name
          @GetMapping
          public List<TypingResult> getResults(@RequestParam(required = false) String playerName) {
                    if (playerName != null && !playerName.isEmpty()) {
                              return typingResultService.getScoresByPlayer(playerName);
                    }
                    return typingResultService.getAll();
          }
}
