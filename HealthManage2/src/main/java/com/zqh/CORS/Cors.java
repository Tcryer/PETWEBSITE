package com.zqh.CORS;   //CORS过滤类  Servlet过滤器

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("/*") //过滤所有请求
public class Cors implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, SecurityException, ServletException {
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        //允许所以域名访问（生产环境应替换为具体域名）
        httpServletResponse.setHeader("Access-Control-Allow-Origin","*"); //如果要限制，将*改为具体域名
        //允许的请求方法
        httpServletResponse.setHeader("Access-Control-Allow-Methods","GET, POST ,PUT, DELETE, OPTIONS");
        //允许的请求头
        httpServletResponse.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");
        //预检请求缓存时间（单位：秒）
        httpServletResponse.setHeader("Access-Control-Max-Age","3600");
        chain.doFilter(request,response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void destroy() {

    }
}
