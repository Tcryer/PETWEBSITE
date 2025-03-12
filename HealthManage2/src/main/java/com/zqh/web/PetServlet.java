package com.zqh.web;//宠物信息列表（给静态页面提供接口）

import com.google.gson.Gson;
import com.zqh.pojo.Pet;
import com.zqh.service.PetService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/pets")
public class PetServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request , HttpServletResponse response) throws IOException, SecurityException{

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Integer petId = Integer.parseInt(request.getParameter("petId"));
        Pet pet = new PetService().getPetById(petId);
        new Gson().toJson(pet, response.getWriter());
    }
}
