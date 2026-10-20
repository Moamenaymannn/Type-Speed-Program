package com.typespeed.service;

import com.typespeed.model.TypingResult;
import com.typespeed.repository.TypingResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypingResultService {

          @Autowired
          private TypingResultRepository typingResultRepository;

          // Save a new typing result
          public TypingResult save(TypingResult result) {
                    return typingResultRepository.save(result);
          }

          // Get top 10 scores (leaderboard)
          public List<TypingResult> getTopScores() {
                    return typingResultRepository.findTop10ByOrderByWpmDesc();
          }

          // Get all scores for a specific player
          public List<TypingResult> getScoresByPlayer(String playerName) {
                    return typingResultRepository.findByPlayerNameIgnoreCase(playerName);
          }

          // Get all results
          public List<TypingResult> getAll() {
                    return typingResultRepository.findAll();
          }
}
