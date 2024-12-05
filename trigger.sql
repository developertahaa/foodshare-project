DELIMITER $$

-- Trigger for AFTER INSERT
CREATE TRIGGER donations_after_insert 
AFTER INSERT ON donations
FOR EACH ROW 
BEGIN
    INSERT INTO action_log (table_name, action_type, new_data) 
    VALUES (
        'donations', 
        'INSERT', 
        JSON_OBJECT('donation_id', NEW.donation_id, 'user_email', NEW.user_email, 'quantity', NEW.quantity)
    );
END $$

-- Trigger for AFTER UPDATE
CREATE TRIGGER donations_after_update
AFTER UPDATE ON donations
FOR EACH ROW
BEGIN
    INSERT INTO action_log (table_name, action_type, old_data, new_data)
    VALUES (
        'donations',
        'UPDATE',
        JSON_OBJECT('donation_id', OLD.donation_id, 'user_email', OLD.user_email, 'quantity', OLD.quantity),
        JSON_OBJECT('donation_id', NEW.donation_id, 'user_email', NEW.user_email, 'quantity', NEW.quantity)
    );
END $$

-- Trigger for AFTER DELETE
CREATE TRIGGER donations_after_delete
AFTER DELETE ON donations
FOR EACH ROW
BEGIN
    INSERT INTO action_log (table_name, action_type, old_data)
    VALUES (
        'donations', 
        'DELETE', 
        JSON_OBJECT('donation_id', OLD.donation_id, 'user_email', OLD.user_email, 'quantity', OLD.quantity)
    );
END $$

DELIMITER ;



CREATE TRIGGER requests_after_insert
AFTER INSERT ON requests
FOR EACH ROW
BEGIN
    INSERT INTO action_log (table_name, action_type, new_data)
    VALUES ('requests', 'INSERT', JSON_OBJECT('id', NEW.id, 'field1', NEW.field1, 'field2', NEW.field2));
END;


CREATE TRIGGER requests_after_update
AFTER UPDATE ON requests
FOR EACH ROW
BEGIN
    INSERT INTO action_log (table_name, action_type, old_data, new_data)
    VALUES (
        'requests',
        'UPDATE',
        JSON_OBJECT('id', OLD.id, 'field1', OLD.field1, 'field2', OLD.field2),
        JSON_OBJECT('id', NEW.id, 'field1', NEW.field1, 'field2', NEW.field2)
    );
END;


CREATE TRIGGER requests_after_delete
AFTER DELETE ON requests
FOR EACH ROW
BEGIN
    INSERT INTO action_log (table_name, action_type, old_data)
    VALUES ('requests', 'DELETE', JSON_OBJECT('id', OLD.id, 'field1', OLD.field1, 'field2', OLD.field2));
END;


CREATE TRIGGER users_after_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO action_log (table_name, action_type, new_data)
    VALUES ('users', 'INSERT', JSON_OBJECT('id', NEW.id, 'field1', NEW.field1, 'field2', NEW.field2));
END;

CREATE TRIGGER users_after_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO action_log (table_name, action_type, old_data, new_data)
    VALUES (
        'users',
        'UPDATE',
        JSON_OBJECT('id', OLD.id, 'field1', OLD.field1, 'field2', OLD.field2),
        JSON_OBJECT('id', NEW.id, 'field1', NEW.field1, 'field2', NEW.field2)
    );
END;

CREATE TRIGGER users_after_delete
AFTER DELETE ON users
FOR EACH ROW
BEGIN
    INSERT INTO action_log (table_name, action_type, old_data)
    VALUES ('users', 'DELETE', JSON_OBJECT('id', OLD.id, 'field1', OLD.field1, 'field2', OLD.field2));
END;

CREATE TRIGGER donation_assignments_after_insert
AFTER INSERT ON donation_assignments
FOR EACH ROW
BEGIN
    INSERT INTO action_log (table_name, action_type, new_data)
    VALUES ('donation_assignments', 'INSERT', JSON_OBJECT('id', NEW.id, 'field1', NEW.field1, 'field2', NEW.field2));
END;

CREATE TRIGGER donation_assignments_after_update
AFTER UPDATE ON donation_assignments
FOR EACH ROW
BEGIN
    INSERT INTO action_log (table_name, action_type, old_data, new_data)
    VALUES (
        'donation_assignments',
        'UPDATE',
        JSON_OBJECT('id', OLD.id, 'field1', OLD.field1, 'field2', OLD.field2),
        JSON_OBJECT('id', NEW.id, 'field1', NEW.field1, 'field2', NEW.field2)
    );
END;
CREATE TRIGGER donation_assignments_after_delete
AFTER DELETE ON donation_assignments
FOR EACH ROW
BEGIN
    INSERT INTO action_log (table_name, action_type, old_data)
    VALUES ('donation_assignments', 'DELETE', JSON_OBJECT('id', OLD.id, 'field1', OLD.field1, 'field2', OLD.field2));
END;
