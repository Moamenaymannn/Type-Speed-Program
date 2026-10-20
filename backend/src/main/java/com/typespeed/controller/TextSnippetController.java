package com.typespeed.controller;

import com.typespeed.model.TextSnippet;
import com.typespeed.service.TextSnippetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/snippets")
public class TextSnippetController {

          @Autowired
          private TextSnippetService textSnippetService;

          // GET /api/snippets - Get all snippets (optional ?difficulty=EASY)
          @GetMapping
          public List<TextSnippet> getSnippets(@RequestParam(required = false) String difficulty) {
                    if (difficulty != null && !difficulty.isEmpty()) {
                              return textSnippetService.getByDifficulty(difficulty);
                    }
                    return textSnippetService.getAll();
          }

          // GET /api/snippets/random - Get a random snippet
          @GetMapping("/random")
          public ResponseEntity<TextSnippet> getRandom() {
                    TextSnippet snippet = textSnippetService.getRandom();
                    if (snippet == null) {
                              return ResponseEntity.notFound().build();
                    }
                    return ResponseEntity.ok(snippet);
          }

          // GET /api/snippets/random?difficulty=HARD - Get random by difficulty
          @GetMapping("/random/by-difficulty")
          public ResponseEntity<TextSnippet> getRandomByDifficulty(@RequestParam String difficulty) {
                    TextSnippet snippet = textSnippetService.getRandomByDifficulty(difficulty);
                    if (snippet == null) {
                              return ResponseEntity.notFound().build();
                    }
                    return ResponseEntity.ok(snippet);
          }
}
