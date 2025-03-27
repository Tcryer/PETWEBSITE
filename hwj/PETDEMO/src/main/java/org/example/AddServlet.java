package org.example;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectRequest;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.example.mapper.PetMapper;
import org.example.pojo.Pet;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;

@WebServlet("/AddServlet")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
        maxFileSize = 1024 * 1024 * 10,      // 10MB
        maxRequestSize = 1024 * 1024 * 50)   // 50MB

public class AddServlet extends HttpServlet {
    private static final String ACCESS_KEY_ID = "LTAI5tGCxdQSGLboSu1hukaW";
    // 阿里云OSS的访问密钥Secret
    private static final String ACCESS_KEY_SECRET = "zhsmK4beZFtiHZJ37ghyTti02nI6ZU";
    // 阿里云OSS的Endpoint
    private static final String ENDPOINT = "https://oss-cn-guangzhou.aliyuncs.com";
    // 阿里云OSS的存储空间名称
    private static final String BUCKET_NAME = "petwebsite";
    private static final String FOLDER_NAME = "hwj/";
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        String username = req.getParameter("username");
//        String password = req.getParameter("password");
//        User user = new User();
//        user.setUsername(username);
//        user.setPassword(password);
//        //固定代码
//        String resource = "mybatis-config.xml";
//        InputStream inputStream = Resources.getResourceAsStream(resource);
//        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//        SqlSession sqlSession = sqlSessionFactory.openSession();
//        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
//
//        if (userMapper.selectUserByUsername(username) == null){
//            userMapper.insertUser(user);
//            sqlSession.commit();//提交事务
//            resp.setContentType("text/html;charset=utf-8");
//            resp.getWriter().write("注册成功");
//            sqlSession.close();
//        }else {
//            resp.setContentType("text/html;charset=utf-8");
//            resp.getWriter().write("用户名已存在");
//        }
          req.setCharacterEncoding("UTF-8");
          resp.setContentType("text/html;charset=UTF-8");
          //宠物图片
          Part filePart = req.getPart("file");
          String fileName = filePart.getSubmittedFileName();
          String filePath = getServletContext().getRealPath("/temp") + File.separator + fileName;
          File tempFile = new File(filePath);
          filePart.write(filePath);
          OSS ossClient = new OSSClientBuilder().build(ENDPOINT, ACCESS_KEY_ID, ACCESS_KEY_SECRET);
          // 创建PutObjectRequest对象
          String ossFilePath = FOLDER_NAME + fileName;
          PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKET_NAME, ossFilePath, tempFile);

          // 上传文件
          ossClient.putObject( putObjectRequest);
          // 关闭OSSClient
          ossClient.shutdown();
        // 删除临时文件
          if (tempFile.exists()) {
              tempFile.delete();
          }



          String petname = req.getParameter("petname");
          String petage = req.getParameter("petage");
          String petgender = req.getParameter("petgender");
          String petoutline = req.getParameter("petoutline");
          String petImg = "https://petwebsite.oss-cn-guangzhou.aliyuncs.com/" + FOLDER_NAME + URLEncoder.encode(fileName, "UTF-8");
          String petType = req.getParameter("petType");
          Pet pet = new Pet();
          pet.setPetName(petname);
          pet.setPetAge(Integer.parseInt(petage));
          pet.setPetGender(petgender);
          pet.setPetOutline(petoutline);
          pet.setPetImg(petImg);
          pet.setPetType(petType);                    

          String resource = "mybatis-config.xml";
          InputStream inputStream = Resources.getResourceAsStream(resource);
          SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
          SqlSession sqlSession = sqlSessionFactory.openSession();

          PetMapper petMapper = sqlSession.getMapper(PetMapper.class);

          petMapper.insertPet(pet);
          sqlSession.commit();
          resp.setContentType("text/html;charset=utf-8");
          resp.getWriter().write("添加成功");
          sqlSession.close();
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}

