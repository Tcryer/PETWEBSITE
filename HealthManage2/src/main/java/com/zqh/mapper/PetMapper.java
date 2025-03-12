package com.zqh.mapper; //宠物列表的接口

import com.zqh.pojo.Pet;

public interface PetMapper {
    Pet selectPets (Integer id);
}
