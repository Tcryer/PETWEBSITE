package com.zqh.mapper;

import com.zqh.pojo.WeightRecord;

import java.util.List;

public interface WeightRecordMapper {
    //根据宠物ID查询体重记录(按日期排序)
    List<WeightRecord> selectByPetId(Integer petId);

    //新增体重记录
    void  insert(WeightRecord record);
}
