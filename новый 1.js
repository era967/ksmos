package com.example.solar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@SpringBootApplication
public class SolarSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(SolarSystemApplication.class, args);
    }
}

@Controller
class SolarSystemController {

    @GetMapping("/")
    public String home(Model model) {
        // Планеталардың тізімі
        List<Planet> planets = List.of(
                new Planet("Меркурий", "Ең кішкентай ғаламшар", 57.91),
                new Planet("Шолпан", "Ең ыстық ғаламшар", 108.2),
                new Planet("Жер", "Біздің ғаламшар", 149.6),
                new Planet("Марс", "Қызыл ғаламшар", 227.9),
                new Planet("Юпитер", "Ең үлкен ғаламшар", 778.5),
                new Planet("Сатурн", "Сақиналары бар ғаламшар", 1434.0),
                new Planet("Уран", "Мұзды сақиналары бар ғаламшар", 2871.0),
                new Planet("Нептун", "Ең алыс ғаламшар", 4495.1)
        );
        model.addAttribute("planets", planets);
        return "solar";
    }

    static class Planet {
        private String name;
        private String description;
        private double distanceFromSun;

        public Planet(String name, String description, double distanceFromSun) {
            this.name = name;
            this.description = description;
            this.distanceFromSun = distanceFromSun;
        }

        public String getName() {
            return name;
        }

        public String getDescription() {
            return description;
        }

        public double getDistanceFromSun() {
            return distanceFromSun;
        }
    }
}

@Controller
class TemplateController {

    @GetMapping("/solar")
    @ResponseBody
    public String solarPage() {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Күн жүйесі</title>
                </head>
                <body>
                    <h1>Күн жүйесі</h1>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Атауы</th>
                                <th>Сипаттамасы</th>
                                <th>Күннен қашықтығы (млн км)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr th:each="planet : ${planets}">
                                <td th:text="${planet.name}">Атауы</td>
                                <td th:text="${planet.description}">Сипаттамасы</td>
                                <td th:text="${planet.distanceFromSun}">0.0</td>
                            </tr>
                        </tbody>
                    </table>
                </body>
                </html>
                """;
    }
}
