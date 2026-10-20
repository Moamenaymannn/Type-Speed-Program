package com.typespeed.model;

import javax.persistence.*;

@Entity
@Table(name = "text_snippet")
public class TextSnippet {

          @Id
          @GeneratedValue(strategy = GenerationType.IDENTITY)
          private Long id;

          @Column(nullable = false, columnDefinition = "TEXT")
          private String content;

          @Column(nullable = false)
          private String difficulty; // EASY, MEDIUM, HARD

          // Default constructor (required by JPA)
          public TextSnippet() {
          }

          public TextSnippet(String content, String difficulty) {
                    this.content = content;
                    this.difficulty = difficulty;
          }

          // Getters and Setters
          public Long getId() {
                    return id;
          }

          public void setId(Long id) {
                    this.id = id;
          }

          public String getContent() {
                    return content;
          }

          public void setContent(String content) {
                    this.content = content;
          }

          public String getDifficulty() {
                    return difficulty;
          }

          public void setDifficulty(String difficulty) {
                    this.difficulty = difficulty;
          }
}
