package com.zqh.pojo;

import java.util.Date;

public class Consultation {
    private Integer id;
    private Integer doctorId;
    private String petName;
    private Integer petAge;
    private String symptoms;
    private Date createdTime;

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

    public String getPetName() {
        return petName;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public Integer getPetAge() {
        return petAge;
    }

    public void setPetAge(Integer petAge) {
        this.petAge = petAge;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    @Override
    public String toString() {
        return "Consultation{" +
                "id=" + id +
                ", doctorId=" + doctorId +
                ", petName='" + petName + '\'' +
                ", petAge=" + petAge +
                ", symptoms='" + symptoms + '\'' +
                ", createdTime=" + createdTime +
                '}';
    }
}
