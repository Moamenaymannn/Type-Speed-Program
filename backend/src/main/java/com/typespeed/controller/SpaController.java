package com.typespeed.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Forwards Angular client-side routes to index.html when serving
 * the compiled frontend as static resources from Spring Boot.
 */
@Controller
public class SpaController {

    @RequestMapping(value = { "/", "/test", "/results", "/leaderboard" })
    public String forwardSpaRoutes() {
        return "forward:/index.html";
    }
}
