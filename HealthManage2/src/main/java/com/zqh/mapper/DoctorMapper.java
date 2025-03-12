package com.zqh.mapper;

import com.zqh.pojo.Doctor;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DoctorMapper {

    //根据条件筛选医生
    List<Doctor> selectDoctors(@Param("region") String region,
                              @Param("doctorCode") String doctorCode,
                              @Param("name") String name);
    //根据ID查询医生
    Doctor selectDoctorById(Integer id);
    //更新点赞数
    void updateLikes(@Param("id") Integer id,
                     @Param("likes") Integer likes);
}
