package com.zqh.web;//疫苗提醒静态接口

import com.google.gson.Gson;
import com.zqh.pojo.Pet;
import com.zqh.pojo.PetVac;
import com.zqh.service.PetService;
import com.zqh.service.PetVacService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/Vaccinations")
public class VacServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, SecurityException {
        Integer petId = Integer.parseInt(request.getParameter("petId"));
        Pet pet = new PetService().getPetById(petId);

        response.setContentType("application/json");
        new Gson().toJson(pet.getVacs(), response.getWriter());
    }
}