package com.typespeed.repository;

import com.typespeed.model.TextSnippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TextSnippetRepository extends JpaRepository<TextSnippet, Long> {

          // Find text snippets by difficulty level
          List<TextSnippet> findByDifficulty(String difficulty);
}
