package org.example.service.impl;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.example.mapper.PetMapper;
import org.example.pojo.Pet;
import org.example.service.PetService;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class PetServiceimpl implements PetService {
    String resource = "mybatis-config.xml";
    InputStream inputStream;

    {
        try {
            inputStream = Resources.getResourceAsStream(resource);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
    SqlSession sqlSession = sqlSessionFactory.openSession();

    PetMapper petMapper = sqlSession.getMapper(PetMapper.class);
    @Override
    public List<Pet> selectAllPet() {
        List<Pet> petList = petMapper.selectAllPet();
        sqlSession.close();
        return petList;
    }
}
