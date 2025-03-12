package com.zqh.pojo;

import java.util.Date;

public class PetVac {
    protected Integer id;
    protected Integer petId;
    protected String vacName; //疫苗名称
    protected Date vacDate;//计划接种日期
    protected Boolean vacStatus;//接种状态

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPetId() {
        return petId;
    }

    public void setPetId(Integer petId) {
        this.petId = petId;
    }

    public String getVacName() {
        return vacName;
    }

    public void setVacName(String vacName) {
        this.vacName = vacName;
    }

    public Date getVacDate() {
        return vacDate;
    }

    public void setVacDate(Date vacDate) {
        this.vacDate = vacDate;
    }

    public Boolean getVacStatus() {
        return vacStatus;
    }

    public void setVacStatus(Boolean vacStatus) {
        this.vacStatus = vacStatus;
    }
    @Override
    public String toString() {
        return "PetVac{" +
                "id=" + id +
                ", petId=" + petId +
                ", vacName='" + vacName + '\'' +
                ", vacDate=" + vacDate +
                ", vacStatus=" + vacStatus +
                '}';
    }
}
