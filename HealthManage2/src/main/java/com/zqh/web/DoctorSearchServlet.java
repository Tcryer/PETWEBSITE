package com.zqh.web;//医生筛选

import com.google.gson.Gson;
import com.zqh.pojo.Doctor;
import com.zqh.service.DoctorService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/doctor/search")
public class DoctorSearchServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws SecurityException, IOException{
        String region = request.getParameter("region");
        String doctorCode = request.getParameter("doctorCode");
        String name = request.getParameter("name");

        List<Doctor> doctors = new DoctorService().searchDoctors(region, doctorCode, name);

        response.setContentType("application/json");
        new Gson().toJson(doctors, response.getWriter());
    }

}
