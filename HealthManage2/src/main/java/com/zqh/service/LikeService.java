package com.zqh.service;

import com.zqh.mapper.ConsultationMapper;
import com.zqh.mapper.LikeMapper;
import com.zqh.pojo.Consultation;
import com.zqh.pojo.LikeRecord;
import com.zqh.util.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

public class LikeService {
    private SqlSessionFactory sqlSessionFactory = MyBatisUtil.getSqlSessionFactory();

    public boolean toggleLike(Integer doctorId, String userIp){
        try (SqlSession session = sqlSessionFactory.openSession(true)){
            LikeMapper mapper = session.getMapper(LikeMapper.class);
            LikeRecord existing = mapper.selectLike(doctorId, userIp);

            if (existing == null){
                mapper.insertLike(new LikeRecord(null, doctorId, userIp, null ));
                return true; //点赞成功
            }else {
                mapper.deleteLike(existing.getId());
                return false; //取消点赞
            }
        }
    }
}
