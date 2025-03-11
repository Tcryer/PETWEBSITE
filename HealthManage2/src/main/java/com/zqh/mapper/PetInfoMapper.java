package com.zqh.mapper;

import com.zqh.pojo.PetInfo;

public interface PetInfoMapper {
    //根据ID查询宠物的基本信息
    PetInfo selectPetById(Integer id);
}
