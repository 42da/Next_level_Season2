package com.nextlevel.evas.typehandler;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import org.apache.ibatis.type.JapaneseDateTypeHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonArrayLocalDateTypeHandler extends JapaneseDateTypeHandler {

  protected List<LocalDate> convertJsonToList(String jsonDates) {
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      return objectMapper.readValue(jsonDates, new TypeReference<List<LocalDate>>() {});
    } catch (IOException e) {
      throw new RuntimeException("Failed to convert JSON to List<LocalDate>", e);
    }
  }

  protected String convertListToJson(List<LocalDate> dateList) {
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      return objectMapper.writeValueAsString(dateList);
    } catch (IOException e) {
      throw new RuntimeException("Failed to convert List<LocalDate> to JSON", e);
    }
  }
}
