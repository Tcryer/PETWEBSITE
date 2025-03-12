package com.zqh.service;

import com.zqh.mapper.DoctorMapper;
import com.zqh.mapper.LikeMapper;
import com.zqh.pojo.Doctor;
import com.zqh.util.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.List;

public class DoctorService {
    private SqlSessionFactory sqlSessionFactory = MyBatisUtil.getSqlSessionFactory();

    public List<Doctor> searchDoctors(String region, String doctorCode, String name){
        try(SqlSession session = sqlSessionFactory.openSession()){
            DoctorMapper mapper = session.getMapper(DoctorMapper.class);
            return mapper.selectDoctors(region, doctorCode, name);
        }
    }

    public Doctor getDoctorById(Integer id){
        try(SqlSession session = sqlSessionFactory.openSession()){
            DoctorMapper mapper = session.getMapper(DoctorMapper.class);
            return mapper.selectDoctorById(id);
        }
    }

    public void updateDoctorLikes(Integer doctorId, boolean isLike){
        try(SqlSession session = sqlSessionFactory.openSession(true)){
            DoctorMapper doctorMapper = session.getMapper(DoctorMapper.class);
            LikeMapper likeMapper = session.getMapper(LikeMapper.class);

            Doctor doctor = doctorMapper.selectDoctorById(doctorId);
            if (doctor == null) throw new RuntimeException("医生不存在");

            int newLikes = isLike ? doctor.getLikes() + 1 : doctor.getLikes() - 1 ;
            doctorMapper.updateLikes(doctorId, newLikes);
        }
    }

}
