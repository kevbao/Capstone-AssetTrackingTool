UPDATE Accessory SET
    Name = 'UpdatedName',
    Description = 'UpdatedDescription',
    Category = 'UpdatedCategory',
    Model = 'UpdatedModel',
    Total = 'UpdatedTotal',
    numCheckedOut = 'UpdatedNumCheckedOut',
    cost = 'UpdatedCost'
WHERE Accessory_id = 1;


UPDATE Asset SET
    Asset_Name = 'UpdatedName',
    Asset_Tag = 'UpdatedTag',
    VersionHistory = 'UpdatedVersionHistory',
    Current_Image = 'UpdatedCurrentImage',
    Model = 'UpdatedModel',
    Type = 'UpdatedType',
    AssetTag = 'UpdatedAssetTag',
    Category = 'UpdatedCategory',
    Status = 'UpdatedStatus',
    Purchase_Date = 'UpdatedPurchaseDate',
    Cost = 'UpdatedCost',
    Deployed = 'UpdatedDeployed'
WHERE Asset_ID = 1;


UPDATE Location SET
    Name = 'UpdatedName',
    GD_specific_location = 'UpdatedSpecificLocation',
    Description = 'UpdatedDescription',
    LocationType = 'UpdatedLocationType'
WHERE Location_id = 1;


UPDATE Member SET
    Name = 'UpdatedName',
    Permissions = 'UpdatedPermissions',
    Email = 'UpdatedEmail',
    History = 'UpdatedHistory',
    Department = 'UpdatedDepartment',
    Manager = 'UpdatedManager',
    Check_in_time = 'UpdatedCheckInTime'
WHERE GD_id = 1;
