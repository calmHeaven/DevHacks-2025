CREATE TABLE account(
    stu_id SERIAL NOT NULL PRIMARY KEY,
    email_id VARCHAR(320),
    password VARCHAR (256)
);

CREATE SEQUENCE cat_seq START 101;

CREATE TABLE categories(
    cat_id INTEGER DEFAULT nextval('cat_seq') PRIMARY KEY,
    cat_Names VARCHAR(300)
);

CREATE TABLE salary(
    stu_id INT NOT NULL,
    actual_salary INT,
    FOREIGN KEY (stu_id) REFERENCES account(stu_id)
);