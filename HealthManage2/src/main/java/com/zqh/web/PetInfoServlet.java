package com.zqh.web;

import com.zqh.pojo.PetInfo;
import com.zqh.pojo.PetVac;
import com.zqh.service.PetInfoService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/InfoSelect")
public class PetInfoServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)throws SecurityException, IOException{
        Integer InfoId = Integer.parseInt(request.getParameter("id"));
        PetInfo petInfo = new PetInfoService().getPetInfo(InfoId);

        //构造JSON
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print("{");
        out.print("\"id\":" + petInfo.getId() + ",");
        out.print("\"name\":\"" + petInfo.getPetName() + "\",");
        out.print("\"vaccinations\":[");
        for (PetVac v : petInfo.getPetVacs()) {
            out.print("{");
            out.print("\"vaccineName\":\"" + v.getVacName() + "\",");
            out.print("\"scheduledDate\":\"" + v.getVacDate() + "\",");
            out.print("\"isCompleted\":" + v.getVacStatus());
            out.print("},");
        }
        out.print("]}");
    }

}
