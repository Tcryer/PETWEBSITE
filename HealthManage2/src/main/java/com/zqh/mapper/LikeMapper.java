package com.zqh.mapper;

import com.zqh.pojo.LikeRecord;
import org.apache.ibatis.annotations.Param;

public interface LikeMapper {
    //检查是否已点赞
    LikeRecord selectLike(@Param("doctorId") Integer doctorId,
                          @Param("userIp") String userIp );
    void insertLike(LikeRecord like);
    Void deleteLike(Integer id);
}
