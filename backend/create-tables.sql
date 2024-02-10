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
    Version_History VARCHAR(40),
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

CREATE TABLE Checkout_Asset (
    Checkout_id SERIAL PRIMARY KEY,
    Asset_id INTEGER,
    Member_id INTEGER,
    Checkout_time VARCHAR(40),
    Return_time VARCHAR(40),
    FOREIGN KEY (Asset_id) REFERENCES Asset(Asset_ID),
    FOREIGN KEY (Member_id) REFERENCES Member(GD_id)
);

CREATE TABLE Software_Packages (
    Software_id SERIAL PRIMARY KEY,
    Name VARCHAR(40),
    Version VARCHAR(40),
    License VARCHAR(40),
    Cost VARCHAR(40),
    Description VARCHAR(255),
    Dependencies VARCHAR(40),
    Supported_platforms VARCHAR(40),
    File_size VARCHAR(40),
    Release_date DATE
);

CREATE TABLE Licenses (
    License_id SERIAL PRIMARY KEY,
    Name VARCHAR(100), 
    Description VARCHAR(255)
);


-- Create UserAssets table
CREATE TABLE UserAssets (
    UserId INT,
    AssetId INT,
    DateAssigned DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(UserId, AssetId),
    FOREIGN KEY(UserId) REFERENCES Users(UserId),
    FOREIGN KEY(AssetId) REFERENCES Assets(AssetId)
);

-- Function to assign an asset to a user
CREATE PROCEDURE AssignAssetToUser(@UserId INT, @AssetId INT)
AS
BEGIN
    -- Check if the asset exists and is not assigned to another user
    IF EXISTS(SELECT 1 FROM Assets WHERE AssetId = @AssetId) AND NOT EXISTS(SELECT 1 FROM UserAssets WHERE AssetId = @AssetId)
    BEGIN
        -- Assign the asset to the user
        INSERT INTO UserAssets(UserId, AssetId) VALUES (@UserId, @AssetId);
        SELECT 'Asset assigned successfully';
    END
    ELSE
    BEGIN
        SELECT 'Asset does not exist or is already assigned to another user';
    END
END;