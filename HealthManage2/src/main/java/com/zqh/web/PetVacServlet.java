package com.zqh.web; //疫苗接种的添加、修改、删除

import com.zqh.pojo.PetVac;
import com.zqh.service.PetVacService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.Date;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@WebServlet("/VacServlet")
public class PetVacServlet extends HttpServlet {
    //处理添加疫苗信息
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws SecurityException, IOException{

        //从请求体获取表单参数
        PetVac petVac = new PetVac();
        petVac.setId(Integer.parseInt(request.getParameter("id")));
        petVac.setPetId(Integer.parseInt(request.getParameter("petId")));
        petVac.setVacName(request.getParameter("vacName"));
        petVac.setVacDate(Date.valueOf(request.getParameter("vacDate")));
        petVac.setVacStatus(Boolean.parseBoolean(request.getParameter("vacStatus")));

        new PetVacService().addVac(petVac);
        response.getWriter().print("{\"status\":success\"}");
    }
    //处理修改疫苗信息
    protected void doPut(HttpServletRequest request, HttpServletResponse response)throws SecurityException, IOException{

        //从请求体获取表单参数
        PetVac petVac = new PetVac();
        petVac.setId(Integer.parseInt(request.getParameter("id")));
        petVac.setPetId(Integer.parseInt(request.getParameter("petId")));
        petVac.setVacName(request.getParameter("vacName"));
        petVac.setVacDate(Date.valueOf(request.getParameter("vacDate")));
        petVac.setVacStatus(Boolean.parseBoolean(request.getParameter("vacStatus")));

        new PetVacService().updateVac(petVac);
        response.getWriter().print("{\"status\":success\"}");
    }
    //处理删除疫苗信息
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws SecurityException,IOException{
        //获取路径参数：/petVac/123  形式
        String pathInfo = request.getPathInfo();  //实例: /123
        Integer petVacId = Integer.parseInt(pathInfo.substring(1));

        new PetVacService().deleteVac(petVacId);
        response.getWriter().print("{\"status\":success\"}");
    }
    //辅助方法：解析请求体参数
    protected Map<String,String> parseRequest(HttpServletRequest request) throws IOException {
        BufferedReader reader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
// 示例参数格式：id=1&petId=3&vaccineName=狂犬疫苗...
        return Arrays.stream(stringBuilder.toString().split("&"))
                .map(pair -> pair.split("="))
                .collect(Collectors.toMap(
                        arr -> {
                            try {
                                return URLDecoder.decode(arr[0], "UTF-8");
                            } catch (UnsupportedEncodingException e) {
                                throw new RuntimeException(e);
                            }
                        },
                        arr -> {
                            try {
                                return URLDecoder.decode(arr[1], "UTF-8");
                            } catch (UnsupportedEncodingException e) {
                                throw new RuntimeException(e);
                            }
                        }));
    }
}
