package com.kundan.research_platform.service;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JWTService {
    private final String SECRET = "myVerySecretKeyForResearchPlatformProject123456";

    public String generateToken(String username, String role) {

        return JWT.create()

                .withSubject(username)

                .withClaim("role", role)

                .withIssuedAt(new Date())

                .withExpiresAt(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60)
                )

                .sign(Algorithm.HMAC256(SECRET));

    }

    public String extractUsername(String token) {
        return JWT.require(Algorithm.HMAC256(SECRET))
                .build()
                .verify(token)
                .getSubject();
    }

    public boolean validateToken(String token, String username) {
        String extractedUsername = extractUsername(token);
        return extractedUsername.equals(username);
    }

}