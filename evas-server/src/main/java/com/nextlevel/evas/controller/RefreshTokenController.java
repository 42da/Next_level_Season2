package com.nextlevel.evas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.nextlevel.evas.domain.AccessToken;
import com.nextlevel.evas.form.RefreshTokenForm;
import com.nextlevel.evas.service.RefreshTokenService;

@Controller
public class RefreshTokenController {

  private final RefreshTokenService refreshTokenService;

  @Autowired
  public RefreshTokenController(RefreshTokenService refreshTokenService) {
    this.refreshTokenService = refreshTokenService;
  }

  @PostMapping("refresh-token")
  @ResponseBody
  public AccessToken createRefreshToken(@RequestBody RefreshTokenForm form) {
    return refreshTokenService.createAccessToken(form.getRefreshToken());
  }

}
