package com.zqh.web;//医生详情

import com.google.gson.Gson;
import com.zqh.pojo.Doctor;
import com.zqh.service.DoctorService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@WebServlet("/doctor/detail")
public class DoctorDetailServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws SecurityException, IOException{
        Integer doctorId = Integer.parseInt(request.getParameter("id"));
        Doctor doctor = new DoctorService().getDoctorById(doctorId);

        response.setContentType("application/json");
        new Gson().toJson(doctor, response.getWriter());
    }

}
