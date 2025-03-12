package com.zqh.web;//提交问诊

import com.zqh.pojo.Consultation;
import com.zqh.service.ConsultationService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/consultation/submit")
public class ConsultationSubmitServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws SecurityException, IOException {
        Consultation consultation = new Consultation();
        consultation.setDoctorId(Integer.parseInt(request.getParameter("doctorId")));
        consultation.setPetName(request.getParameter("petName"));
        consultation.setPetAge(Integer.parseInt(request.getParameter("petAge")));
        consultation.setSymptoms(request.getParameter("symptoms"));

        new ConsultationService().submitConsultation(consultation);
        response.getWriter().print("{\"status\":\"success\"}");

    }

}
