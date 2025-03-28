package org.example;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectRequest;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;

@WebServlet("/OSSUploadServlet")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
        maxFileSize = 1024 * 1024 * 10,      // 10MB
        maxRequestSize = 1024 * 1024 * 50)   // 50MB
public class OSSUploadServlet extends HttpServlet {

    // 阿里云OSS的访问密钥ID
    private static final String ACCESS_KEY_ID = "LTAI5tGCxdQSGLboSu1hukaW";
    // 阿里云OSS的访问密钥Secret
    private static final String ACCESS_KEY_SECRET = "zhsmK4beZFtiHZJ37ghyTti02nI6ZU";
    // 阿里云OSS的Endpoint
    private static final String ENDPOINT = "https://oss-cn-guangzhou.aliyuncs.com";
    // 阿里云OSS的存储空间名称
    private static final String BUCKET_NAME = "petwebsite";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        // 获取上传的文件
        Part filePart = request.getPart("file");
        String fileName = filePart.getSubmittedFileName();

        // 临时保存文件到本地
        String filePath = getServletContext().getRealPath("/temp") + File.separator + fileName;
        File tempFile = new File(filePath);
        filePart.write(filePath);

        // 创建OSSClient实例
        OSS ossClient = new OSSClientBuilder().build(ENDPOINT, ACCESS_KEY_ID, ACCESS_KEY_SECRET);

        try {
            // 创建PutObjectRequest对象
            PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKET_NAME, fileName, tempFile);

            // 上传文件
            ossClient.putObject(putObjectRequest);

            response.getWriter().println("文件上传成功！");
        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println("文件上传失败：" + e.getMessage());
        } finally {
            // 关闭OSSClient
            ossClient.shutdown();
            // 删除临时文件
            if (tempFile.exists()) {
                tempFile.delete();
            }
        }
    }
}