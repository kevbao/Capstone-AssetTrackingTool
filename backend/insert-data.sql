INSERT INTO Accessory(Name, Description, Category, Model, Total, numCheckedOut, cost) 
VALUES 
('NewAccessory', 'NewAccessoryDescription', 'NewAccessoryCategory', 'NewAccessoryModel', 'NewTotal', 'NewNumCheckedOut', 'NewCost');

INSERT INTO Location(Name, GD_specific_location, Description, LocationType) 
VALUES 
('NewLocation', 'NewGDSpecificLocation', 'NewDescription', 'NewLocationType');

INSERT INTO Asset(Asset_Name, Asset_Tag, VersionHistory, Current_Image, Model, Type, AssetTag, Category, Status, Purchase_Date, Cost, Deployed) 
VALUES 
('NewAssetName', 'NewAssetTag', 'NewVersionHistory', 'NewCurrentImage', 'NewModel', 'NewType', 'NewAssetTag', 'NewCategory', 'NewStatus', 'NewPurchaseDate', 'NewCost', 'NewDeployed');

INSERT INTO Member(Name, Permissions, Email, History, Department, Manager, Check_in_time) 
VALUES 
('NewMemberName', 'NewPermissions', 'NewEmail', 'NewHistory', 'NewDepartment', 'NewManager', 'NewCheckInTime');
