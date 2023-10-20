CREATE OR REPLACE FUNCTION check_nonce_string(input_nonce UUID) RETURNS BOOLEAN LANGUAGE plpgsql AS
$$
BEGIN
  IF EXISTS (SELECT 1 FROM auth_nonces WHERE nonce = input_nonce AND expiration > NOW()) THEN
    DELETE FROM auth_nonces WHERE nonce = input_nonce;
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END
$$;