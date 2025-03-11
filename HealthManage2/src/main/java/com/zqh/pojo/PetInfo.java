package com.zqh.pojo;

import java.util.List;

public class PetInfo {
    protected Integer id;
    protected Integer petAge;
    protected String petName;
    protected String petVarious;
    protected String petBirthday;
    protected String petHealth;
    protected String petSex;

    private List<PetVac> petVacs;
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
                ", petVacs=" + petVacs +
                '}';
    }
}
