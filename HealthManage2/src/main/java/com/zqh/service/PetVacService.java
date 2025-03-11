package com.zqh.service;

import com.zqh.mapper.PetVacMapper;
import com.zqh.pojo.PetVac;
import com.zqh.util.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

public class PetVacService {
    private SqlSessionFactory sqlSessionFactory = MyBatisUtil.getSqlSessionFactory();

    //添加疫苗信息方法
    public void addVac(PetVac petVac){
        try(SqlSession session = sqlSessionFactory.openSession(true)){
            PetVacMapper petVacMapper = session.getMapper(PetVacMapper.class);
            petVacMapper.insert(petVac);
        }
    }

    //修改疫苗信息方法
    public void updateVac(PetVac petVac){
        try(SqlSession session = sqlSessionFactory.openSession(true)){
            PetVacMapper petVacMapper = session.getMapper(PetVacMapper.class);
            petVacMapper.update(petVac);
        }
    }

    //删除疫苗信息方法
    public void deleteVac(Integer vacId){
        try(SqlSession session = sqlSessionFactory.openSession(true)){
            PetVacMapper petVacMapper = session.getMapper(PetVacMapper.class);
            petVacMapper.delete(vacId);
        }
    }
}
