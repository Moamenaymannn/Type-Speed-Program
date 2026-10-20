package com.typespeed.service;

import com.typespeed.model.TextSnippet;
import com.typespeed.repository.TextSnippetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class TextSnippetService {

          @Autowired
          private TextSnippetRepository textSnippetRepository;

          // Get all text snippets
          public List<TextSnippet> getAll() {
                    return textSnippetRepository.findAll();
          }

          // Get snippets filtered by difficulty
          public List<TextSnippet> getByDifficulty(String difficulty) {
                    return textSnippetRepository.findByDifficulty(difficulty.toUpperCase());
          }

          // Get a single random snippet
          public TextSnippet getRandom() {
                    List<TextSnippet> all = textSnippetRepository.findAll();
                    if (all.isEmpty()) {
                              return null;
                    }
                    Random random = new Random();
                    return all.get(random.nextInt(all.size()));
          }

          // Get a random snippet by difficulty
          public TextSnippet getRandomByDifficulty(String difficulty) {
                    List<TextSnippet> filtered = textSnippetRepository.findByDifficulty(difficulty.toUpperCase());
                    if (filtered.isEmpty()) {
                              return getRandom();
                    }
                    Random random = new Random();
                    return filtered.get(random.nextInt(filtered.size()));
          }
}
