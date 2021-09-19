with returning_id as (insert into shop.products (title, description, price) values ('car1', 'Car 1 desc', 1) returning id)
insert into shop.stocks (product_id, count) values ((select id from returning_id), floor(random() * 10 + 1)::int);

with returning_id as (insert into shop.products (title, description, price) values ('car2', 'Car 2 desc', 2) returning id)
insert into shop.stocks (product_id, count) values ((select id from returning_id), floor(random() * 10 + 1)::int);

with returning_id as (insert into shop.products (title, description, price) values ('car3', 'Car 3 desc', 3) returning id)
insert into shop.stocks (product_id, count) values ((select id from returning_id), floor(random() * 10 + 1)::int);

with returning_id as (insert into shop.products (title, description, price) values ('car4', 'Car 4 desc', 4) returning id)
insert into shop.stocks (product_id, count) values ((select id from returning_id), floor(random() * 10 + 1)::int);

with returning_id as (insert into shop.products (title, description, price) values ('car5', 'Car 5 desc', 5) returning id)
insert into shop.stocks (product_id, count) values ((select id from returning_id), floor(random() * 10 + 1)::int);

with returning_id as (insert into shop.products (title, description, price) values ('car6', 'Car 6 desc', 6) returning id)
insert into shop.stocks (product_id, count) values ((select id from returning_id), floor(random() * 10 + 1)::int);

with returning_id as (insert into shop.products (title, description, price) values ('car7', 'Car 7 desc', 7) returning id)
insert into shop.stocks (product_id, count) values ((select id from returning_id), floor(random() * 10 + 1)::int);

with returning_id as (insert into shop.products (title, description, price) values ('car8', 'Car 8 desc', 8) returning id)
insert into shop.stocks (product_id, count) values ((select id from returning_id), floor(random() * 10 + 1)::int);

with returning_id as (insert into shop.products (title, description, price) values ('car9', 'Car 9 desc', 9) returning id)
insert into shop.stocks (product_id, count) values ((select id from returning_id), floor(random() * 10 + 1)::int);
