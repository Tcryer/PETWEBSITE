package com.zqh.web;

import com.google.gson.Gson;
import com.zqh.pojo.WeightRecord;
import com.zqh.service.WeightRecordService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

@WebServlet("/weight/record")
public class WeightRecordSelect extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException,SecurityException{
        Integer petId = Integer.parseInt(request.getParameter("petId"));
        List<WeightRecord> records = new WeightRecordService().getWeightRecord(petId);

        response.setContentType("application/json");
        new Gson().toJson(records, response.getWriter());
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException,SecurityException{
        WeightRecord record = new WeightRecord();
        record.setPetId(Integer.parseInt(request.getParameter("petId")));
        record.setRecordDate(Date.valueOf(request.getParameter("recordDate")));
        record.setWeight(Double.parseDouble(request.getParameter("weight")));

        new WeightRecordService().addWeightRecord(record);
        response.getWriter().print("{\"status\":\"success\"}");
    }
}
