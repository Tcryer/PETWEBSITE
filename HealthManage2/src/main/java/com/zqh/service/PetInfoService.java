package com.zqh.service;

import com.zqh.mapper.PetInfoMapper;
import com.zqh.mapper.PetVacMapper;
import com.zqh.pojo.PetInfo;
import com.zqh.pojo.PetVac;
import com.zqh.util.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.List;

public class PetInfoService {
    private SqlSessionFactory sqlSessionFactory = MyBatisUtil.getSqlSessionFactory();

    //查看详情方法
    public PetInfo getPetInfo (Integer petId){
        try(SqlSession session = sqlSessionFactory.openSession()){
            PetInfoMapper petInfoMapper = session.getMapper(PetInfoMapper.class);
            PetVacMapper petVacMapper = session.getMapper(PetVacMapper.class);

            PetInfo petInfo = petInfoMapper.selectPetById(petId);
            if (petInfo != null){
                List<PetVac> petVacs = petVacMapper.selectByPetId(petId);
                petInfo.setPetVacs(petVacs);
            }
            return petInfo;
        }
    }
}
