INSERT INTO Accessory(Name, Description, Category, Model, Total, numCheckedOut, cost) 
VALUES 
('Antenna', 'High gain antenna', 'Antennas', 'ANT100', '50', '10', '25'),
('Battery', 'Long life battery', 'Batteries', 'BAT200', '100', '20', '30'),
('Earphone', 'Clear sound earphone', 'Earphones', 'EAR300', '80', '15', '20'),
('Charger', 'Fast charging charger', 'Chargers', 'CHA400', '60', '12', '35'),
('Case', 'Durable radio case', 'Cases', 'CAS500', '70', '14', '40');

INSERT INTO Location(Name, GD_specific_location, Description, LocationType) 
VALUES 
('Site 1', 'Building 1', 'Testing site', 'Testing'),
('Site 2', 'Building 2', 'Assembly site', 'Assembly'),
('Site 3', 'Building 3', 'Storage site', 'Storage'),
('Site 4', 'Building 4', 'Office site', 'Office'),
('Site 5', 'Building 5', 'Shipping site', 'Shipping');

INSERT INTO Asset(Asset_Name, Asset_Tag, VersionHistory, Current_Image, Model, Type, Category, Status, Purchase_Date, Cost, Deployed) 
VALUES 
('Radio 1', 'Tag 1', 'Version 1', 'Image 1', 'Model 1', 'Type 1', 'Category 1', 'Available', '2023-01-01', '100', 'No'),
('Radio 2', 'Tag 2', 'Version 2', 'Image 2', 'Model 2', 'Type 2', 'Category 2', 'In Use', '2023-02-02', '200', 'Yes'),
('Radio 3', 'Tag 3', 'Version 3', 'Image 3', 'Model 3', 'Type 3', 'Category 3', 'Available', '2023-03-03', '300', 'No'),
('Radio 4', 'Tag 4', 'Version 4', 'Image 4', 'Model 4', 'Type 4', 'Category 4', 'In Use', '2023-04-04', '400', 'Yes'),
('Radio 5', 'Tag 5', 'Version 5', 'Image 5', 'Model 5', 'Type 5', 'Category 5', 'Available', '2023-05-05', '500', 'No');


INSERT INTO Member(GD_id, Name, Permissions, Email, History, Department, Manager) 
VALUES 
('1234', 'John Doe', 'Admin', 'johndoe@example.com', 'History 1', 'Testing', 'Jane Smith'),
('2345', 'Jane Smith', 'User', 'janesmith@example.com', 'History 2', 'Assembly', 'John Doe'),
('3456', 'Alice Johnson', 'User', 'alicejohnson@example.com', 'History 3', 'Storage', 'Bob Williams'),
('4567', 'Bob Williams', 'Admin', 'bobwilliams@example.com', 'History 4', 'Office', 'Alice Johnson'),
('5678', 'Charlie Brown', 'User', 'charliebrown@example.com', 'History 5', 'Shipping', 'John Doe');

-- Insert data into the History table
INSERT INTO History (Action_Number, Asset_ID, Member_ID, Action_Type, Action_Description, DateTime) 
VALUES 
(1, 1, '1234', 'Checkout', 'Radio 1 checked out by John Doe', '2023-01-05 10:15:00'),
(2, '2345', 'Checkin', 'Radio 2 checked in by Jane Smith', '2023-02-10 14:30:00'),
(3, '3456', 'Update', 'Radio 3 information updated by Alice Johnson', '2023-03-15 09:45:00'),
(4, '4567', 'Checkout', 'Radio 4 checked out by Bob Williams', '2023-04-20 11:20:00'),
(5, '5678', 'Checkin', 'Radio 5 checked in by Charlie Brown', '2023-05-25 16:00:00');