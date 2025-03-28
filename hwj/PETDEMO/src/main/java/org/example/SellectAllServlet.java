package org.example;

import com.alibaba.fastjson.JSON;
import org.example.pojo.Pet;
import org.example.service.PetService;
import org.example.service.impl.PetServiceimpl;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/sellectAllServlet")
public class SellectAllServlet extends HttpServlet {
    private PetService petService = new PetServiceimpl();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Pet> pets = petService.selectAllPet();
        String jsonString = JSON.toJSONString(pets);
        response.setContentType("text/json;charset=utf-8");
        response.getWriter().write(jsonString);

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
