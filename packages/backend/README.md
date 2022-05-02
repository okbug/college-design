# 数据库基础操作语句

## 表字段操作
ALTER TABLE users ADD test1 INT(4);
alter table users drop test1;

## 显示表
DESC users;
show columns from users;

## 增删改

select * from users where CONDITION;

delete from users where CONDITION;

update users set key=value where CONDITION;

insert into users (KEY...) values (VALUES...)

## 表达式

CONDITION = {
    a = 1 and b = 2
    a = 1 or b = 2
    limit number
}

