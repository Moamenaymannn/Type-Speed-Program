package com.typespeed.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "typing_result")
public class TypingResult {

          @Id
          @GeneratedValue(strategy = GenerationType.IDENTITY)
          private Long id;

          @Column(nullable = false)
          private String playerName;

          @Column(nullable = false)
          private int wpm; // Words Per Minute

          @Column(nullable = false)
          private double accuracy; // Percentage 0-100

          @Column(nullable = false)
          private String difficulty; // EASY, MEDIUM, HARD

          @Column(nullable = false)
          private LocalDateTime createdAt;

          // Default constructor (required by JPA)
          public TypingResult() {
          }

          @PrePersist
          public void prePersist() {
                    this.createdAt = LocalDateTime.now();
          }

          // Getters and Setters
          public Long getId() {
                    return id;
          }

          public void setId(Long id) {
                    this.id = id;
          }

          public String getPlayerName() {
                    return playerName;
          }

          public void setPlayerName(String playerName) {
                    this.playerName = playerName;
          }

          public int getWpm() {
                    return wpm;
          }

          public void setWpm(int wpm) {
                    this.wpm = wpm;
          }

          public double getAccuracy() {
                    return accuracy;
          }

          public void setAccuracy(double accuracy) {
                    this.accuracy = accuracy;
          }

          public String getDifficulty() {
                    return difficulty;
          }

          public void setDifficulty(String difficulty) {
                    this.difficulty = difficulty;
          }

          public LocalDateTime getCreatedAt() {
                    return createdAt;
          }

          public void setCreatedAt(LocalDateTime createdAt) {
                    this.createdAt = createdAt;
          }
}
