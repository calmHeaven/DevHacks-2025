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

CREATE TABLE expected_expenses(
    stu_id INT NOT NULL,
    cat_id INT NOT NULL,
    amount  INT NOT NULL,
    FOREIGN KEY (cat_id) REFERENCES categories(cat_id),
    FOREIGN KEY (stu_id) REFERENCES account(stu_id)
);

CREATE TABLE actual_expenses(
    stu_id INT NOT NULL,
    expense_date DATE NOT NULL,
    amount INT NOT NULL,
    cat_id INT NOT NULL,
    FOREIGN KEY (cat_id) REFERENCES categories(cat_id),
    FOREIGN KEY (stu_id) REFERENCES account(stu_id)
);

CREATE TABLE expenses_summary AS (SELECT expected_expenses.stu_id,
                              SUM(expected_expenses.amount) exp_amount,
                              SUM(actual_expenses.amount) actual_amount,
                             (SUM(expected_expenses.amount) - SUM(actual_expenses.amount)) exp_difference
                       FROM actual_expenses
                                INNER JOIN
                            expected_expenses
                            ON actual_expenses.stu_id = expected_expenses.stu_id
                       GROUP BY expected_expenses.stu_id);


CREATE TABLE net AS (SELECT salary.stu_id ,
       (SUM(salary.actual_salary) - SUM(actual_expenses.amount)) actual_net
FROM salary
    INNER JOIN
    actual_expenses
    ON salary.stu_id =  actual_expenses.stu_id
GROUP BY salary.stu_id);