package com.typespeed.repository;

import com.typespeed.model.TypingResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypingResultRepository extends JpaRepository<TypingResult, Long> {

          // Find results by player name (case-insensitive)
          List<TypingResult> findByPlayerNameIgnoreCase(String playerName);

          // Find top 10 results sorted by WPM descending
          List<TypingResult> findTop10ByOrderByWpmDesc();
}
