package com.zqh.pojo;

import java.util.Date;

public class WeightRecord {
    private Integer id;
    private Integer petId;
    private Date recordDate;  // 或使用 String 类型（如 "2025-03-01"）
    private Double weight;

    public WeightRecord(){}
    public WeightRecord(Integer id, Integer petId, Date recordDate, Double weight) {
        this.id = id;
        this.petId = petId;
        this.recordDate = recordDate;
        this.weight = weight;
    }


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

    public Date getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(Date recordDate) {
        this.recordDate = recordDate;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    @Override
    public String toString() {
        return "WeightRecord{" +
                "id=" + id +
                ", petId=" + petId +
                ", recordDate=" + recordDate +
                ", weight=" + weight +
                '}';
    }
}
