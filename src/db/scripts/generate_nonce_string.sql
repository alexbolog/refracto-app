CREATE OR REPLACE FUNCTION generate_nonce_string() RETURNS UUID LANGUAGE plpgsql AS
$$
DECLARE
  new_nonce UUID;
BEGIN
  new_nonce := uuid_generate_v4();

  INSERT INTO auth_nonces(nonce)
  VALUES (new_nonce);

  RETURN new_nonce;
END
$$;