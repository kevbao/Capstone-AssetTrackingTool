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
    Location_id SERIAL,
    Name VARCHAR(60) PRIMARY KEY,
    GD_specific_location VARCHAR(40),
    Description VARCHAR(255),
    LocationType VARCHAR(60)
);

CREATE TABLE Member (
    GD_id VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(50),
    Permissions VARCHAR(50),
    Email VARCHAR(50),
    History VARCHAR(50),
    Department VARCHAR(50),
    Manager VARCHAR(50),
    Password VARCHAR(50) NULL
);

CREATE TABLE Asset ( 
    Asset_ID SERIAL PRIMARY KEY,
    Asset_Name VARCHAR(40),
    Asset_Tag VARCHAR(40),
    VersionHistory VARCHAR(40),
    Current_Image VARCHAR(40),
    Model VARCHAR(40),
    Type VARCHAR(40),
    Category VARCHAR(40),
    Status VARCHAR(40),
    Purchase_Date VARCHAR(40),
    Cost VARCHAR(40),
    Deployed VARCHAR(40),
    Member_ID VARCHAR(50) NULL,
    Location_Name VARCHAR(60) NULL,
    FOREIGN KEY (Member_ID) REFERENCES Member(GD_id),
    FOREIGN KEY (Location_Name) REFERENCES Location(Name)
);

CREATE TABLE History (
    Action_Number SERIAL PRIMARY KEY,
    Action_Description VARCHAR(255),
    DateTime TIMESTAMP UNIQUE
);