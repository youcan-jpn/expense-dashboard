-- define triggers
CREATE FUNCTION set_modified_at() RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'UPDATE') THEN
        NEW.modified_at := now();
        return NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- set triggers
CREATE TRIGGER trigger_set_modified_at_on_shop_list BEFORE UPDATE ON shop_list FOR EACH ROW EXECUTE PROCEDURE set_modified_at();
CREATE TRIGGER trigger_set_modified_at_on_receipt_list BEFORE UPDATE ON receipt_list FOR EACH ROW EXECUTE PROCEDURE set_modified_at();
