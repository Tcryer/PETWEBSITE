package com.zqh.pojo;

import java.util.Date;

public class LikeRecord {
    private Integer id;
    private Integer doctorId;
    private String userIp;
    private Date createdTime;

    //全参构造函数
    public  LikeRecord(Integer id, Integer doctorId, String userIp, Date createdTime){
        this.id = id;
        this.doctorId = doctorId;
        this.userIp = userIp;
        this.createdTime = createdTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public String getUserIp() {
        return userIp;
    }

    public void setUserIp(String userIp) {
        this.userIp = userIp;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    @Override
    public String toString() {
        return "LikeRecord{" +
                "id=" + id +
                ", doctorId=" + doctorId +
                ", userIp='" + userIp + '\'' +
                ", createdTime=" + createdTime +
                '}';
    }
}
