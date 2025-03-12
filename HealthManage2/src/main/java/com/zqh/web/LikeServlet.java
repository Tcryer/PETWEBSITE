package com.zqh.web;//点赞/取消点赞

import com.zqh.service.LikeService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/like/toggle")
public class LikeServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws SecurityException, IOException{
        Integer doctorId = Integer.parseInt(request.getParameter("doctorId"));
        String userIp = request.getRemoteAddr();//简易版获取用户IP

        boolean isLiked = new LikeService().toggleLike(doctorId, userIp);
        response.getWriter().print("{\"isLiked\":" + isLiked + "}");
    }
}
