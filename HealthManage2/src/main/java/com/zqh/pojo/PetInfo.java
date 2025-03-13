package com.zqh.pojo; //宠物详细信息实体类

import java.util.List;

public class PetInfo {
    protected Integer id;
    protected Integer petAge;  //宠物年龄
    protected String petName;  //宠物名字
    protected String petVarious;  //宠物品种
    protected String petBirthday;  //宠物生日
    protected String petHealth;  //宠物健康状况
    protected String petSex;  //宠物性别
    private String adoptionDate;   // 到家日期
    private String imageUrl;

    public String getAdoptionDate() {
        return adoptionDate;
    }

    public void setAdoptionDate(String adoptionDate) {
        this.adoptionDate = adoptionDate;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<WeightRecord> getWeightRecords() {
        return weightRecords;
    }

    public void setWeightRecords(List<WeightRecord> weightRecords) {
        this.weightRecords = weightRecords;
    }

    private List<WeightRecord> weightRecords;

    private List<PetVac> petVacs;  //疫苗记录
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPetAge() {
        return petAge;
    }

    public void setPetAge(Integer petAge) {
        this.petAge = petAge;
    }

    public String getPetName() {
        return petName;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public String getPetVarious() {
        return petVarious;
    }

    public void setPetVarious(String petVarious) {
        this.petVarious = petVarious;
    }

    public String getPetBirthday() {
        return petBirthday;
    }

    public void setPetBirthday(String petBirthday) {
        this.petBirthday = petBirthday;
    }

    public String getPetHealth() {
        return petHealth;
    }

    public void setPetHealth(String petHealth) {
        this.petHealth = petHealth;
    }

    public String getPetSex() {
        return petSex;
    }

    public void setPetSex(String petSex) {
        this.petSex = petSex;
    }

    public List<PetVac> getPetVacs() {
        return petVacs;
    }

    public void setPetVacs(List<PetVac> petVacs) {
        this.petVacs = petVacs;
    }

    @Override
    public String toString() {
        return "PetInfo{" +
                "id=" + id +
                ", petAge=" + petAge +
                ", petName='" + petName + '\'' +
                ", petVarious='" + petVarious + '\'' +
                ", petBirthday='" + petBirthday + '\'' +
                ", petHealth='" + petHealth + '\'' +
                ", petSex='" + petSex + '\'' +
                ", adoptionDate='" + adoptionDate + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", weightRecords=" + weightRecords +
                ", petVacs=" + petVacs +
                '}';
    }
}
