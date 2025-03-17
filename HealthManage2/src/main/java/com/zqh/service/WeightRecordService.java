package com.zqh.service;


import com.zqh.mapper.WeightRecordMapper;
import com.zqh.pojo.WeightRecord;
import com.zqh.util.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.List;

public class WeightRecordService {
    private SqlSessionFactory sqlSessionFactory = MyBatisUtil.getSqlSessionFactory();

    //获取宠物体重记录
    public List<WeightRecord> getWeightRecord(Integer petId){
        try (SqlSession session = sqlSessionFactory.openSession()) {
            WeightRecordMapper mapper = session.getMapper(WeightRecordMapper.class);
            return mapper.selectByPetId(petId);
        }
    }

    //添加体重记录
    public void addWeightRecord(WeightRecord record){
        try (SqlSession session = sqlSessionFactory.openSession()){
            WeightRecordMapper mapper = session.getMapper(WeightRecordMapper.class);
            mapper.insert(record);
        }
    }
}
