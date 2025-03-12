package com.zqh.service;

import com.zqh.mapper.DoctorMapper;
import com.zqh.mapper.PetMapper;
import com.zqh.pojo.Pet;
import com.zqh.util.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

public class PetService {
    protected SqlSessionFactory sqlSessionFactory = MyBatisUtil.getSqlSessionFactory();

    //获取宠物列表（给静态提供）
    public Pet getPetById(Integer id){
        try(SqlSession session = sqlSessionFactory.openSession()){
            PetMapper petMapper = session.getMapper(PetMapper.class);
            return petMapper.selectPets(id);
        }
    }
}

