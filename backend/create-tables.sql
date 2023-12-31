CREATE TABLE Accessory (
    Accessory_id SERIAL PRIMARY KEY,
    Name VARCHAR(40),
    Description VARCHAR(255),
    Category VARCHAR(40),
    Model VARCHAR(40),
    Total VARCHAR(40),
    numCheckedOut VARCHAR(40),
    cost VARCHAR(40)
);

CREATE TABLE Location (
    Location_id SERIAL PRIMARY KEY,
    Name VARCHAR(60),
    GD_specific_location VARCHAR(40),
    Description VARCHAR(255),
    LocationType VARCHAR(60)
);

CREATE TABLE Asset ( 
    Asset_ID SERIAL PRIMARY KEY,
    Asset_Name VARCHAR(40),
    Asset_Tag VARCHAR(40),
    VersionHistory VARCHAR(40),
    Current_Image VARCHAR(40),
    Model VARCHAR(40),
    Type VARCHAR(40),
    AssetTag VARCHAR(40),
    Category VARCHAR(40),
    Status VARCHAR(40),
    Purchase_Date VARCHAR(40),
    Cost VARCHAR(40),
    Deployed VARCHAR(40)
);

CREATE TABLE Member (
    GD_id SERIAL PRIMARY KEY,
    Name VARCHAR(50),
    Permissions VARCHAR(50),
    Email VARCHAR(50),
    History VARCHAR(50),
    Department VARCHAR(50),
    Manager VARCHAR(50),
    Check_in_time VARCHAR(40)
);