delimiter //

CREATE PROCEDURE
getRecipes(
in user_input varchar(255)
)
BEGIN
select fd.id, fd.title, fd.ingredients, fd.directions, fd.link,fd.source,fd.ingredients_string
from full_dataset fd
join ingredient_occurrences io on io.recipe_id=fd.id
join ingredients i on i.id=io.ingredient_id
where i.ingredient=user_input
group by fd.id
limit 10;
       END//
