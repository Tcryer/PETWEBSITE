package com.zqh.pojo;  //宠物列表（还没进入查看详细）给静态提供

import java.util.List;

public class Pet {
    private Integer id;
    private String petName;       // 宠物名字
    private String petVarious;      // 品种
    private Integer petAge;       // 年龄
    private String petHealth; // 健康状态
    private List<PetVac> vacs; //疫苗记录

    public List<PetVac> getVacs() {
        return vacs;
    }

    public void setVacs(List<PetVac> vacs) {
        this.vacs = vacs;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return petName;
    }

    public void setName(String name) {
        this.petName = name;
    }

    public String getPetVarious() {
        return petVarious;
    }

    public void setPetVarious(String petVarious) {
        this.petVarious = petVarious;
    }

    public Integer getAge() {
        return petAge;
    }

    public void setAge(Integer age) {
        this.petAge = age;
    }

    public String getHealthStatus() {
        return petHealth;
    }

    public void setHealthStatus(String healthStatus) {
        this.petHealth = healthStatus;
    }

    @Override
    public String toString() {
        return "Pet{" +
                "id=" + id +
                ", petName='" + petName + '\'' +
                ", petVarious='" + petVarious + '\'' +
                ", petAge=" + petAge +
                ", petHealth='" + petHealth + '\'' +
                ", vacs=" + vacs +
                '}';
    }
}

