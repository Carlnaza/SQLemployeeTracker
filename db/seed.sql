USE employees_db;

INSERT INTO department (name) VALUES 
('Money Laundering'), 
('Distribution'), 
('Accounting'), 
('Marketing');

INSERT INTO `role` (title, salary, department_id) VALUES 
('manager', 100000, 1), 
('engineer', 70000, 2),
('intern', 40000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Carlo', 'Nazareno', 1, null),
('Jeff', 'Bezos', 2, 1),
('Bill', 'Gates', 2, 1),
('Warren', 'Buffet', 2, 1),
('Mark', 'Zuckerberg', 3, 1),
('Elon', 'Musk', 3, 1);
