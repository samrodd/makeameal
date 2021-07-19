CREATE DEFINER=`admin`@`%` PROCEDURE `new_procedure`(in user_input1 varchar(255),
in user_input2 varchar(255),
in user_input3 varchar(255),
in user_input4 varchar(255),
in user_input5 varchar(255),
in user_input6 varchar(255),
in user_input7 varchar(255),
in user_input8 varchar(255),
in user_input9 varchar(255),
in user_input10 varchar(255),
in user_input11 varchar(255),
in user_input12 varchar(255),
in user_input13 varchar(255)

)
BEGIN

set @ui1 = user_input1;
set @i1 = (select id from ingredients where ingredient = @ui1);
set @ui2 =user_input2;
set @i2 = (select id from ingredients where ingredient = @ui2);
set @ui3 = user_input3;
set @i3 = (select id from ingredients where ingredient = @ui3);
set @ui4 =user_input4;
set @i4 = (select id from ingredients where ingredient = @ui4);
set @ui5 =user_input5;
set @i5 = (select id from ingredients where ingredient = @ui5);
set @ui6 = user_input6;
set @i6 = (select id from ingredients where ingredient = @ui6);
set @ui7 = user_input7;
set @i7 = (select id from ingredients where ingredient = @ui7);
set @ui8 = user_input8;
set @i8 = (select id from ingredients where ingredient = @ui8);
set @ui9 = user_input9;
set @i9 = (select id from ingredients where ingredient = @ui9);
set @ui10 = user_input10;
set @i10 = (select id from ingredients where ingredient = @ui10);
set @ui11 = user_input11;
set @i11 = (select id from ingredients where ingredient = @ui11);
set @ui12 = user_input12;
set @i12 = (select id from ingredients where ingredient = @ui12);
set @ui13 = user_input13;
set @i13 = (select id from ingredients where ingredient = @ui13);



set @counter = case when @i1 is not null then 1 else 0 end +
case when @i2 is not null then 1 else 0 end +
case when @i3 is not null then 1 else 0 end
+ case when @i4 is not null then 1 else 0 end +
+ case when @i5 is not null then 1 else 0 end
+ case when @i6 is not null then 1 else 0 end
+ case when @i7 is not null then 1 else 0 end
+ case when @i8 is not null then 1 else 0 end
+ case when @i9 is not null then 1 else 0 end
+ case when @i10 is not null then 1 else 0 end
+ case when @i11 is not null then 1 else 0 end
+ case when @i12 is not null then 1 else 0 end
+ case when @i13 is not null then 1 else 0 end;

select fd.id, fd.title, fd.ingredients, fd.directions, fd.ingredients_string
from ingredient_occurrences io
join ingredient_occurrences io2 on io2.recipe_id=io.recipe_id
join ingredient_occurrences io3 on io3.recipe_id=io.recipe_id
join ingredient_occurrences io4 on io4.recipe_id=io.recipe_id
join ingredient_occurrences io5 on io5.recipe_id=io.recipe_id
join ingredient_occurrences io6 on io6.recipe_id=io.recipe_id
join ingredient_occurrences io7 on io7.recipe_id=io.recipe_id
join ingredient_occurrences io8 on io8.recipe_id=io.recipe_id
join ingredient_occurrences io9 on io9.recipe_id=io.recipe_id
join ingredient_occurrences io10 on io10.recipe_id=io.recipe_id
join ingredient_occurrences io11 on io11.recipe_id=io.recipe_id
join ingredient_occurrences io12 on io12.recipe_id=io.recipe_id
join ingredient_occurrences io13 on io13.recipe_id=io.recipe_id
join full_dataset fd on fd.id=io.recipe_id
where (@i1 is null or io.ingredient_id=@i1) and (@i2 is null or io2.ingredient_id=@i2) and (@i3 is null or io3.ingredient_id=@i3)
and (@i4 is null or io4.ingredient_id=@i4) and (@i5 is null or io5.ingredient_id=@i5)
and (@i6 is null or io6.ingredient_id=@i6) and (@i7 is null or io7.ingredient_id=@i7)
and (@i8 is null or io8.ingredient_id=@i8)
and (@i9 is null or io9.ingredient_id=@i9)
and (@i10 is null or io10.ingredient_id=@i10)
and (@i11 is null or io11.ingredient_id=@i11)
and (@i12 is null or io12.ingredient_id=@i12)
and (@i13 is null or io13.ingredient_id=@i13)

and @counter = fd.ingredient_count


group by io.recipe_id
limit 10;
       END