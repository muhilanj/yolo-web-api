
exec Get_Property_Search 
@proerty_name = '',
@area = '',
@city = 'Bangalore', 
@isAvaiable = 0,
@category = '',
@occupancy_Type =  '',
@Starting_price = 0, 
@Highest_price = 0

exec Get_City_List @state_name = 'Karnataka'
exec Get_Area_List @City_id = 1
Exec Get_Category_List
exec Get_Occupancy_Types

