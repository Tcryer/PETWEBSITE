package com.zqh.service;

import com.zqh.mapper.ConsultationMapper;
import com.zqh.pojo.Consultation;
import com.zqh.util.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

public class ConsultationService {
    private SqlSessionFactory sqlSessionFactory = MyBatisUtil.getSqlSessionFactory();

    public void submitConsultation (Consultation consultation){
        try (SqlSession session = sqlSessionFactory.openSession(true)){
            ConsultationMapper mapper = session.getMapper(ConsultationMapper.class);
        }
    }

}
