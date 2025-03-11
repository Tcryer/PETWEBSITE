package com.zqh.mapper;

import com.zqh.pojo.PetVac;

import java.util.List;

public interface PetVacMapper {
    //查询某个宠物的所有疫苗记录
    List<PetVac> selectByPetId(Integer pet_id);
    //新增疫苗记录
    void insert(PetVac petVac);
    //修改疫苗记录
    void update(PetVac petVac);
    //删除疫苗记录
    void delete(Integer id);
}
